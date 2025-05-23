// https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
import axios from 'axios';
import Session from "@utils/session/sessionStorage"

export default class Universal {
    async getAuthToken() {
        let link = `https://www.universal-tutorial.com/api/getaccesstoken`
        let config = {
            headers: {
                "Accept": "application/json",
                "api-token": process.env.NEXT_PUBLIC_UNIVERSAL_TOKEN,
                "user-email": "pnkj_jsr@yahoo.co.in"
            }
        }

        let session = new Session();
        let token = session.get("universalToken");
        let authToken;

        if (token) return token;
        else {
            await axios.get(link, config).then(res => {
                authToken = res.data.auth_token;
                session.set("universalToken", authToken);
            }).catch(err => {
                console.log(err);
            });

            return authToken;
        }
    }

    async getCountries() {
        let authToken = await this.getAuthToken();

        let link = `https://www.universal-tutorial.com/api/countries/`
        let config = {
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json"
            }
        }

        let result = [];
        await axios.get(link, config).then(res => {
            let data = res.data;
            result = data;

        }).catch(err => {
            console.log(err);
        });

        return result;
    }

    async getState(country) {
        let authToken = await this.getAuthToken();

        let link = `https://www.universal-tutorial.com/api/states/${country}`
        let config = {
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json"
            }
        }

        let result = [];
        await axios.get(link, config).then(res => {
            let data = res.data;
            result = data;

        }).catch(err => {
            console.log(err);
        });

        return result;
    }

    async getCity(state) {
        let authToken = await this.getAuthToken();

        let link = `https://www.universal-tutorial.com/api/cities/${state}`
        let config = {
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Accept": "application/json"
            }
        }

        let result = [];
        await axios.get(link, config).then(res => {
            let data = res.data;
            result = data;

        }).catch(err => {
            console.log(err);
        });

        return result;
    }
}