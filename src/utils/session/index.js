import Cookies from 'js-cookie'

// we export respective utils here for both client and server
export { default as Session } from './sessionStorage';
export { default as Local } from './localStorage';
export { default as Cookie } from './cookie';

export const getLanguage = (req) => {
    //@TODO: firebase only pass special cookie name "__session".  Othe than that key cookie not available on server.
    let cookie = req.cookies.__session;

    return new Promise((resolve, reject) => {
        let reqLang = req.headers["accept-language"];
        let arrLang = reqLang.split(',');
        let lang = arrLang[0] != "hi-IN" ? "en-US" : "hi-IN";

        if (!cookie) return resolve(lang);

        let name = "language" + "=";
        let splitter = "?";
        let ca = cookie.split(splitter);
        ca.map((c, i) => {
            while (c.charAt(0) == " ") { c = c.substring(1); }
            if (c.indexOf(name) == 0) { resolve(c.substring(name.length, c.length)); }
        });

        resolve(lang);
    });
}

const hasCookieAndRefresh = (ca, name) => {
    let newCa = [];
    for (const c of ca) {
        while (c.charAt(0) == " ") { c = c.substring(1); }
        if (c.indexOf(name) != 0) newCa.push(c);
    }

    let filtered = newCa.filter((item) => {
        return item != "";
    });

    return filtered;
}

export const setLanguage = (language) => {
    let cookie = Cookies.get("__session");
    if (!cookie) Cookies.set("__session", `language=${language}?`, {
        expires: 7
    });
    else {
        let name = "language=";
        let splitter = "?";
        let ca = cookie.split(splitter);

        let filtered = hasCookieAndRefresh(ca, name);
        filtered.push(`language=${language}?`);

        let cookieString = filtered.join(splitter);
        Cookies.set("__session", cookieString);
    }
}


export const isLoggedIn = (req) => {
    let cookie = req.cookies.__session;
    if (!cookie) return false;

    let name = "token=";
    let splitter = "?";
    let ca = cookie.split(splitter);

    for (const c of ca) {
        while (c.charAt(0) == " ") { c = c.substring(1); }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return false;
}

export const login = (uid) => {
    let cookie = Cookies.get("__session");
    if (!cookie) Cookies.set("__session", `token=${uid}?`);
    else {
        let splitter = "?";
        let ca = cookie.split(splitter);

        let filtered = ca.filter((item) => {
            return item != "";
        });

        filtered.push(`token=${uid}?`);
        let cookieString = filtered.join(splitter);

        Cookies.set("__session", cookieString);
    }
}

export const logout = () => {
    let cookie = Cookies.get("__session");

    let name = "token=";
    let splitter = "?";
    let ca = cookie.split(splitter);

    let filtered = hasCookieAndRefresh(ca, name);

    let cookieString = filtered.join(splitter);
    Cookies.set("__session", cookieString);
}