<template>
  <span class="orderStatusTag" :class="btnClass">
    {{ msgMapping[type] }}
  </span>
</template>

<script>
export default {
  name: "orderStatusTag",
  data() {
    return {
      msgMapping: {
        default: "全部訂單",
        newOrder: "新訂單",
        ready: "已排班",
        arrival: "已抵達",
        boarding: "客上",
        complete: "完成",
        cancel: "已取消",
      },
    };
  },
  props: {
    size: {
      type: String,
      default: "mini",
      require: false,
      validator(size) {
        if (size && !["mini", "normal", "big"].includes(size)) {
          console.error(
            "type類型必須是" + ["mini(小)", "normal(中)", "big(大)"].join(",")
          );
        }
        return true;
      },
    },
    type: {
      type: String,
      default: "default",
      require: false,
      validator(type) {
        if (
          type &&
          ![
            "default",
            "newOrder",
            "ready",
            "arrival",
            "boarding",
            "complete",
            "cancel",
          ].includes(type)
        ) {
          console.error(
            "type類型必須是" +
              [
                "newOrder(新訂單)",
                "ready(已排班)",
                "arrival(已抵達)",
                "boarding(客上)",
                "complete(完成)",
                "cancel(已取消)",
              ].join(",")
          );
        }
        return true;
      },
    },
  },
  computed: {
    btnClass() {
      const classes = [];
      if (this.type) {
        classes.push(`orderStatusTag-${this.type}`);
      }

      if (this.size) {
        classes.push(`orderStatusTag-${this.size}`);
      }
      return classes;
    },
  },
};
</script>

<style lang='scss' >
$height: 42px;
$font-size: 16px;
$color: #3d3d3d;
$border-color: #dcdfe6;
$background: #ecf5ff;
$newOrder: #fa8c16;
$ready: #47c791;
$arrival: #2f54eb;
$boarding: #7653c7;
$complete: #7b8382;
$cancel: #f5222d;

.orderStatusTag {
  border-radius: 4px;
  border: 2px solid $border-color;
  color: $color;
  font-size: 12px;
  padding: 0px 4px;
  font-weight: 700;
  box-sizing: border-box;
  display: inline-block;
  line-height: 19px;

  @each $type,
    $color
      in (
        newOrder: $newOrder,
        ready: $ready,
        arrival: $arrival,
        boarding: $boarding,
        complete: $complete,
        cancel: $cancel
      )
  {
    &-#{$type} {
      background-color: lighten($color, 40);
      border: 1px solid $color;
      color: $color;
    }
  }

  &.orderStatusTag-normal {
    font-size: 14px;
    padding: 2px 6px;
  }

  &.orderStatusTag-big {
    font-size: 16px;
    padding: 4px 8px;
    border: 2px solid;
  }
}
</style>