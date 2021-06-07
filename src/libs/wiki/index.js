import axios from 'axios';

export default class Wiki {
    async getShortIntro(title) {
        let data;
        let link = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}`

        await axios.get(link)
            .then(res => {
                data = res.data.query.pages;
                let id = Object.keys(data)[0];
                let para = data[id].extract;
                let title = data[id].title;

                data = { title, para };
            })
            .catch(err => {
                console.log(err);
            })

        return data
    }
}