<template>
  <div class="blog">
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="(item,index) in categoryList" :title="item.category" :key="index">
        <!-- 内容 -->
        <l-article
        :list="articleList">
        </l-article>
    </van-tab>
</van-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Tab, Tabs } from "vant";
import Vue from "vue";
import LArticle from "@/components/ArticleList";
Vue.use(Tab).use(Tabs);
export default {
    name: "blog",
    data() {
        return {
            active: 0
        };
    },
    components: { LArticle },
    computed: {
        ...mapState("article", ["articleList", "categoryList"])
    },
    methods: {
        ...mapActions("article", ["getArticleList", "getCategoryList"])
    },
    created() {
        if (this.categoryList.length === 0) {
            this.getCategoryList();
        }
    },
    watch: {
        active: {
            handler: function(val, old) {
                const ct = this.categoryList;
                if (ct.length > 0) {
                    this.getArticleList({
                        category_id: ct[val].id,
                        // total: 10,
                        // page: 1
                    });
                }
            },
            immediate:true
        },
        categoryList: function(val, old) {
            this.getArticleList({
                category_id: val[this.active].id,
                // total: 10,
                // page: 1
            });
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/scss/index.scss";

.blog {
    .van-tabs {
        .van-tabs__wrap {
            position: fixed;
            top: 0;
            left: 0;
        }
    }
    .van-tabs__content {
        padding: 0 rem(30);
        margin: rem(10) 0;
        background-color: #fff;
    }
}
</style>
