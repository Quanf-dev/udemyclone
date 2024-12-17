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

const fetchSeveralUsersForRoot = (current, size) => {
    const URL_BACKEND = `/v1/users?page=${current}&size=${size}`

    return axios.get(URL_BACKEND)
}

const fetchSeveralUsersForAdmin = (current, size) => {
    const URL_BACKEND = `/v1/users?page=${current}&size=${size}&filter=role!'ROOT'`

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

// field
const fetchSeveralFields = () => {
    const URL_BACKEND = `/v1/fields`

    return axios.get(URL_BACKEND)
}

// skill
const fetchSeveralSkills = () => {
    const URL_BACKEND = `/v1/skills`

    return axios.get(URL_BACKEND)
}

//achievement
const fetchSeveralAchievements = () => {
    const URL_BACKEND = `/v1/achievements`

    return axios.get(URL_BACKEND)
}

//file
const uploadFile = (file, folder, id) => {
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

    return axios.post(URL_BACKEND, bodyFormData, config)
}

//auth
const login = (data) => {
    const URL_BACKEND = "/v1/login"

    return axios.post(URL_BACKEND, data)
}

//course
const fetchSeveralCourses = () => {
    const URL_BACKEND = "/v1/courses"

    return axios.get(URL_BACKEND)
}

const deleteCourse = (id) => {
    const URL_BACKEND = `/v1/course/${id}`

    return axios.delete(URL_BACKEND)
}
export {
    createUser, fetchUser, fetchSeveralUsersForRoot, fetchSeveralUsersForAdmin, deleteUser, updateUser, activeUser,
    fetchSeveralFields,
    fetchSeveralSkills,
    fetchSeveralAchievements,
    uploadFile,
    login,
    fetchSeveralCourses, deleteCourse

}