<script setup>

</script>

<template>
  <div class="mobile-login-container" v-if="isMobile">
    <div class="mobile-form-box">
      <div class="mobile-register-box">
        <h1>REGISTER</h1>
        <input type="text" placeholder="用户名">
        <input type="email" placeholder="QQ号">
        <input type="password" placeholder="密码">
        <input type="password" placeholder="确认密码">
        <input type="text" placeholder="邀请码">
        <button class="clickable-button">注册</button>
        <br><br>
        <p>
          已有有SLS账号？<a class="no-select" id="mobile-to-login">点我登录！</a>
        </p>
      </div>
    </div>

    <div class="mobile-form-box">
      <div class="mobile-login-box">
        <h1>LOGIN</h1>
        <input type="text" id="login-username-input" placeholder="用户名">
        <input type="password" id="login-password-input" placeholder="密码">
        <button class="clickable-button" @click="onClickLoginBtn">登录</button>
        <br><br>
        <p>
          没有SLS账号？<a class="no-select" id="mobile-to-register">点我注册！</a>
        </p>
      </div>
    </div>
  </div>

  <div class="login-container" v-if="isPC">
    <div class="login-background">
      <div class="form-box">
        <div class="register-box hidden">
          <h1>REGISTER</h1>
          <input type="text" placeholder="用户名">
          <input type="email" placeholder="QQ号">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
          <input type="text" placeholder="邀请码">
          <button class="clickable-button">注册</button>
        </div>

        <div class="login-box">
          <h1>LOGIN</h1>
          <input type="text" id="login-username-input" placeholder="用户名">
          <input type="password" id="login-password-input" placeholder="密码">
          <button class="clickable-button" @click="onClickLoginBtn">登录</button>
        </div>
      </div>

      <div class="con-box left">
        <h2>欢迎来到StarLight</h2>
        <img src="../assets/icon/logo.webp" alt="logo">
        <p>已有SLS账号？</p>
        <button id="to-login" type="button">去登录</button>
      </div>

      <div class="con-box right">
        <h2>欢迎来到StarLight</h2>
        <img src="../assets/icon/logo.webp" alt="logo">
        <p>还没有SLS账号？</p>
        <button id="to-register" type="button">去注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/main.css'
import '../assets/login.css'
import VerifyModal from "@/components/VerifyModal.vue";
import Modal from "@/components/Modal.vue";
import axios from "axios";
import config from "@/js/config";
import Waiting from "@/components/Waiting.vue";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

let account;
let password;

function tryLogin() {

  if (cookies.isKey("email") && cookies.isKey("login-token")) {
    Waiting.show();

    let email = cookies.get("email");
    let token = cookies.get("login-token")

    axios
        .post(
            config.rootUrl + "/starlight/login",
            {
              email: email,
              token: token
            }
        )
        .then(
            (response) => {
                let data = response.data;
                Waiting.close();

                if (data.status === "success") {
                    let successModal = Modal.create({
                      type: "success",
                      text: "自动登录成功！即将跳转到首页..."
                    });

                    setTimeout(() => {
                      location.href = "/#/main";
                      successModal.close();
                    });
                }
            },
            (reason) => {
              Waiting.close();
            }
        )
  }
}

function initUI() {
  let loginBtn = document.getElementById("to-login");
  let registerBtn = document.getElementById("to-register");
  let formBox = document.getElementsByClassName("form-box")[0];
  let registerBox = document.getElementsByClassName("register-box")[0];
  let loginBox = document.getElementsByClassName("login-box")[0];

  registerBtn.addEventListener("click", function () {
    formBox.style.transform = "translateX(100%)";
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
  });

  loginBtn.addEventListener("click", function () {
    formBox.style.transform = "translateX(-1%)";
    loginBox.classList.remove("hidden");
    registerBox.classList.add("hidden");
  });
}

function initMobileUI() {
  let mobileLoginBtn = document.getElementById("mobile-to-login");
  let mobileRegisterBtn = document.getElementById("mobile-to-register");

  let mobileLoginBox = document.getElementsByClassName("mobile-login-box")[0].parentElement;
  let mobileRegisterBox = document.getElementsByClassName("mobile-register-box")[0].parentElement;

  mobileLoginBtn.addEventListener("click", function (){
    mobileRegisterBox.style.transform = "translate3d(10%, 12.5%, 0) perspective(500px) rotateY(-10deg) scale3d(0.8, 0.8, 0.8) translateX(60%)  scale3d(1, 1, 1)";
    mobileLoginBox.style.transform = "translate3d(10%, 12.5%, 0) perspective(500px) rotateY(10deg) scale3d(0.8, 0.8, 0.8) translateX(-60%)  scale3d(1, 1, 1)";

    let loginInputEle = document.getElementsByClassName("mobile-login-box")[0].getElementsByTagName("input");
    for (let i = 0; i < loginInputEle.length; i++) {
      loginInputEle[i].value = "";
    }

    setTimeout(function () {
      mobileLoginBox.style.zIndex = "2";
      mobileRegisterBox.style.zIndex = "1";
    }, 500);

    setTimeout(function () {
      mobileRegisterBox.style.transform = "";
      mobileLoginBox.style.transform = "";
    }, 550);
  });

  mobileRegisterBtn.addEventListener("click", function (){
    mobileLoginBox.style.transform = "translate3d(10%, 12.5%, 0) perspective(500px) rotateY(-10deg) scale3d(0.8, 0.8, 0.8) translateX(60%)  scale3d(1, 1, 1)";
    mobileRegisterBox.style.transform = "translate3d(10%, 12.5%, 0) perspective(500px) rotateY(10deg) scale3d(0.8, 0.8, 0.8) translateX(-60%)  scale3d(1, 1, 1)";

    let regInputEle = document.getElementsByClassName("mobile-register-box")[0].getElementsByTagName("input");
    for (let i = 0; i < regInputEle.length; i++) {
      regInputEle[i].value = "";
    }

    setTimeout(function () {
      mobileLoginBox.style.zIndex = "1";
      mobileRegisterBox.style.zIndex = "2";
    }, 500);

    setTimeout(function () {
      mobileRegisterBox.style.transform = "";
      mobileLoginBox.style.transform = "";
    }, 550);
  });
}

export default {
  name: "Login",
  components: {
    Waiting,
    VerifyModal
  },

  data() {
    return {
      isPC: true,
      isMobile: true
    }
  },

  mounted() {
    let instance = this;

    if (window.innerWidth >= 700) {
      instance.isPC = true;
      instance.isMobile = false;
    }
    else {
      instance.isMobile = true;
      instance.isPC = false;
    }

    window.addEventListener("resize", (ev) => {
      if (window.innerWidth >= 700) {
        instance.isPC = true;
        instance.isMobile = false;
      }
      else {
        instance.isMobile = true;
        instance.isPC = false;
      }
    });
    tryLogin();
    initUI();
    initMobileUI();
    VerifyModal.requireVerify();
  },

  methods: {
    onClickLoginBtn() {
      Waiting.show();

      let accountInput = document.getElementById("login-username-input");
      let passwordInput = document.getElementById("login-password-input");

      account = accountInput.value;
      password = passwordInput.value;

      if (account.length === 0) {
        Modal.create({
          type: "error",
          text: "用户名不能为空！"
        });

        Waiting.close();
        return;
      }

      if (password.length === 0) {
        Modal.create({
          type: "error",
          text: "密码不能为空！"
        });

        Waiting.close();
        return;
      }

      axios
          .post(
              config.rootUrl + "/starlight/login",
              {
                email: account,
                password: password
              }
          )
          .then(
              (response) => {
                let data = response.data;
                if (data.status === "success") {
                  cookies.set("email", account, "30d");
                  cookies.set("login-token", data.token, "30d");

                  Waiting.close();

                  let successModal = Modal.create({
                    type: "success",
                    text: "登录成功！即将跳转到首页..."
                  });

                  setTimeout(() => {
                    location.href = "/#/main";
                    successModal.close();
                  }, 1000);

                }
                else {
                  switch (data.errorMessage) {
                    case "Wrong password!":
                      Modal.create({
                        type: "error",
                        text: "密码错误，请检查后重试！"
                      });

                      break;

                    case "Exceed speed limit.":
                      Modal.create({
                        type: "error",
                        text: "操作过快，请稍后重试！"
                      });

                      break;

                    default:
                      Modal.create({
                        type: "error",
                        text: "出现一些错误，错误信息: " + data.errorMessage
                      });

                      break;
                  }
                }
              },
              (reason) => {
                Waiting.close();
                console.log(reason);
                if (reason.message.indexOf("Network Error") !== -1) {
                  Modal.create({
                    type: "error",
                    text: "无法连接到StarLight验证服务器，请稍后再试！"
                  });
                }
                else {
                  Modal.create({
                    type: "error",
                    text: "请求出现错误，错误信息: " + reason.message
                  });
                }

              }
          );
    }
  }
}
</script>