<template>
  <div class="reg">
      <!-- navbar -->
      <van-nav-bar
        title="注册用户"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="reg-body">
            <van-cell-group>
            <van-field
                v-model="user_name.name"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                :error="user_name.isErr"
                :error-message="user_name.errMsg"
                required
                @click-icon="user_name.name = ''"
                @blur="verifyUserName"
            />

            <van-field
                v-model="password.pwd"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error="password.isErr"
                :error-message="password.errMsg"
                required
                @blur="verifyPasswd"
            />
            <van-field
                v-model="tryPassword"
                type="password"
                label="重复 "
                placeholder="请重复输入密码"
                :error="password.isErr"
                :error-message="password.errMsg"
                required
                @blur="verifyPasswd"
            />
            <van-field
                v-model="curIdentify.val"
                label="验证码"
                icon="clear"
                placeholder="请输入下方验证码"
                :error="curIdentify.isErr"
                :error-message="curIdentify.errMsg"
                required
                @click-icon="curIdentify.val = ''"
                @blur="verifyIdentifyCode"                
            />
            </van-cell-group>
            <div class="reg-identify" @click="onRefresh">
                <identify
                :identifyCode="identifyCode"
                :contentWidth="300"
                :contentHeight="70"
                :fontSizeMin="24"
                :fontSizeMax="50"
                />
            </div>
            <van-button class="reg-btn" :disabled="!fromOk" @click="clickReg" type="primary">注册</van-button>
        </div>
  </div>
</template>
<script>
import { NavBar, Field, CellGroup, Button, Toast } from "vant";
import Vue from "vue";
import Identify from "@/components/Identify";
import Random from "@/core/uilts/Random";
import { mapActions } from "vuex";

Vue.use(Field);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(CellGroup);
export default {
    name: "register",
    data() {
        return {
            identifyCode: "",
            curIdentify: {
                val: "",
                isErr: false,
                errMsg: ""
            },
            user_name: {
                name: "",
                isErr: false,
                errMsg: ""
            },
            password: {
                pwd: "",
                isErr: false,
                errMsg: ""
            },
            tryPassword: ""
        };
    },
    components: {
        Identify
    },
    methods: {
        ...mapActions("user", ["userRegister"]),
        clickReg() {
            if (!this.fromOk) return;
            this.userRegister({
                user_name: this.user_name.name,
                password: this.password.pwd
            })
                .then(res => {
                    Toast("注册成功");
                    this.$router.push("/mine");
                })
                .catch(err => {
                    Toast("注册失败");
                });
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onRefresh() {
            this.identifyCode = Random("num", 4);
        },
        verifyUserName() {
            let isTrue = /^[a-zA-Z0-9_-]{4,16}$/;
            if (!isTrue.test(this.user_name.name)) {
                this.user_name.isErr = true;
                this.user_name.errMsg =
                    "请输入4到16位（字母，数字，下划线，减号）";
            } else {
                this.user_name.isErr = false;
                this.user_name.errMsg = "";
            }
        },
        verifyPasswd() {
            let isTrue = /^[a-zA-Z]\w{5,17}$/;
            if (!isTrue.test(this.password.pwd)) {
                this.password.errMsg =
                    "以字母开头，长度在6~18之间，只能包含字母、数字和下划线";
                this.password.isErr = true;
                return;
            }
            if (this.password.pwd !== this.tryPassword) {
                this.password.errMsg = "输入的密码不一致";
                this.password.isErr = true;
            } else {
                this.password.isErr = false;
                this.password.errMsg = "";
            }
        },
        verifyIdentifyCode() {
            if (this.curIdentify.val !== this.identifyCode) {
                this.curIdentify.isErr = true;
                this.curIdentify.errMsg = "验证码错误";
            } else {
                this.curIdentify.isErr = false;
                this.curIdentify.errMsg = "";
            }
        }
    },
    computed: {
        fromOk() {
            if (
                this.password.isErr ||
                this.user_name.isErr ||
                this.curIdentify.isErr
            ) {
                return false;
            }
            if (
                this.password.pwd === "" ||
                this.user_name.name === "" ||
                this.curIdentify.val === ""
            ) {
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.identifyCode = Random("num", 4);
    }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.reg {
    &-body {
        margin-top: rem(20);
    }
    &-identify {
        background-color: #fff;
        padding: rem(20);
        margin-top: 2px;
    }
    &-btn {
        margin-top: rem(50);
        width: 80%;
    }
}
</style>

