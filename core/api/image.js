import axios from "@/core/uilts/axios";

const userHead = data => {
    return axios({
        url: "http://localhost:3005/blog/head",
        // url: "/blog/user",
        method: "PSOT",
        data
    });
};

export default {
    userHead
};
