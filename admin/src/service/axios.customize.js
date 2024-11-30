import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Add a request interceptor
// cấu hình request trước khi gọi tới backend
instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined"
        && window
        && window.localStorage
        && window.localStorage.getItem('access_token')
    ) {
        // gán vào header
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
// cấu hình kết quả (data) trước khi phản hồi , trả về tới frontend
instance.interceptors.response.use(function (response) {

    if (response.data && response.data.data) {
        return response.data;
    }

    return response
}, function (error) {

    console.log(error)

    if (error.code === 'ERR_NETWORK') {
        return error.message
    } else if (error.response && error.response.data) {
        return error.response.data
    } else {
        return 'Something wrong!'
    }

    // return Promise.reject(error);
});



export default instance