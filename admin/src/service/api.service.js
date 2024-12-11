import axios from "./axios.customize"

// user
const createUser = (data) => {
    const URL_BACKEND = '/v1/user'

    return axios.post(URL_BACKEND, data)
}

const fetchUser = (id) => {
    const URL_BACKEND = `/v1/user/${id}`

    return axios.get(URL_BACKEND)
}

const fetchSeveralUsers = (current, size) => {
    const URL_BACKEND = `/v1/users?page=${current}&size=${size}`

    return axios.get(URL_BACKEND)
}

const deleteUser = (id) => {
    const URL_BACKEND = `/v1/user/${id}`

    return axios.delete(URL_BACKEND)
}

const updateUser = (data) => {
    const URL_BACKEND = `/v1/user`

    return axios.put(URL_BACKEND, data)
}

const activeUser = (id, isActive) => {
    const URL_BACKEND = `/v1/user/${id}`

    return axios.patch(URL_BACKEND, { active: isActive })
}

//achievement
const fetchASeveralAchievements = () => {
    const URL_BACKEND = `/v1/achievements`

    return axios.get(URL_BACKEND)
}

//file
const uploadFile = (file, folder, id, pp) => {
    const URL_BACKEND = "/v1/file"

    // can thiệp vào request header
    let config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData()

    // truyền vào key và value
    bodyFormData.append("folder", folder)
    bodyFormData.append("file", file)
    bodyFormData.append("id", id)
    bodyFormData.append("purpose", pp)

    return axios.post(URL_BACKEND, bodyFormData, config)
}

export { createUser, fetchUser, fetchSeveralUsers, deleteUser, updateUser, activeUser, fetchASeveralAchievements, uploadFile }