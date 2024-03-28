import axios from "axios"

const baseUrl =  'https://studies.cs.helsinki.fi/restcountries/api'

const all = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const find = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default { all, find }