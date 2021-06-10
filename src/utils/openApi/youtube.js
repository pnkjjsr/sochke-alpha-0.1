import axios from 'axios';

export default class Youtube {
    async getSearchList(title) {
        const isDev = process.env.NODE_ENV !== "production";
        let key = isDev ? process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_API_KEY : process.env.NEXT_PUBLIC_YOUTUBE_SERVER_API_KEY;
        let link = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&maxResults=1&q=${title}&key=${key}`
        let data;

        await axios.get(link)
            .then(res => {
                data = res.data.items;
            })
            .catch(err => {
                data = err.response.data;
            })

        return data
    }
}