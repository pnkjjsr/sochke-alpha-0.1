// we export respective utils here for both client and server
export { default as Session } from './sessionStorage';
export { default as Local } from './localStorage';
export { default as Cookie } from './cookie';

export const getLanguage = (req) => {
    const isDev = process.env.NODE_ENV !== "production";
    //@TODO: firebase only pass special cookie name "__session".  Othe than that key cookie not available on server.
    let cookie = isDev ? req.headers.cookie : req.cookies.__session

    return new Promise((resolve, reject) => {
        let reqLang = req.headers["accept-language"];
        let arrLang = reqLang.split(',');
        let lang = arrLang[0] != "hi-IN" ? "en-US" : "hi-IN";

        if (!cookie) return resolve(lang);

        let name = "language" + "=";
        let splitter = isDev ? ";" : "?";
        let ca = cookie.split(splitter);
        ca.map((c, i) => {
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                resolve(c.substring(name.length, c.length));
            }
        });

        resolve(lang);
    });
}

