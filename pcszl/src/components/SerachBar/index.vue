<template>
  <div
    class="search-container"
    :class="{ focused: isFocused }"
    :style="{ 'background-color': bgColor }"
  >
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      @focus.stop="handserachfocus"
      @blur.stop="handserachblur"
      :class="{ focused: isFocused }"
      :style="{
        'background-color': bgColor,
        '--placeholder-color': color,
        color: color,
      }"
    />
    <div
      class="iconfont icon-sousuo pointer"
      :style="{ color: iconColor }"
      @click.stop="handserach()"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  bgColor: {
    type: String,
    default: "rgb(56, 63, 69)",
  },
  iconColor: {
    type: String,
    default: "#d0e1f0",
  },
  color: {
    type: String,
    default: "#000",
  },
  maxWidth: {
    type: Number,
    default: 200,
  },
  focusplaceholder: {
    type: String,
    default: "",
  },
});

const placeholder = ref("搜索");

const emit = defineEmits<{
  (e: "serachchange", event: string): void;
}>();

const searchQuery = ref("");
const isFocused = ref(false);

const handserachfocus = () => {
  isFocused.value = true;
  if (props.focusplaceholder) {
    placeholder.value = props.focusplaceholder;
  }
  console.log(isFocused.value);
};

const handserachblur = () => {
  placeholder.value = "搜索";
  if (!searchQuery.value) isFocused.value = false;
};

const handserach = () => {
  console.log(searchQuery.value);
  emit("serachchange", searchQuery.value);
};
</script>

<style lang="scss" scoped>
.search-container {
  display: inline-flex;
  align-items: center;
  width: 80px;
  transition: width 0.5s ease;
  padding: 10px 12px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: rgb(56, 63, 69);
}

.search-container input {
  width: 100%;
  outline: none;
  border: none;
  background-color: rgb(56, 63, 69);
  color: white;
}

input::placeholder {
  color: var(--placeholder-color);
}

.search-container .iconfont {
  color: #d0e1f0;
}

.focused {
  width: 220px;
  transition: width 0.5s ease;
}

.focused input {
  width: 170px;
  transition: width 0.5s ease;
}
</style>
