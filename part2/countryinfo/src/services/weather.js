import axios from "axios"

const baseUrl =  'https://api.openweathermap.org/data/2.5'

const apiKey = import.meta.env.VITE_SOME_KEY

const find = (lat, lon) => {
    const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default { find }