export default class Local {
    constructor() { }

    login(token) {
        this.setToken(token);
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token; // && !isTokenExpired(token) // handwaiving here
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        localStorage.removeItem("bearerToken");
    }


    setToken(idToken) {
        localStorage.setItem("token", idToken);
    }

    getToken() {
        return localStorage.getItem("token");
    }
}