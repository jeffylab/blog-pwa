<template>
    <div class="index">
            <van-nav-bar title="首页">
            <van-icon @click="clickSeach" name="search" slot="right" />
            </van-nav-bar>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="index-body">
            <swiper/>
            <article-list
            :list="articleList">
            </article-list>
            </div>
        </van-pull-refresh>

    </div>
</template>

<script>
function setState(store) {}
import Swiper from "@/components/Swiper";
import ArticleList from "@/components/ArticleList";
import { mapState, mapActions } from "vuex";
import { Toast, PullRefresh,NavBar,Icon } from "vant";
import Vue from "vue";
Vue.use(PullRefresh);
Vue.use(NavBar);
Vue.use(Icon);


export default {
    name: "index",
    metaInfo: {
        title: "Jeffy",
        titleTemplate: "%s - Hello Jeffy PWA-Blog",
        meta: [
            { name: "keywords", content: "Jeffy-pwa" },
            { name: "description", content: "基于pwa构建的博客系统" }
        ]
    },
    async asyncData({ store, route }) {
        setState(store);
    },
    components: { Swiper, ArticleList },
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        ...mapState("article", ["articleList"])
    },
    methods: {
        ...mapActions("article", ["getArticleList"]),
        onRefresh() {
            this.getArticleList()
                .then(res => {
                    this.$toast("刷新成功");
                    this.isLoading = false;
                })
                .catch(err => {
                    this.$toast("刷新失败");
                });
        },
        clickSeach(){
            Toast('暂未实现')
        }
    },
    created() {
        if (this.articleList.length == 0) {
            this.getArticleList();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.index {
    &-body {
        padding: 0 rem(30);
    }
    .van-pull-refresh{
        margin-top: rem(12);
    }
}
</style>
