import axios from "./axios.customize"

// user
const createUser = (email, password, role) => {
    const URL_BACKEND = '/v1/user'

    const data = {
        email: email,
        password: password,
        role: role
    }

    // console.log(data)

    return axios.post(URL_BACKEND, data)
}

const fetchSeveralUsers = (current, size) => {
    const URL_BACKEND = `/v1/users?page=${current}&size=${size}`

    return axios.get(URL_BACKEND)
}

const deleteUser = (id) => {
    const URL_BACKEND = `/v1/user/${id}`

    return axios.delete(URL_BACKEND)
}

//achievement
const fetchASeveralAchievements = () => {
    const URL_BACKEND = `/v1/achievements`

    return axios.get(URL_BACKEND)
}

export { createUser, fetchSeveralUsers, deleteUser, fetchASeveralAchievements }