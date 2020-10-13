// we export respective utils here for both client and server
export { default as Session } from './sessionStorage';
export { default as Local } from './localStorage';
export { default as Cookie } from './cookie';

export const getLanguage = (cookie) => {
    return new Promise((resolve, reject) => {
        let name = "language" + "=";
        if (!cookie) {
            resolve("en-US");
        }
        let ca = cookie.split(";");
        ca.map((c, i) => {
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }

            if (c.indexOf(name) == 0) {
                resolve(c.substring(name.length, c.length));
            }
        });

        resolve("en-US");
    });
}

