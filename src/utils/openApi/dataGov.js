import axios from 'axios';

export default class DataGov {
    async getLocation(pincode) {
        let result;
        let link = `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${process.env.NEXT_PUBLIC_GOV_KEY}&format=json&offset=0&limit=10&filters[pincode]=${pincode}`


        await axios.get(link)
            .then(res => {
                result = res.data.records
            })
            .catch(err => {
                console.log(err);
            });

        return result;
    }
}