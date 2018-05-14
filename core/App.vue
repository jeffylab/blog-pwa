<template>
    <div id="app" class="app">
        <transition
            :name="pageTransitionEffect"
            @before-enter="handleBeforeEnter"
            @after-enter="handleAfterEnter"
            @before-leave="handleBeforeLeave">
            <keep-alive
                :include="[...keepAlivePages]">
                <router-view
                    :key="routerViewKey"
                    :class="['app-view', pageTransitionClass]"
                    :data-page-id="$route.fullPath">
                </router-view>
            </keep-alive>
        </transition>
        <update-toast></update-toast>
        <!--  navBar -->
        <div v-show="barIsShow" class="app-bar">
        <van-tabbar v-model="active" @change="changeBar">
        <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item icon="edit-data">博客</van-tabbar-item>
        <van-tabbar-item icon="password-view">图册</van-tabbar-item>
        <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import UpdateToast from "@/components/UpdateToast";
import { keepAlivePages } from "@/.lavas/router";
import { Tabbar, TabbarItem, SwitchCell } from "vant";

Vue.use(Tabbar).use(TabbarItem);

const ENABLE_SCROLL_CLASS = "app-view-scroll-enabled";

export default {
    name: "app",
    components: {
        UpdateToast
    },
    computed: {
        ...mapState("pageTransition", {
            pageTransitionType: state => state.type,
            pageTransitionEffect: state => state.effect
        }),

        ...mapState("scrollBehavior", {
            scrollPostionMap: state => state.scrollPostionMap
        }),
        ...mapState("user", ["user_name"]),

        pageTransitionClass() {
            return `transition-${this.pageTransitionType}`;
        },

        routerViewKey() {
            let { name, params } = this.$route;
            let paramKeys = Object.keys(params);
            if (paramKeys.length) {
                return (
                    name +
                    paramKeys.reduce((prev, cur) => prev + params[cur], "")
                );
            }
            return null;
        }
    },
    data() {
        return {
            keepAlivePages,
            active: 0,
            barIsShow: true
        };
    },
    methods: {
        ...mapActions("scrollBehavior", ["savePageScrollPosition"]),
        /**
         * make current page container scrollable,
         * and restore its scroll position.
         */
        restoreContainerScrollPosition(containerEl, scrollTop) {
            containerEl.classList.add(ENABLE_SCROLL_CLASS);
            containerEl.scrollTop = scrollTop;
        },

        /**
         * make body scrollable,
         * and restore its scroll position.
         */
        restoreBodyScrollPosition(containerEl, scrollTop) {
            containerEl.classList.remove(ENABLE_SCROLL_CLASS);
            document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
        },

        handleBeforeEnter(el) {
            let pageId = el.dataset.pageId;
            let { y: scrollTop = 0 } = this.scrollPostionMap[pageId] || {};
            Vue.nextTick(() => {
                this.restoreContainerScrollPosition(el, scrollTop);
            });
        },

        handleAfterEnter(el) {
            let pageId = el.dataset.pageId;
            let { y: scrollTop = 0 } = this.scrollPostionMap[pageId] || {};
            this.restoreBodyScrollPosition(el, scrollTop);
        },

        handleBeforeLeave(el) {
            let pageId = el.dataset.pageId;
            let scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            this.restoreContainerScrollPosition(el, scrollTop);
            // save current scroll position in a map
            this.savePageScrollPosition({
                pageId,
                scrollPosition: { y: scrollTop }
            });
        },
        changeBar(active) {
            active++;
            switch (active) {
                case 1:
                    active = "/";
                    break;
                case 2:
                    active = "/blog";
                    break;
                case 3:
                    active = "/image";
                    break;
                case 4:
                    active = "/mine";
                    break;
                default:
                    active = "/";
                    break;
            }
            this.$router.push(active);
        }
    },
    watch: {
        $route: {
            handler: function(val, old) {
                if (val.name === "tailor") {
                    this.barIsShow = false;
                } else {
                    this.barIsShow = true;
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
$page-transition-duration: 0.25s;

.app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    .app-bar {
        .van-tabbar {
            height: rem(100);
            background-color: rgba($color: #fff, $alpha: 0.9);
        }
    }
    .app-view {
        -webkit-overflow-scrolling: touch;
        background-color: #f8f8f8;
        overflow: scroll;
        padding-bottom: rem(100);
        height: 100%;

        &::-webkit-scrollbar {
            width: 0;
            background: transparent;
        }

        &.transition-slide {
            transition: transform $page-transition-duration
                cubic-bezier(0, 0, 0.2, 1);

            &.slide-left-enter {
                transform: translate(100%, 0);
            }

            &.slide-left-enter-active {
                box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
            }

            &.slide-right-enter {
                transform: translate(-30%, 0);
                transition-timing-function: linear;
            }

            &.slide-right-leave-active {
                transform: translate(100%, 0);
                box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
                z-index: 99;
            }

            &.slide-left-leave-active {
                transform: translate(-30%, 0);
                transition-timing-function: linear;
            }

            &.app-view-scroll-enabled,
            &.slide-left-enter-active,
            &.slide-left-leave-active,
            &.slide-right-enter-active,
            &.slide-right-leave-active {
                overflow-y: auto;
            }
        }

        &.transition-fade {
            opacity: 1;
            transition: opacity 1s ease;

            &.fade-enter {
                opacity: 0;
            }

            &.fade-leave-active {
                opacity: 0;
            }
        }
    }
}
</style>
