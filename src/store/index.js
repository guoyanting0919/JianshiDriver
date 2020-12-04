import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isLoading: false,
    snackbar: false,
    snackbarText: "",
  },
  actions: {
    //loading
    loadingHandler(context, payload) {
      context.commit("LOADING", payload);
    },
    //snackbar
    snackbarHandler(context, payload) {
      context.commit("SNACKBAR", payload);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    SNACKBAR(state, payload) {
      state.snackbar = true;
      state.snackbarText = payload;
      setTimeout(() => {
        state.snackbar = false;
      }, 2000);
    },
  },

  modules: {},
});
