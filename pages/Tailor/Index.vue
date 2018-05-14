<template>
  <div class="cut" id="cut">
      <van-nav-bar
        title="个人头像"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        >
    <van-uploader slot="right" :after-read="onRead">
    <van-icon name="photograph" />
    </van-uploader>
</van-nav-bar>
      <VueCropper 
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :fixed="option.fixed"
        :fixedBox="option.fixedBox"
        :canScale="option.canScale"
        :autoCrop="option.autoCrop"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        >
    </VueCropper>
    <div class="cut-bar">
        <i @click="rotate">旋转</i>
        <i @click="finish">完成</i>
    </div>
  </div>
</template>
<script>
import VueCropper from "vue-cropper";
import Request from "@/core/uilts/xhr";
import { NavBar, Uploader, Icon, Toast } from "vant";
import { mapActions } from "vuex";
import imageApi from "@/core/api/image";
import Vue from "vue";
Vue.use(NavBar);
Vue.use(Uploader);
Vue.use(Icon);

export default {
    name: "tailor",
    data() {
        return {
            option: {
                img: "/static/img/head-1.jpg",
                outputSize: 0.8,
                outputType: "webp",
                fixed: true,
                fixedBox: true,
                autoCrop: true,
                autoCropHeight: 200,
                autoCropWidth: 200,
                canScale: true,
                canMoveBox: false,
                original: true
            }
        };
    },
    components: { VueCropper },
    methods: {
        ...mapActions("user", ["modifyUserInfo"]),
        onClickLeft() {
            this.$router.go(-1);
        },
        onRead(file) {
            this.option.img = file.content;
        },
        finish() {
            const self = this;
            this.$refs.cropper.getCropData(async data => {
                const res = await Request("blog/user", {
                    imagData: data
                });
                const res2 = await self.modifyUserInfo({
                    head: res.data[0]
                });
                if (res2) {
                    Toast("保存成功");
                    self.$router.push("/mine");
                } else {
                    Toast("Err");
                }
            });
        },
        rotate() {
            this.$refs.cropper.rotateRight();
        }
    }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.cut {
    display: flex;
    flex-direction: column;
    background-color: rgba($color: #000000, $alpha: 0.8);
    width: 100%;
    height: 100%;
    .van-icon-photograph {
        font-size: rem(35);
    }
    &#id {
        padding-bottom: 0;
    }
    .vue-cropper {
        flex: 1;
        background: none;
        // position: static;
        padding-top: rem(50);
        .cropper-view-box {
            outline: 1px solid #000;
        }
    }
    &-bar {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        bottom: 0;
        left: 0;
        height: rem(110);
        width: 100%;
        color: white;
        background-color: black;
        border-top: 1px solid rgba($color: #fff, $alpha: 0.1);
        padding: 0 rem(50);
        i {
            font-style: normal;
        }
    }
}
</style>
