import axios from 'axios'

const instance = axios.create({
    baseURL: '...'          /* There is no API at this point. The (cloud function) would be there */
})

export default instance 