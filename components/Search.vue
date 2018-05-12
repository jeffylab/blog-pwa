<template>
  <div class="sc">
    <!-- <mt-search
    class="sc-box"
    v-model="value"
    cancel-text="取消"
    placeholder="搜索">
        <ul class="sc-res">
            <li>haha</li>
            <li>haha</li>
            <li>haha</li>
        </ul>
    </mt-search> -->
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: "",
      result: [
        { name: "jeffy", age: 11 },
        { name: "jeffy2", age: 12 },
        { name: "jeffy3", age: 13 }
      ]
    };
  },
  methods: {}
};
</script>
<style scopde lang="scss">
@import "../assets/scss/index.scss";

.sc {
  height: rem(80);
  &-box {
    .mint-searchbar {
      background-color: #fff;
    }
    .mint-searchbar-cancel{
        color: $color-black;
    }
    .mint-searchbar-inner {
      background-color: $bg-gray;
      border-radius: rem(10);
      i {
        font-size: 16px;
        color: $color-black;
        padding-left: rem(10);
      }
    }
    .mint-searchbar-core {
      background-color: $bg-gray;
      padding-left: rem(20);
    }
  }
  &-res {
    width: 100%;
    li {
      width: 100%;
      height: rem(60);
      line-height: rem(60);
      text-align: left;
      padding: 0 rem(25);
    }
  }
}
</style>

