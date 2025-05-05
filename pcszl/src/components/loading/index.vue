<template>
  <div
    class="mask"
    v-show="isActive"
    :class="{ 'full-screen': isFullScreen }"
    :style="{ backgroundColor, height: heigth + 'px' }"
  >
    <div class="spinner" :style="{ transform: `translate(-50%, -${translateY}%)` }">
      <slot>
        <!--  ==========在这里改成选择的那一个========== -->
        <ShrinkRect :color="color" :size="size" />
      </slot>
      <div v-if="text.length" :style="{ color: textColor }">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ShrinkRect from "./loaders/shrink-rect.vue";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  translateY: {
    type: Number,
    default: 150,
  },
  text: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#333",
  },
  textColor: {
    type: String,
    default: "#333",
  },
  isFullScreen: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "rgba(255, 255, 255, .9)",
  },
  size: {
    type: Number,
    default: 40,
  },
  heigth: {
    type: Number,
    default: 150,
  },
});

const isActive = ref(props.active);

watch(
  () => props.active,
  (value) => {
    isActive.value = value;
  }
);
</script>

<style scoped>
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3000;
  transition: opacity 0.3s linear;
}

.full-screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
}

/* #ifdef H5 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* #endif */
</style>
