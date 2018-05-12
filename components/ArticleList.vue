<template>
  <div class="list">
      <ul>
        <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        >
          <li class="list-li" v-for="item in list" :key="item.id">
              <p class="list-li-title">{{item.title}}</p>
              <p class="list-li-body">{{item.abstract}}</p>
              <div class="list-li-foot">
                <div class="list-li-foot-l">
                    <i class="iconfont icon-wode">&nbsp;{{item.author}}</i>
                  <span>{{item.create_time}}</span>
                </div>                  
                <div class="list-li-foot-r">
                    <i class="iconfont icon-pinglun">&nbsp;{{item.m_count}}</i>
                </div>
              </div>
          </li>
        </van-list>
        </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Toast, List } from "vant";
import Vue from "vue";
Vue.use(List);

export default {
    name: "articlelist",
    data() {
        return {
            page: 1,
            loading: false,
            finished: false
        };
    },
    methods: {
        ...mapActions("article", ["pushArticleList"]),
        onLoad() {
            let count = this.page + 1;
            this.pushArticleList(count, this.category)
                .then(res => {
                    this.loading = false;
                    if (res < 10) {
                        this.finished = true; // 若数据已全部获取完毕
                        Toast("没有更多了");
                    }
                })
                .catch(err => {
                    this.loading = false;
                    Toast("网络错误");
                });
        }
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return [
                    // {
                    //     id:'',
                    //     title:'',
                    //     article:'',
                    //     category_id:'',
                    //     create_time:'',
                    //     author:''
                    // }
                ];
            }
        },
        category: {
            type: String,
            default: ""
        }
    },
    watch: {
        category: function(val, old) {
            this.page = 1;
            this.finished = false;
        }
    }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/index.scss";
.list {
    &-li {
        height: rem(190);
        text-align: left;
        & + li {
            border-top: 1px solid rgba($color: $color-black, $alpha: 0.1);
        }

        &-title {
            padding-top: rem(20);
            padding-bottom: rem(10);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        &-body {
            line-height: rem(36);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 12px;
            color: $font-min;
        }
        &-foot {
            display: flex;
            justify-content: space-between;
            padding-top: rem(14);
            font-size: 10px;
            i {
                font-style: normal;
            }
            &-r,
            &-l {
                i {
                    font-size: 10px;
                }
                span {
                    color: gray;
                    padding-left: rem(6);
                }
            }
        }
    }
}
</style>
