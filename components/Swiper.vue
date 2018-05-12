<template>
  <div class="swip">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(item,index) in srcInfo" :key="index">
            <img @click="goTarget(item.id)" :src="item.src" :alt="item.alt">
        </van-swipe-item>
      </van-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import Vue from "vue";
Vue.use(Swipe).use(SwipeItem);
export default {
    name: "swiper",
    data() {
        return {};
    },
    methods: {
        goTarget(id) {
            console.log(id);
        }
    },
    props: {
        srcInfo: {
            type: Array,
            default: () => {
                return [
                    {
                        src:
                            "https://cn.bing.com/az/hprichbg/rb/LongtailedWidowbird_ZH-CN7843068065_1920x1080.jpg",
                        id: "",
                        alt: ""
                    },
                    {
                        src:
                            "https://cn.bing.com/az/hprichbg/rb/NOTricentennial_ZH-CN8971649459_1920x1080.jpg",
                        id: "",
                        alt: ""
                    },
                    {
                        src:
                            "https://cn.bing.com/az/hprichbg/rb/LulworthCoveDorset_ZH-CN6277179810_1920x1080.jpg",
                        id: "",
                        alt: ""
                    }
                ];
            }
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";
.swip {
    .van-swipe {
        border-radius: rem(8);
        width: 100%;
        height: rem(260);
        img {
            width: 100%;
            height: 100%;
        }
    }
    .van-swipe__indicator{
        width: rem(25);
        height: rem(4);
        border-radius: rem(5);
        opacity: .7;
        &.van-swipe__indicator--active{
            background-color: #fff;
        }
    }
}
</style>

