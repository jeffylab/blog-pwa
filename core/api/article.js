import axios from "@/core/uilts/axios";

const getArticleList = data => {
    let param = "";
    if (data) {
        let str = "?";
        for (const key in data) {
            str = str + key + "=" + data[key] + "&";
        }
        param = str.slice(0, -1);
    }
    return axios({
        url: `/article/list${param}`,
        method: "GET"
    });
};

export default {
    getArticleList
};
