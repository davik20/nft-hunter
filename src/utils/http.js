import axios from 'axios'

const http = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {'x-api-key': process.env.API_KEY}
})



module.exports = http;