import axios from "axios";

// https://viacep.com.br/ws/ 01001000/json/

const Api = axios.create({
    baseURL: "https://viacep.com.br/ws/" //é a URL que nunca vai mudar
})

export default Api