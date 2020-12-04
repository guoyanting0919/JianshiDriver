<template>
  <v-bottom-navigation :value="value" color="primary" grow fixed>
    <!-- 收入列表 -->
    <v-btn value="Income" to="/Income">
      <span>收入列表</span>
      <v-icon>fas fa-dollar-sign</v-icon>
    </v-btn>

    <!-- 今日任務 -->
    <v-btn value="Mission" to="/Mission">
      <span>今日任務</span>
      <v-icon>fas fa-car</v-icon>
    </v-btn>

    <!-- 任務歷程 -->
    <v-btn value="History" to="/History">
      <span>任務歷程</span>
      <v-icon>fas fa-tasks</v-icon>
    </v-btn>

    <!-- 聯絡客服 -->
    <v-btn value="Contact" to="/Contact">
      <span>聯絡客服</span>
      <v-icon>fas fa-phone</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNav",
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.value = this.$route.name;
  },
};
</script>

<style scoped lang='scss'>
::v-deep .v-icon {
  margin-bottom: 0.25rem;
}
</style>