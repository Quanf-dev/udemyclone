import axios from "./api.axios.customize"

const testApi = () => {
    const URL_BACKEND = '/v1/users'

    return axios.get(URL_BACKEND)
}

export { testApi }