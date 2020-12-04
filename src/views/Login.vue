<template>
  <div id="login">
    <div class="headerBox"></div>
    <h2 class="loginTitle">尖石鄉公所預約訂車平台</h2>
    <img src="../assets/images/logo.png" class="logo" />
    <div class="loginBox">
      <h3 class="driverLoginTitle">司機登入</h3>
      <v-text-field
        v-model="account"
        :rules="rules.account"
        type="text"
        label="帳號"
        hint="請輸入帳號(預設為手機號碼)"
        color="black"
        required
        @click:append="show = !show"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="rules.password"
        color="3b3b3b"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        label="密碼"
        hint="請輸入密碼(預設為身分證後4碼)"
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        @click="handleLogin"
        block
        elevation="3"
        style="background: #f38c00; color: #fff"
        >登入</v-btn
      >
    </div>
    <div class="footerBox"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: "driver",
      password: "driver",
      show: false,
      rules: {
        password: [(val) => (val || "").length > 0 || "必填"],
        account: [(val) => (val || "").length > 0 || "必填"],
      },
    };
  },
  methods: {
    handleLogin() {
      const vm = this;
      let params = {
        Account: vm.account,
        Password: vm.password,
        AppKey: "openauth",
      };
      vm.$api.Login(params).then((res) => {
        let driverToken = res.data.token;
        window.localStorage.setItem("driverToken", driverToken);
        vm.$router.push("/Mission");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .headerBox {
    width: 100%;
    height: 50px;
    background: #f38c00;
  }

  .loginTitle {
    font-size: 20px;
    line-height: 28px;
    color: #000;
    opacity: 0.65;
  }

  .logo {
    width: 180px;
    height: 118px;
  }

  .loginBox {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.24);
    border-radius: 16px;
    width: 350px;
    height: 300px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .driverLoginTitle {
    font-size: 1.65rem;
    color: #f38c00;
    text-align: center;
  }

  .footerBox {
    width: 100%;
    height: 50px;
    background: #ff8884;
  }
}
</style>