<template>
  <v-app-bar color="primary" dense dark fixed>
    <!-- <v-spacer></v-spacer> -->
    <div style="width: 20px"></div>
    <v-toolbar-title>尖石鄉公所預約訂車平台</v-toolbar-title>

    <v-btn to="/Login" class="logoutBtn" icon> 登出 </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "headerBar",
};
</script>

<style scoped lang='scss'>
::v-deep .v-toolbar__content {
  justify-content: space-between;
}
::v-deep .v-toolbar__title {
  font-weight: 700;
  font-size: 1rem;
}
</style>