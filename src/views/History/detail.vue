<template>
  <div id="actionMission">
    <!-- 共乘分頁 -->
    <v-tabs
      v-model="tabModel"
      background-color="primaryLight"
      center-active
      v-if="list"
    >
      <v-tab
        @click="temp = item"
        v-for="(item, idx) in list"
        :key="item.id"
        :href="`#tab-${idx + 1}`"
        >{{ item.userName }}</v-tab
      >
    </v-tabs>

    <!-- 共乘詳細資料 -->
    <v-tabs-items v-model="tabModel" :touchless="true">
      <v-tab-item
        v-for="(despatch, idx) in list"
        :key="despatch.id"
        :value="`tab-${idx + 1}`"
      >
        <!-- 基本資訊卡片 -->
        <div class="despatchCard">
          <div class="cardHeader">
            <div class="userName">
              {{ despatch.userName }}
              <OrderStatusTag
                :type="orderStatusMapping[despatch.status - 1]"
              ></OrderStatusTag>
            </div>
            <div class="despatchStatus">
              <span @click="resetBtn('4')" class="date"
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

        <!-- 已完成卡片 -->
        <div v-if="despatch.status == 5" class="isComplete">
          <v-card class="a">
            <v-card-title class="headline" style="padding-bottom: 0">
              <p class="dialogTitle">搭乘資料</p>
            </v-card-title>
            <v-card-text v-if="list">
              <v-form
                :ref="`form${despatch.id}`"
                v-model="valid"
                lazy-validation
              >
                <div class="dialogBox">
                  <v-select
                    autocomplete="off"
                    label="搭蟲人數"
                    :rules="requireInput"
                    disabled
                    v-model="list[idx].realPassengerNum"
                    :items="passengerArr"
                  ></v-select>
                </div>
                <div class="dialogBox">
                  <v-text-field
                    autocomplete="off"
                    label="實收車資"
                    disabled
                    :rules="requireInput"
                    v-model="list[idx].realSelfPay"
                    required
                  ></v-text-field>
                </div>
                <div class="dialogBox">
                  <v-text-field
                    label="備註"
                    disabled
                    :rules="requireInput"
                    autocomplete="off"
                    v-model="list[idx].payRemark"
                    required
                  ></v-text-field>
                </div>
                <img :src="list[idx].signPic" alt="" />
              </v-form>
            </v-card-text>
          </v-card>
        </div>

        <!-- 客上名單 僅已抵達狀態時顯示 -->
        <v-card class="a" v-if="despatch.status == 3">
          <v-card-title class="headline">
            <p class="dialogTitle">
              請與個案核對身份及目的地，若有問題請聯繫行控中心
            </p>
          </v-card-title>
          <v-card-text>
            <div class="dialogBox">
              <h4>搭乘名單</h4>
              <div v-if="passengerList">
                <span v-for="item in passengerList" :key="item.key"
                  >{{ item.name }} / {{ item.birth }}
                </span>
              </div>
            </div>
            <div class="dialogBox">
              <h4>聯絡電話</h4>
              <div>
                {{ temp.noticePhone }}
              </div>
            </div>
            <div class="dialogBox">
              <h4>下車地址</h4>
              <div>
                {{ temp.toAddr }}
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- 搭乘資料 僅客上狀態時顯示 -->
        <!-- <v-card
          class="a"
          v-if="despatch.status == 4 && realTempList[despatch.id]"
        >
          <v-card-title class="headline" style="padding-bottom: 0">
            <p class="dialogTitle">
              搭乘資料<i
                v-if="realTempList[despatch.id].signPic"
                class="far isSign fa-check-circle"
                >已簽名</i
              >
              <i v-else class="far isNotSign fa-times-circle">尚未簽名</i>
            </p>
          </v-card-title>
          <v-card-text>
            <v-form :ref="`form${despatch.id}`" v-model="valid" lazy-validation>
              <div class="dialogBox">
                <v-select
                  autocomplete="off"
                  label="陪同人數"
                  :rules="requireInput"
                  v-model="realTempList[despatch.id].realPassengerNum"
                  :items="passengerArr"
                ></v-select>
              </div>
              <div class="dialogBox">
                <v-text-field
                  autocomplete="off"
                  label="實收車資"
                  :rules="requireInput"
                  v-model="realTempList[despatch.id].realSelfPay"
                  required
                ></v-text-field>
              </div>
              <div class="dialogBox">
                <v-text-field
                  label="備註"
                  :rules="requireInput"
                  autocomplete="off"
                  v-model="realTempList[despatch.id].remark"
                  required
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
        </v-card> -->

        <!-- drag2 抵達上車地點滑動解鎖 -->
        <!-- <div class="dv" v-show="despatch.status == 2">
          <dragVerify2
            :ref="`dragVerify2${despatch.id}`"
            :width="300"
            :height="45"
            :isPassing.sync="despatch.isPassing2"
            text="抵達上車地點  請滑動按鈕"
            successText="操作成功"
            completedBg="#f38c00"
            background="#ffc18a"
            progressBarBg="#f38c00"
            handlerIcon="fas fa-angle-double-right"
            successIcon="far fa-check-circle"
            @passcallback="passcallback2"
          >
            <i
              v-show="!despatch.isPassing2"
              slot="textBefore"
              class="fas fa-lock"
            ></i>
          </dragVerify2>
        </div> -->

        <!-- drag3 客上滑動解鎖-->
        <!-- <div class="dv" v-show="despatch.status == 3">
          <dragVerify2
            :ref="`dragVerify3${despatch.id}`"
            :width="300"
            :height="45"
            :isPassing.sync="despatch.isPassing3"
            text="客上  請滑動按鈕"
            successText="操作成功"
            completedBg="#f38c00"
            background="#ffc18a"
            progressBarBg="#f38c00"
            handlerIcon="fas fa-angle-double-right"
            successIcon="far fa-check-circle"
            @passcallback="passcallback3"
          >
            <i
              v-show="!despatch.isPassing3"
              slot="textBefore"
              class="fas fa-lock"
            ></i>
          </dragVerify2>
        </div> -->

        <!-- drag4 完成滑動解鎖-->
        <!-- <div class="dv" v-show="despatch.status == 4">
          <dragVerify2
            :ref="`dragVerify4${despatch.id}`"
            :width="300"
            :height="45"
            :isPassing.sync="despatch.isPassing4"
            text="完成  請滑動按鈕"
            successText="操作成功"
            completedBg="#f38c00"
            background="#ffc18a"
            progressBarBg="#f38c00"
            handlerIcon="fas fa-angle-double-right"
            successIcon="far fa-check-circle"
            @passcallback="passcallback4(despatch.id)"
          >
            <i
              v-show="!despatch.isPassing4"
              slot="textBefore"
              class="fas fa-lock"
            ></i>
          </dragVerify2>
          <v-btn
            small
            @click="handleSign"
            color="primary"
            style="margin-left: 1rem"
            elevation="2"
            >簽名</v-btn
          >
        </div> -->

        <!-- drag9 空趟滑動解鎖-->
        <!-- <div style="margin-top: 8px" class="dv" v-show="despatch.status == 3">
          <dragVerify2
            :ref="`dragVerify9${despatch.id}`"
            :width="300"
            :height="45"
            :isPassing.sync="despatch.isPassing9"
            text="空趟  請滑動按鈕"
            successText="操作成功"
            completedBg="#ff5656"
            background="#ff5b5b66"
            progressBarBg="#ff5656"
            handlerIcon="fas fa-angle-double-right"
            successIcon="far fa-check-circle"
            @passcallback="passcallback9"
          >
            <i
              v-show="!despatch.isPassing9"
              slot="textBefore"
              class="fas fa-lock"
            ></i>
          </dragVerify2>
        </div> -->
      </v-tab-item>
    </v-tabs-items>

    <!-- 確認空趟dialog -->
    <!-- <v-dialog v-model="cancelDialog" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">
          <p class="dialogTitle">確認空趟？</p>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleDisagreeCancel">
            取消
          </v-btn>
          <v-btn color="green darken-1" text @click="confirmCancel">
            確認空趟
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- 簽名dialog -->
    <!-- <v-dialog v-model="signDialog" max-width="100%">
      <v-card>
        <v-card-title class="headline">
          <p class="dialogTitle">簽名</p>
        </v-card-title>
        <v-card-text>
          <vue-esign
            ref="esign"
            :width="300"
            :height="300"
            :isCrop="isCrop"
            :lineWidth="lineWidth"
            :lineColor="lineColor"
            :bgColor.sync="bgColor"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="signDialog = false">
            取消
          </v-btn>
          <v-btn color="green darken-1" text @click="handleReset"> 清空 </v-btn>
          <v-btn color="green darken-1" text @click="handleGenerate">
            確認簽名
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import dragVerify2 from "vue-drag-verify2";
import OrderStatusTag from "@/components/OrderStatusTag/index.vue";
export default {
  name: "actionMission",
  components: {
    dragVerify2,
    OrderStatusTag,
  },
  data() {
    return {
      //表單驗證
      valid: true,
      requireInput: [(v) => !!v || "必填"],
      //簽名板設置
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "#dddddd",
      resultImg: "",
      isCrop: false,

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
      //派遣單資料
      list: [],

      // 當筆派遣單
      temp: "",

      // 預設分頁
      tabModel: "tab-1",

      // dialogs
      signDialog: false,
      cancelDialog: false,

      // 完成訂單欄位
      realTempList: {},
      // realTemp: {
      //   id: "string",
      //   realFamilyWith: 0,
      //   realMaidWith: 0,
      //   realWithAmt: 0,
      //   realDiscountPercent: 0,
      //   realDiscountAmt: 0,
      //   realSelfPay: 0,
      //   receivePay: 0,
      //   signPic: "",
      // },
    };
  },
  filters: {
    timeFilter(date) {
      return date.split(" ")[1].slice(0, 5);
    },
  },
  computed: {
    passengerList() {
      if (this.temp) {
        return JSON.parse(this.temp.remark);
      }
    },
    passengerArr() {
      if (this.temp) {
        let arr = [];
        for (let i = 1; i <= this.temp.passengerNum; i++) {
          arr.push(i);
        }
        return arr;
      }
    },
  },
  methods: {
    consoleBtn(id) {
      console.log(this.realTempList[id]);
    },
    //獲取訂單資料
    async getOrder() {
      const vm = this;
      let params = {
        id: vm.$route.params.id,
      };
      await vm.$api.GetDespatchGroup(params).then((res) => {
        vm.list = res.data.result;

        vm.list.forEach((item) => {
          vm.$set(item, "isPassing2", false);
          vm.$set(item, "isPassing3", false);
          vm.$set(item, "isPassing4", false);
          vm.$set(item, "isPassing9", false);
        });
      });
    },

    //設置訂單資訊
    setRealTempList() {
      const vm = this;
      vm.list.forEach((item) => {
        vm.$set(vm.realTempList, `${item.id}`, {});
      });
      vm.list.forEach((item) => {
        vm.$set(vm.realTempList[item.id], "realPassengerNum", 0); //實際搭乘人數
        vm.$set(vm.realTempList[item.id], "realSelfPay", ""); //實收金額
        vm.$set(vm.realTempList[item.id], "signPic", ""); //簽名bas64
        vm.$set(vm.realTempList[item.id], "remark", ""); //備註
      });
    },

    // 重置滑動解鎖
    resetBtn(status) {
      console.log("resetBtn");
      let ref = `dragVerify${status}${this.temp.id}`;
      console.log(ref);
      this.$refs[ref][0].reset();
    },

    //變更狀態
    handleChangeStatus(status) {
      const vm = this;
      let params = {
        id: vm.temp.id,
        status,
      };
      console.log(status);
      console.log(params);
      vm.$api.ChangeStatus(params).then((res) => {
        this.$store.dispatch("snackbarHandler", "操作成功");
        this.getOrder();
        this.resetBtn(status);
      });
    },

    //已抵達滑動解鎖cb
    passcallback2() {
      this.handleChangeStatus("3");
    },

    //客上滑動解鎖cb
    passcallback3() {
      this.handleChangeStatus("4");
    },

    //完成滑動解鎖cb
    passcallback4(idx) {
      console.log();
      // let num = this.list.filter((i) => {
      //   return i.status == 5;
      // });
      // console.log(num.length);
      let ref = `form${idx}`;
      console.log(ref);
      if (
        this.$refs[ref][0].validate() &&
        this.realTempList[this.temp.id].signPic != ""
      ) {
        this.realTempList[this.temp.id].id = this.temp.id;
        console.log(this.realTempList[this.temp.id]);

        this.$api
          .MissionComplete(this.realTempList[this.temp.id])
          .then((res) => {
            console.log(res);
            this.getOrder();
          });
      } else {
        console.log("submit false");
        let id = this.temp.id;
        let ref = `dragVerify4${this.temp.id}`;
        this.list.forEach((item) => {
          if (item.id == id) {
            item.isPassing4 = false;
            this.$refs[ref][0].reset();
            // console.log(this.$refs[ref][0]);
          }
        });
      }
    },

    //空趟滑動解鎖cb
    passcallback9() {
      this.cancelDialog = true;
    },

    //確認空趟
    confirmCancel() {
      let params = {
        cancelRemark: "SYS_ORDERCANCEL_REMARK_DRIVER",
        id: this.temp.id,
      };
      this.$api.CancelDespatch(params).then((res) => {
        this.getOrder();
        this.cancelDialog = false;
        this.$store.dispatch("snackbarHandler", "操作成功");
      });
    },

    //取消空趟
    handleDisagreeCancel() {
      this.cancelDialog = false;
      let id = this.temp.id;
      let ref = `dragVerify9${this.temp.id}`;
      this.list.forEach((item) => {
        if (item.id == id) {
          item.isPassing9 = false;
          this.$refs[ref][0].reset();
          console.log(this.$refs[ref][0]);
        }
      });
    },

    // 打開簽名 dialog
    handleSign() {
      this.signDialog = true;
      this.$nextTick(() => {
        this.handleReset();
      });
    },

    //清空面板
    handleReset() {
      console.log("reset");
      this.$refs.esign.reset();
    },

    //產生簽名
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then((res) => {
          this.realTempList[this.temp.id].signPic = res;

          this.signDialog = false;
        })
        .catch((err) => {
          alert(err);
        });
    },
    handlePay() {},
  },
  async mounted() {
    await this.getOrder();
    this.setRealTempList();

    this.temp = this.list[0];
  },
};
</script>

<style  scoped lang='scss'>
#actionMission {
  .despatchCard {
    width: 100%;
    height: 160px;
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
  .dv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.dialogTitle {
  font-size: 16px;
  color: #f38c00;
}

.dialogBox {
  margin-bottom: 0.5rem;
}

.fa-check-circle {
  color: #079613;
  margin-left: 1rem;
}
.fa-times-circle {
  color: #df4444;
  margin-left: 1rem;
}
.isComplete {
  height: calc(100vh - 312px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: #f38c00;
  }
}
.completeImg {
  width: 300px;
  height: 200px;
}
::v-deep .v-slide-group__prev {
  display: none !important;
}

::v-deep .drag_verify {
  border: 2px solid #e0e0e0;
}

::v-deep .v-expansion-panel-content__wrap {
  padding: 0;
}

::v-deep .v-expansion-panel-header {
  padding: 0.5rem 1rem;
}
::v-deep .a.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0 0 10px #f38c00;
  border-radius: 8px;
  width: 90%;
  margin: 2rem auto;
}
// ::v-deep .drag_verify .dv_handler {
//   width: 43px !important;
//   height: 43px !important;
//   top: 1px !important;
//   //   left: 2px !important;
// }
</style>