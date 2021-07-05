export default class Session {
    constructor() { }

    set(name, value) { sessionStorage.setItem(name, value); }
    get(name) { return sessionStorage.getItem(name); }
    remove(name) { sessionStorage.removeItem(name); }

    setSubscribed() {
        sessionStorage.setItem("isSubscribed", true);
    }

    getSubscribed() {
        return sessionStorage.getItem("isSubscribed");
    }
}