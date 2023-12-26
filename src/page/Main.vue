<script setup>
</script>

<template>
  <Sidebar />
  <div class="sub-container">
    <div class="left-container">
      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">今日幸运指数</h3>
        </div>
        <div class="card-body">
          <div id="luck-rating">计算中...</div>
        </div>
        <div class="card-footer">
          <button>查看报告</button>
        </div>
      </div>

      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">服务器状态</h3>
        </div>
        <div class="card-body">
        </div>
        <div class="card-footer">
          <button>详细信息</button>
        </div>
      </div>
    </div>

    <div class="right-container">
      <div class="card card-primary card-outline">
        <div class="card-header">
          <h3 class="card-title">StarLight公告</h3>
        </div>
        <div class="card-body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";
import config from "@/js/config";
const { cookies } = useCookies();

export default {
  name: "Main",
  components: {
    Sidebar
  },

  mounted() {
    let email = cookies.get("email");
    if (email != null) {
      axios
          .get(config.rootUrl + `/starlight/luck?email=${email}`)
          .then(
              (response) => {
                let data = response.data;
                if (data.status === "success") {
                  document.getElementById("luck-rating").innerText = data.luckRating;
                }
              }
          )
    }
  }
}
</script>

<style scoped>
.sub-container {
  min-height: calc(100% - 60px);
  width: 100%;
  display: flex;
  margin: 20px 20px 20px 90px;
  position: relative;
  justify-content: center;
  align-items: center;
}

.left-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 98%;
}

.left-container .card {
  height: 50%;
  min-height: 210px;
}

.right-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 98%;
}

.right-container .card {
  height: 100%;
  min-height: 443px;
}

.card .card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

#luck-rating {
  font-size: 55px;
}

@media screen and (max-width: 700px) {
  .sub-container {
    flex-direction: column;
    margin-left: 20px;
  }

  .left-container, .right-container {
    width: 95%;
  }

  .right-container .card {
    height: 100%;
    min-height: 475px;
  }
}

button {
  width: 90px;
  background: linear-gradient(125deg, #ff4f0f, #ff1053) #ff1033;
  outline: none;
  border-radius: 6px;
  padding: 8px;
  color: #FFFFFF;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: bolder;
  box-shadow: 1px 1px 0 #949494;
  transition: box-shadow, 0.3s ease-in-out;
}

button:hover {
  box-shadow: unset;
}
</style>