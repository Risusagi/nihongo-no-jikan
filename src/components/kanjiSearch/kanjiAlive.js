import axios from 'axios';

const kanjiAlive = (key) => axios.create({
    baseURL: 'https://kanjialive-api.p.rapidapi.com/api/public',
    headers: {
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        "x-rapidapi-key": key
    }
});

export default kanjiAlive;