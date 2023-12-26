<template>
  <div class="main-frame">
    <router-view></router-view>
  </div>

  <Footer/>

</template>

<script>
import './assets/main.css'
import './assets/stars.css'
import '@arco-design/web-vue/dist/arco.css';

import renderUtil from "@/js/render";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "App",
  components: {Sidebar, Footer},
  data: function ()  {
    return {
      sidebar: renderUtil.sidebarElements
    }
  }
}
</script>


