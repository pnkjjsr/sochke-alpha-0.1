import axios from 'axios';

export default class Youtube {
    async getSearchList(title) {
        let data;
        let link = `https://youtube.googleapis.com/youtube/v3/search?order=date&part=snippet&maxResults=4&q=${title}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`

        await axios.get(link)
            .then(res => {
                data = res.data.items;
            })
            .catch(err => {
                console.log(err);
            })

        return data
    }
}