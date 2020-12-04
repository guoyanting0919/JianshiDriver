<template>
  <div id="Income">
    <img class="noDataImg" src="../../assets/images/noData.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "Income",
};
</script>

<style scoped lang='scss'>
#Income {
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;

  .noDataImg {
    width: 150px;
    height: 180px;
  }
}
</style>