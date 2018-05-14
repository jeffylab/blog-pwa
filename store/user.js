import userApi from "@/core/api/user";
import objStorage from "@/core/uilts/objStorage";
import md5 from "@/core/uilts/md5";

export const state = () => {
    let _loginfo = objStorage.getItem("_loginfo");

    return {
        token: _loginfo.token || undefined,
        user_name: _loginfo.user_name || undefined,
        userInfo: {},
        imagData: "/static/img/head-2.jpg"
    };
};

export const mutations = {
    SET_TOKEN: (state, data) => {
        state.token = data.token;
        state.user_name = data.user_name;
    },
    SET_USERINFO: (state, info) => {
        state.userInfo = info;
    },
    MODIFY_USERINFO: (state, data) => {
        for (const key in data) {
            state.userInfo[key] = data[key];
        }
    }
};

export const actions = {
    userLogin: async ({ commit }, data) => {
        // md5加密
        data.password = md5(data.password);
        try {
            const res = await userApi.login(data);
            const log_info = {
                token: res.token,
                user_name: res.data[0].user_name
            };
            commit("SET_TOKEN", log_info);
            objStorage.setItem("_loginfo", log_info);
            commit("SET_USERINFO", res.data[0]);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    findUserInfo: async ({ commit }, data) => {
        const res = await userApi.getUserInfo(data);
        commit("SET_USERINFO", res.data[0]);
    },
    userLogout: async ({ commit }) => {
        commit("SET_TOKEN", { token: "", user_name: "" });
        window.localStorage.removeItem("_loginfo");
    },
    userRegister: async ({ commit }, data) => {
        // md5加密
        data.password = md5(data.password);
        try {
            const res = await userApi.register(data);
            const log_info = {
                token: res.token,
                user_name: res.data[0].user_name
            };
            commit("SET_TOKEN", log_info);
            objStorage.setItem("_loginfo", log_info);
            commit("SET_USERINFO", res.data[0]);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    modifyUserInfo: async ({ commit, state }, data) => {
        let user_info = JSON.stringify(state.userInfo);
        commit("MODIFY_USERINFO", data);
        try {
            await userApi.modifyUserInfo(state.userInfo);
            return Promise.resolve(1);
        } catch (error) {
            commit("MODIFY_USERINFO", JSON.parse(user_info));
            return Promise.reject(0);
        }
    }
};
