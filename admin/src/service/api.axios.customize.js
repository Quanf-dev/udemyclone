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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // debugger

    return Promise.reject(error);
});



export default instance