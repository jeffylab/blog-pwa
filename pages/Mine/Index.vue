<template>
  <div class="mine" :id="!token?'mine':''">
      <div v-if="!token" class="mine-space">
          <label for="username">
            <input v-model="userInput.user_name" id="username" type="text" placeholder="请输入用户名">
            <i class="iconfont icon-wode"></i>
          </label>
          <label for="passwd">
            <input v-model="userInput.password" id="passwd" type="password" placeholder="请输入密码">
            <i class="iconfont icon-kouling"></i>
          </label>
          <div class="mine-space-btn">
              <van-button type="default" @click="clickLogIn">登录</van-button>
                <van-button type="primary" @click="toRegister">注册</van-button>

          </div>
      </div>
      <div v-if="token" class="mine-body">
          <van-nav-bar
            title="我的"
            :left-text="!isEdit?'':'取消'"
            :right-text="!isEdit?'编辑':'保存'"
            @click-right="clickEdit"
            @click-left="clickCancel"
            />
          <div class="mine-body-top">
              <span></span>
              <i @click="editHead"><img :src="cloneUserInfo.head?cloneUserInfo.head:imagData" alt=""></i>
              <p>{{cloneUserInfo.user_name}}</p>
          </div>
          <div class="mine-body-info">
              <van-cell-group>
                <van-field
                    v-model="cloneUserInfo.nick"
                    label="昵称"
                    :disabled="!isEdit"
                    placeholder="编辑信息"
                />
                <van-field
                    v-model="cloneUserInfo.phone"
                    label="手机号"
                    :disabled="!isEdit"
                    placeholder="编辑信息"
                />
                <van-field
                    v-model="cloneUserInfo.email"
                    label="邮箱"
                    placeholder="编辑信息"
                    :disabled="!isEdit"                    
                />
                <van-field
                    v-model="cloneUserInfo.address"
                    label="地址"
                    placeholder="编辑信息"
                    :disabled="!isEdit"
                />
                <van-field
                    v-model="cloneUserInfo.lv"
                    label="Level"
                    disabled
                />
                <van-field
                    v-model="cloneUserInfo.create_time"
                    label="注册日期"
                    disabled
                />
                </van-cell-group>
                <van-cell-group class="mine-exit">
                    <p @click="userExit">退出登录</p>
                </van-cell-group>
          </div>
      </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Button, Toast, Field, NavBar, CellGroup, Dialog } from "vant";
import Vue from "vue";
Vue.use(Button);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(CellGroup);

export default {
    name: "mine",
    data() {
        return {
            userInput: {},
            cloneUserInfo: {},
            isEdit: false,
            option: {}
        };
    },
    methods: {
        ...mapActions("user", ["userLogin", "findUserInfo", "modifyUserInfo","userLogout"]),
        toRegister() {
            this.$router.push("/register");
        },
        clickLogIn() {
            this.userLogin(this.userInput);
        },
        clickEdit() {
            if (this.isEdit) {
                if (!this.editIsok) {
                    Toast("手机或邮箱格式不对");
                    return;
                }
                this.modifyUserInfo(this.cloneUserInfo)
                    .then(res => {
                        Toast("保存成功");
                        this.isEdit = !this.isEdit;
                    })
                    .catch(err => {
                        Toast("Err");
                        return;
                    });
            } else {
                this.isEdit = !this.isEdit;
            }
        },
        clickCancel() {
            this.isEdit = false;
            let info = JSON.stringify(this.userInfo);
            this.cloneUserInfo = JSON.parse(info);
        },
        editHead() {
            if (!this.isEdit) {
                Toast("请先点击右上角编辑");
                return;
            }
            this.$router.push("/tailor");
        },
        userExit(){
            Dialog.confirm({
                title:'确认退出？'
            }).then(()=>{
                this.userLogout()
            }).catch(()=>{})
        }
    },
    computed: {
        ...mapState("user", ["token", "user_name", "userInfo", "imagData"]),
        editIsok() {
            const { phone, email } = this.cloneUserInfo;
            let _phone = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            let _email = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if (_phone.test(phone) && _email.test(email)) {
                return true;
            }
            return false;
        }
    },
    created() {
        if (!this.userInfo.user_name && this.user_name) {
            this.findUserInfo({ user_name: this.user_name });
        }
    },
    watch: {
        userInfo: {
            handler: function(val, old) {
                val = JSON.stringify(val);
                this.cloneUserInfo = JSON.parse(val);
            },
            immediate: true
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.mine {
    position: relative;
    &#mine {
        background: url("../../static/img/bg-login.jpeg")no-repeat center/cover;
    }
    &-space {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        padding: 0 rem(80);
        label {
            position: relative;
            width: 100%;
            i {
                position: absolute;
                top: rem(75);
                left: rem(20);
                font-weight: bold;
                font-size: 18px;
                color: gray;
            }
        }
        [type="text"],
        [type="password"] {
            height: rem(90);
            width: 100%;
            margin-top: rem(50);
            border-radius: rem(10);
            padding-left: rem(62);
            background-color: transparent;
            border: 1px solid rgba($color: #000000, $alpha: 0.2);
        }
        &-btn {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: rem(50);
            button {
                width: 48%;
            }
            .van-button--default {
                background-color: rgba($color: #fff, $alpha: 0.7);
            }
            .van-button--primary {
                background-color: rgba($color: #4b0, $alpha: 0.7);
            }
        }
    }
    &-body {
        &-top {
            position: relative;
            width: 100%;
            height: rem(320);
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url("../../static/img/banner.jpg")no-repeat center/cover;
                opacity: 0.8;
            }
            i {
                position: absolute;
                width: rem(120);
                height: rem(120);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: rem(120);
                background-color: #fff;

                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            p {
                position: absolute;
                color: #fff;
                font-weight: bold;
                bottom: rem(30);
                left: 50%;
                transform: translateX(-50%);
            }
        }
        &-info {
            margin-top: rem(20);
        }
    }
    &-exit {
        margin-top: rem(20);
        p {
            color: $color-red;
            line-height: rem(80);
        }
    }
}
</style>
