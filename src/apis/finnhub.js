import axios from 'axios';

const TOKEN = "cobgug9r01qomlfdukcgcobgug9r01qomlfdukd0"

export default axios.create({
    baseURL : "https://finnhub.io/api/v1",
    params : {
        token:TOKEN
    }
})