import axios from "axios";
import "firebase/auth";
import firebase from "firebase/app";

import clientCredentials from "@configs/firebaseConfig";

const NODE = process.env.NODE_ENV === "production";
let req = null;

export default class Service {
  constructor(axiosConfig) {
    this.requestTimeout = process.env.NEXT_PUBLIC_REQUEST_TIMEOUT;
    this.apiVersion = process.env.NEXT_PUBLIC_API_VERSION;
    this.apiProtocol = process.env.NEXT_PUBLIC_API_PROTOCOL;
    this.requestBaseurl = process.env.NEXT_PUBLIC_REQUEST_BASEURL;
    this.requestBaseurlLocal = process.env.NEXT_PUBLIC_REQUEST_BASEURL_LOCAL;
    this.xAccessKey = process.env.NEXT_PUBLIC_X_ACCESS_KEY;

    this.axiosConfig = axiosConfig;

    this.defaultConfig = {
      baseURL: this.getBaseURL(),
      timeout: this.requestTimeout,
    };

    this.axios = axios.create(
      Object.assign({}, this.defaultConfig, this.axiosConfig)
    );
  }

  static create(axiosConfig = {}) {
    return new Service(axiosConfig);
  }

  static get req() {
    return req;
  }

  static set req(value) {
    req = value;
  }

  getBaseURL() {
    // const api = `/api`;
    const api = ``;

    // construct base URL when is on server side
    if (NODE) return `${this.apiProtocol}://${this.requestBaseurl}${api}`;

    // else, use it if request base URL is explicitly defined (eg: domain name)
    else if (this.requestBaseurlLocal) return `${this.requestBaseurlLocal}${api}`;

    // or return as it is
    return api;
  }

  interceptRequest(resolve, reject) {
    return this.axios.interceptors.request.use(resolve, reject);
  }

  interceptResponse(resolve, reject) {
    return this.axios.interceptors.response.use(resolve, reject);
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, config) {
    return this.axios.post(url, config);
  }

  put(url, config) {
    return this.axios.put(url, config);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
  }

  getAuthorizationToken = () => {
    return new Promise((resolve, reject) => {
      if (!firebase.apps.length) firebase.initializeApp(clientCredentials);

      const auth = firebase.auth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          auth.currentUser.getIdToken().then((token) => {
            resolve(token);
          });
        } else {
          resolve(this.xAccessKey);
        }
      });
    });
  };
}

// create default service instance and interceptors
// @see: https://github.com/axios/axios#interceptors
export const service = Service.create();

service.interceptRequest(
  async (config) => {
    // if (NODE && Service.req && Service.req.header) {
    //   config.headers.Cookie = Service.req.header("cookie") || "";
    //   Service.req = null;
    // }

    await service.getAuthorizationToken().then((res) => {
      config.headers["authorization"] = res;
      config.headers["x-access-token"] = res;
    });

    return config;
  },
  (err) => Promise.reject(err)
);

service.interceptResponse(
  (res) => {
    // we may do something here before returning response data
    return res;
  },
  // we may do something with response error
  // say, when user authentication failure occured
  (err) => Promise.reject(err)
);

// set the cookie header for server
