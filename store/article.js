import articleApi from "@/core/api/article";

export const state = () => {
    return {
        articleList: [],
        categoryList: []
    };
};

export const mutations = {
    SET_ARTICLE_LIST: (state, list) => {
        state.articleList = list;
    },
    PUSH_ARTICLE_LIST: (state, list) => {
        state.articleList.push(...list);
    },
    SET_CATEGORY_LIST: (state, list) => {
        state.categoryList = list;
    }
};

export const actions = {
    getArticleList: async ({ commit }, data) => {
        try {
            const res = await articleApi.getArticleList(data);
            commit("SET_ARTICLE_LIST", res.data);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    pushArticleList: async ({ commit }, page, category_id) => {
        let params = {
            total: 10,
            page,
            category_id
        };
        // debugger
        if (!category_id) delete params.category_id;
        try {
            const res = await articleApi.getArticleList(params);
            commit("PUSH_ARTICLE_LIST", res.data);
            return Promise.resolve(res.data.length);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getCategoryList: async ({ commit }) => {
        const res = await articleApi.getCategory();
        commit("SET_CATEGORY_LIST", res.data);
    }
};
