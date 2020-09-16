export default class Session {
    constructor() { }

    setSubscribed() {
        sessionStorage.setItem("isSubscribed", true);
    }

    getSubscribed() {
        return sessionStorage.getItem("isSubscribed");
    }
}