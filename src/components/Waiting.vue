<script>
  import {createApp} from "vue";

  let waitingContainer = null;
  let instance = null;

  export default {
    data() {
      return {
        show: true,
        _container: null
      }
    },

    mounted() {
      if (this.show) {
        document.body.style.overflow = "hidden";
      }
    },

    methods: {
      close() {
        this.show = false;
        document.body.style.overflow = "";
      },
    },

    show() {
      if (waitingContainer == null) {
        waitingContainer = document.createElement("div");
        document.body.appendChild(waitingContainer);

        instance = createApp(this);
        instance.mount(waitingContainer);

        let data = instance._instance.data;
        data._container = waitingContainer;
      }
    },

    close() {
      if (waitingContainer != null) {
        instance.unmount();
        waitingContainer.remove();
        waitingContainer = null;
      }
    }
  }
</script>

<template>
  <div id="modal-container" v-if="show">
    <div class="modal-background">
      <img id="wait" alt="waiting" src="../assets/icon/wait.svg">
      <p>&nbsp;&nbsp;Loading...</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes waiting {
  0% {
    transform: rotateZ(0);
  }

  100% {
    transform: rotateZ(180deg);
  }
}

.modal-background {
  flex-direction: column;
}

.modal-background img {
  width: 120px;
  animation: waiting 0.8s infinite ease-out;
}

.modal-background p {
  color: whitesmoke;
  font-size: 25px;
  margin-top: 40px;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>