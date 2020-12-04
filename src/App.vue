<template>
  <v-app id="app">
    <loading :active.sync="isLoading"></loading>
    <v-snackbar v-model="snackbar" timeout="-1">
      {{ snackbarText }}
    </v-snackbar>
    <!-- 需要父層樣式 -->
    <div class="needHome" v-if="!$route.meta.NoNeedHome">
      <HeaderBar />
      <div class="appMainContainer">
        <router-view></router-view>
      </div>
      <BottomNav />
    </div>
    <!-- 不須父層樣式 -->
    <div v-else>
      <div class="noNeedHome">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
import Loading from "vue-loading-overlay";
import HeaderBar from "./components/HeaderBar";
import BottomNav from "./components/BottomNav";

export default {
  name: "App",
  components: {
    Loading,
    HeaderBar,
    BottomNav,
  },
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
    snackbarText() {
      return this.$store.state.snackbarText;
    },
  },
};
</script>
<style lang="scss" scoped>
.appMainContainer {
  margin-top: 48px;
  margin-bottom: 56px;
  min-height: calc(100vh - 104px);
  background: #f5f5f5;
  // padding: 8px;
}
</style>
