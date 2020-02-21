import axios from 'axios';

export default axios.create({
    baseURL: 'https://kanjialive-api.p.rapidapi.com/api/public',
    headers: {
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_KANJIALIVE_KEY
    }
});