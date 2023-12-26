<script>
import renderUtil from "@/js/render";
import axios from "axios";
import config from "@/js/config";
import VerifyImage from "@/components/VerifyModal.vue";
import {createApp} from "vue";

let verifyContainer = null;

let parked = true;
let sliderDragging = false;
let lastX = 0;

function initFrame() {
  let slider = document.getElementById("verify-slider");
  let rail = document.getElementById("verify-rail");
  let rotatingImage = document.getElementById("verify-image-frame");
  let closeBtn = document.getElementById("close-btn");

  // 设置关闭按钮用于关闭窗口
  closeBtn.addEventListener("click", (ev) => {
    document.getElementById("verify-container").remove();
  })

  function _mouseDown(x) {
    if (parked) {
      sliderDragging = true;
      lastX = x;
    }
  }

  function _mouseMove(x) {
    if (sliderDragging) {
      let offset = x - lastX;

      let railWidth = Number(window.getComputedStyle(rail).width.replaceAll("px", ""));
      let sliderDiameter = Number(window.getComputedStyle(slider).width.replaceAll("px", ""));
      let maxLength = railWidth - sliderDiameter;

      if (offset >= 0 && offset <= maxLength) {
        slider.style.transform = "translateX(" + offset + "px)";
        rotatingImage.style.transform = "rotateZ(" + (-(offset / maxLength) * 360) + "deg)";
      }
    }
  }

  function _mouseUp(ev) {
    parked = false;
    sliderDragging = false;
    slider.style.transition = "all 1s ease-out";
    rotatingImage.style.transition = "all 1s ease-out";
    slider.style.transform = "translateX(0)";
    rotatingImage.style.transform = "rotateZ(0)";

    setTimeout(function () {
      parked = true;
      slider.style.transition = "";
      rotatingImage.style.transition = "";
    }, 1050);
  }

  slider.addEventListener("mousedown", function (ev) {
    slider.style.cursor = "grabbing";
    _mouseDown(ev.pageX);
  });
  slider.addEventListener("touchstart", function (ev) {
    _mouseDown(ev.touches[0].pageX);
  });

  window.addEventListener("mousemove", function (ev) {
    _mouseMove(ev.pageX);
  });
  window.addEventListener("touchmove", function (ev) {
    _mouseMove(ev.touches[0].pageX);
  });

  window.addEventListener("mouseup", function (ev) {
    slider.style.cursor = "";
    _mouseUp(ev)
  });
  window.addEventListener("touchend", _mouseUp);
}

export default {
  requireVerify() {
    verifyContainer = document.createElement("div");
    verifyContainer.setAttribute("id", "verify-container");
    verifyContainer.classList.add("modal-background")
    document.body.appendChild(verifyContainer);

    createApp(VerifyImage).mount("#verify-container");

    initFrame();

    // 向服务器发起验证图片的请求
    axios.get(config.rootUrl + "/starlight/verifyImage")
        .then((response) => {
          let data = response.data;

          document.getElementById("wait").classList.add("hidden");

          let verifyImage = document.getElementById("verify-img");
          verifyImage.classList.remove("hidden");
          verifyImage.src = "data:image/png;base64," + data.image;

          let rail = document.getElementById("verify-rail");
          renderUtil.hide(rail);
          rail.classList.remove("hidden");
          renderUtil.fadeIn(rail, 300, "flex");

        },
        (reason) => {
          // TODO
        });
    renderUtil.fadeIn(verifyContainer, 300, "block")
  }
}
</script>

<template>
  <div class="verify-frame-background">
    <div class="verify-frame">

      <a id="close-btn">×</a>

      <div class="image-container">
        <p>旋转图片使其正过来吧!</p>
        <div class="image-frame" id="verify-image-frame">
          <img id="wait" src="../assets/icon/wait.svg">
          <img id="verify-img" style="transform: scale(0.8)" class="hidden">
        </div>
        <div class="slider-rail hidden" id="verify-rail">
          <div class="slider no-select" id="verify-slider">
            <img src="../assets/icon/menu.svg">
          </div>
        </div>
      </div>
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

.verify-frame-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.verify-frame {
  width: 340px;
  height: 360px;
  background-color: #232324;
  border-radius: 10px;
  box-shadow: 0 0 3px #a2a19e;
  color: whitesmoke;
  font-weight: bold;
  font-size: 35px;
  letter-spacing: 5px;
}

.verify-frame a {
  font-size: 25px;
  position: relative;
  left: 90%;
  top: 3px;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
}

.image-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

.image-container p {
  font-size: 21px;
  letter-spacing: 2px;
}

.image-frame {
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background-color: #2b2b2c;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-frame img {
  width: 150px;
  height: 150px;
}

#wait {
  width: 105px;
  height: 105px;
  animation: waiting 0.8s infinite ease-out;
}

.slider-rail {
  width: 275px;
  height: 40px;
  background-color: #939393;
  box-shadow: inset 5px 5px 6px rgba(0, 0, 0, 0.3), inset -5px -5px 5px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.slider {
  width: 48px;
  height: 48px;
  background-color: #d3d3d3;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.3), inset -5px -5px 5px rgba(255, 255, 255, 0.7);
  border-radius: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.slider img {
  width: 20px;
  height: 20px;
  overflow: hidden;
  filter: drop-shadow(10000px 0 #000);
  transform: translateX(-10000px);
}
</style>