import Cookies from 'js-cookie'

export default class Cookie {
    constructor() { }

    setCookie = (key, value) => {
        if (process.browser) {
            Cookies.set(key, value, {
                expires: 1,
                path: '/'
            });
        }
    };

    removeCookie = (key) => {
        if (process.browser) {
            Cookies.remove(key, {
                expires: 1
            });
        }
    };

    getCookie = (key, req) => {
        return process.browser ?
            this.getCookieFromBrowser(key) :
            this.getCookieFromServer(key, req);
    };

    getCookieFromBrowser = key => {
        return Cookies.get(key);
    };

    getCookieFromServer = (key, req) => {
        if (!req?.headers?.cookie) {
            return undefined;
        }
        const rawCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith(`${key}=`));
        if (!rawCookie) {
            return undefined;
        }
        return rawCookie.split('=')[1];
    };

}

