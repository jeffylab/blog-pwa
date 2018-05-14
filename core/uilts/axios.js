import baseAxios from "axios";
import qs from "qs";
import { state, actions } from "../../store/user";
import { Toast } from "vant";

const instance = baseAxios.create({
    baseURL: "https://api.xiexiaoshun.com/v1",
    timeout: 1000,
    headers: { "content-type": "application/x-www-form-urlencoded" }
});
instance.interceptors.request.use(
    config => {
        config.headers["Token"] = state().token;
        config.data = qs.stringify(config.data);
        return config;
    },
    err => {
        Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            Toast(res.msg);
            if (res.code === 202) {
                actions().userLogout();
            }
            return Promise.reject("error");
        } else {
            return response.data;
        }
    },
    error => {
        Toast(error);
        return Promise.reject(error);
    }
);

export default instance;
