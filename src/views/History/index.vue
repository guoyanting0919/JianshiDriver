<template>
  <!--  :readonly="i == 1"   :color="i > 2 ? '#ffeedf' : '#fff'" -->
  <div id="History">
    <v-expansion-panels v-model="open" multiple>
      <v-expansion-panel v-for="item in list" :key="item.despatchNo">
        <v-expansion-panel-header :hide-actions="true">
          <div class="panelHeader">
            {{ item.despatchNo }}
            <i class="fas fa-users" v-if="item.datas.length > 1">共乘單</i>
            <v-btn
              color="primary"
              elevation="2"
              small
              @click="handleAction(item.despatchNo)"
              >查看</v-btn
            >
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div
            class="despatchCard"
            v-for="despatch in item.datas"
            :key="despatch.id"
          >
            <div class="cardHeader">
              <div class="userName">
                {{ despatch.userName }}
                <OrderStatusTag
                  :type="orderStatusMapping[despatch.status - 1]"
                ></OrderStatusTag>
              </div>
              <div class="despatchStatus">
                <span class="date"
                  ><i class="far fa-clock"></i
                  >{{ despatch.reserveDate | timeFilter }}</span
                >
                <span class="carType"
                  ><i class="fas fa-car-alt"></i
                  >{{ despatch.carCategoryName }}</span
                >
                <span class="passengerNum"
                  ><i class="fas fa-user-friends"></i>搭乘人數
                  {{ despatch.passengerNum }} 人</span
                >
              </div>
            </div>
            <div class="cardBody">
              <p class="fromAddr">
                <i class="fas fa-thumbtack"></i>{{ despatch.fromAddr }}
              </p>
              <p class="toAddr">
                <i class="fas fa-map-marker-alt"></i>{{ despatch.toAddr }}
              </p>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import OrderStatusTag from "@/components/OrderStatusTag/index.vue";
export default {
  name: "History",
  components: { OrderStatusTag },
  data() {
    return {
      // order status mapping
      orderStatusMapping: [
        "newOrder",
        "ready",
        "arrival",
        "boarding",
        "complete",
        "cancel",
        "cancel",
        "cancel",
        "cancel",
      ],
      open: [],
      list: [],
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        key: undefined,
        StartDate: "",
        EndDate: "",
      },
    };
  },
  filters: {
    timeFilter(date) {
      return date.split(" ")[1].slice(0, 5);
    },
  },
  methods: {
    // 獲取派遣單
    getList() {
      const vm = this;
      vm.$api.GetDespatch(vm.listQuery).then((res) => {
        console.log(res);
        vm.list = res.data.data;
        vm.list.forEach((item, idx) => {
          if (item.datas.length == 1) {
            vm.open.push(idx);
          }
        });
      });
    },
    handleAction(despatchNo) {
      this.$router.push(`/Mission/Action/${despatchNo}`);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>


<style scoped lang='scss'>
#History {
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .panelHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fa-users::before {
    margin-right: 4px;
  }

  .despatchCard {
    width: 100%;
    height: 160px;
    // border-bottom: 2px dashed #f38c00;
    // background: lightblue;
  }

  .cardHeader {
    height: 50%;
    // background: lightgreen;
    padding: 0.5rem 1rem;
  }

  .userName {
    font-size: 20px;
    font-weight: 700;
    height: 50%;
    color: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .despatchStatus {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f38c00;
    font-size: 14px;
    font-weight: 700;
    height: 50%;

    i {
      margin-right: 0.25rem;
    }
  }

  .cardBody {
    height: 50%;
    background: #fafafa;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .fromAddr,
  .toAddr {
    font-size: 14px;
    margin: 0;
    color: rgba(0, 0, 0, 0.65);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    i {
      color: #f38c00;
      margin-right: 0.4rem;
    }
  }
  .fromAddr {
    margin-bottom: 0.5rem;
  }
}
::v-deep .v-expansion-panel-content__wrap {
  padding: 0;
}

::v-deep .v-expansion-panel-header {
  padding: 0.5rem 1rem;
}
</style>