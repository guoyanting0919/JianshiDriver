import req from "./https";

// 全域 api 掛載於 Vue.prototype
// 使用方式 this.$api
// api 命名原則 首字大寫爾後駝峰
const api = {
  Login(params) {
    return req("post", "check/login", params);
  },
  GetDespatch(params) {
    return req("get", "despatchOfSelfPayUsers/groupLoad", params);
  },
  GetOrder(params) {
    return req("get", "DespatchOfSelfPayUsers/get", params);
  },
  GetDespatchGroup(params) {
    return req("get", "DespatchOfSelfPayUsers/GetByDespatchNo", params);
  },
  ChangeStatus(params) {
    return req("post", "OrderOfSelfPayUsers/ChangeOrderStatus", params);
  },
  CancelDespatch(params) {
    return req("post", "orderOfSelfPayUsers/cancelOrderReq", params);
  },
  MissionComplete(params) {
    return req("post", "orderPayOfSelfPays/add", params);
  },
};

export default api;
