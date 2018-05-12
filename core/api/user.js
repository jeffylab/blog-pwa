import axios from '@/core/uilts/axios';

const login = data =>{
    return axios({
        url:'/user/login',
        method:'POST',
        data
    })
}

const register = data =>{
    return axios({
        url:'/user',
        method:'POST',
        data
    })
}

const getUserInfo = (data)=>{
    return axios({
        url:'/getinfo',
        method:'POST',
        data
    })
}


export default {
    login,
    register,
    getUserInfo
}