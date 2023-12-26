<template>
  <div id="modal-container" v-if="show">
    <div class="modal-background">
      <div class="modal-frame">
        <a @click="closeModal">×</a>

        <div class="modal">
          <img v-bind:src="type" alt="icon">
          <p>{{text}}</p>

          <button @click="button_callback">{{button}}</button>
          <button v-if="show_sub_button" @click="sub_button_callback">{{sub_button}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import renderUtil from "@/js/render";
import {createApp} from "vue";

export default {
  data() {
    return {
      show: true,
      text: null,
      type: null,
      button: null,
      sub_button: null,
      button_callback: null,
      sub_button_callback: null,
      show_sub_button: false,
      _parent_container: null
    }
  },

  methods: {
    closeModal() {
      this.show = false;
      this.unmount();
      this._parent_container.remove();
    },
  },

  create(config) {
    this.show = true;

    let container = document.createElement("div");
    document.body.appendChild(container);
    container.style.display = "none";
    container.style.zIndex = "999"

    let modalInstance = createApp(this);
    modalInstance.mount(container);

    let data = modalInstance._instance.data;

    data._parent_container = container;

    switch (config.type) {
      case "warning":
        data.type = "/src/assets/icon/warning.svg";
        break;
      case "error":
        data.type = "/src/assets/icon/error.svg";
        break;
      default:
        data.type = "/src/assets/icon/success.svg";
        break;
    }

    data.text = config.text;
    data.button = config.button != null ? config.button : "确定"
    data.button_callback = config.button_callback == null ? () => {
      data.show = false;
      container.remove();
    } : config.button_callback();
    data.show_sub_button = (config.sub_button != null);
    data.sub_button = config.sub_button != null ? config.sub_button : "取消";
    data.sub_button_callback = config.sub_button_callback == null ? () => {
      data.show = false;
      container.remove();
    } : config.sub_button_callback;

    renderUtil.fadeIn(container, 200);

    return {
      instance: modalInstance,
      close() {
        modalInstance.unmount();
        container.remove();
      }
    };
  }
}
</script>

<style scoped>
.modal-frame {
  width: 300px;
  height: 350px;
  background-color: rgba(43, 43, 44, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  box-shadow: 0 0 3px #a2a19e;
  color: whitesmoke;
  font-weight: bold;
  font-size: 35px;
  letter-spacing: 5px;
}

.modal-frame a {
  font-size: 25px;
  position: relative;
  left: 90%;
  top: 3px;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
}

.modal {
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
}

.modal img {
  width: 70px;
}

.modal p {
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.modal button {
  width: 60%;
  margin-bottom: 10px;
  background: linear-gradient(125deg, #ff4f0f, #ff1053) #ff1033;
  outline: none;
  border-radius: 8px;
  padding: 10px;
  color: #FFFFFF;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bolder;
  box-shadow: 2px 2px 0 #949494;
  transition: box-shadow, 0.3s ease-in-out;
}
</style>