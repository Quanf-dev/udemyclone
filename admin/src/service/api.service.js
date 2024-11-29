import axios from "./api.axios.customize"


const createUser = (email, password, role) => {
    const URL_BACKEND = '/v1/user'

    const data = {
        email: email,
        password: password,
        role: role
    }

    console.log(data)

    return axios.post(URL_BACKEND, data)
}

export { createUser }