import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@fortawesome/fontawesome-free/css/all.css"; // 确保您正在使用 css-loader
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "fa",
  },
  theme: {
    themes: {
      light: {
        primary: "#f38c00", // #E53935
        primaryLight: "#ffeedf", // #E53935
        secondary: "#000", // #FFCDD2
        accent: "#000", // #3F51B5
        black: "#3b3b3b",
        error: "#db0b0b",
      },
    },
  },
});
