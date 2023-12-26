<script setup>
  import renderUtil from "@/js/render";
</script>

<template>
  <div id="mobile-sidebar-btn" @click="show">☰</div>
  <div class="sidebar">
    <a class="box logo-box">
      <i><img src="../assets/icon/menu.svg" alt="List"></i>
      <span>StarLight</span>
    </a>
    <a :class="{'box': true, 'split-box': item.split}" v-bind:href="item.href" v-bind:id="item.id" v-for="item in renderUtil.sidebarElements">
      <i><img v-bind:src="item.img.src" v-bind:alt="item.img.alt"></i>
      <span>{{item.text}}</span>
    </a>
  </div>

  <div class="mobile-sidebar" id="mobile-sidebar" v-if="show_mobile_sidebar" style="display: none">
    <a id="close-sidebar-btn" @click="close">×</a>
    <a class="box logo-box">
      <span>StarLight</span>
    </a>
    <a :class="{'box': true, 'split-box': item.split}" v-bind:id="item.id" v-for="item in renderUtil.sidebarElements">
      <i><img v-bind:src="item.img.src" v-bind:alt="item.img.alt"></i>
      <span>{{item.text}}</span>
    </a>
  </div>
</template>

<style scoped>
.sidebar {
  width: 70px;
  height: calc(100% - 60px);
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  background: rgba(35, 33, 33, 0.95);
  transition: 0.3s ease-in-out;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}

.sidebar:hover {
  width: 260px;
}

.sidebar:hover span {
  opacity: 1;
}

.box {
  display: flex;
  height: 50px;
  width: 85%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: 0.3s;
  color: rgb(205, 205, 225);
  text-decoration: none;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

.sidebar:hover .box {
  flex-direction: unset;
}

.sidebar:hover .box span {
  transition: 0.3s ease-in;
}

.sidebar:hover .logo-box img {
  display: none;
}

.box img {
  width: 40px;
  height: 40px;
  transition: 0.3s ease-out;
}

.box:hover {
  background-color: rgb(46, 50, 58);
  color: #FFF;
  transition: 0.2s ease-in-out;
}

#logout-btn:hover {
  background-color: rgb(134, 49, 49);
}

.box:hover img {
  margin-left: 10px;
}

.box:nth-child(1)::before,
.split-box::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
}

.box span {
  position: relative;
  left: 20px;
  opacity: 0;
  font-size: 18px;
  color: rgba(0, 0, 0, 0);
  transition: color 0.5s ease-out;
}

.sidebar:hover .box span {
  color: azure;
}

.logo-box {
  align-items: center;
  cursor: default;
  display: flex;
  justify-content: center;
}

.logo-box span {
  display: flex;
  position: relative;
  font-size: 38px;
  top: 0;
  left: 0;
  justify-content: center;
  font-family: "SL Logo", serif;
  color: azure;
}

.logo-box img {
  position: relative;
  top: 22px
}

.logo-box:hover {
  background-color: rgba(0, 0, 0, 0);
}

/* 手机布局 */
#mobile-sidebar-btn {
  display: none;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: rgba(215, 215, 215, 1);
  position: fixed;
  z-index: 20;
  left: 20px;
  bottom: 50px;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.mobile-sidebar {
  display: none;
}

.mobile-sidebar #close-sidebar-btn {
  display: none;
}

@media screen and (max-width: 400px) {
  #mobile-sidebar-btn {
    display: flex;
  }

  .sidebar {
    display: none;
  }

  .mobile-sidebar {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    background: rgba(35, 33, 33, 0.99);
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    z-index: 20;
  }

  .mobile-sidebar {
    width: 100%;
    max-width: unset;
    display: flex;
  }

  .mobile-sidebar .box {
    flex-direction: unset;
  }

  .mobile-sidebar .box span {
    transition: 0.3s ease-in;
    color: azure;
    opacity: 1;
  }

  .box:nth-child(2)::before {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: rgb(55, 65, 81);
    position: absolute;
    bottom: -10px;
  }

  .mobile-sidebar #close-sidebar-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    color: white;
    font-size: 40px;
    right: 20px;
    top: 12px;
    width: 30px;
    height: 30px;
    z-index: 20;
    cursor: pointer;
  }
}
</style>

<script>
import renderUtil from "@/js/render";

export default {
  data() {
    return {
      show_mobile_sidebar: false
    }
  },

  methods: {
    show() {
      this.show_mobile_sidebar = true;
      let rid = setInterval(() => {
        let mobileSidebar = document.getElementById("mobile-sidebar");

        if (mobileSidebar != null) {
          mobileSidebar.style.display = "none";
          renderUtil.fadeIn(mobileSidebar, 400);
          clearInterval(rid);
        }
      }, 50);
    },

    close() {
      this.show_mobile_sidebar = false;
    }
  },

  mounted() {

  }
}
</script>