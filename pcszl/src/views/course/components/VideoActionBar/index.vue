<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-12 09:19:42
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-15 14:50:41
 * @FilePath: \pcszl\src\views\course\components\VideoActionBar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="video-action-bar">
    <div class="action-list f-ac">
      <el-popover placement="top-start" width="280">
        <div class="f-jb-ac fontsize-popover">
          <div class="font-weight-bold pointer" @click="Increase">
            <div>Aa+</div>
            <div>字号增大</div>
          </div>
          <div>
            <div>{{ userStore.FontSize }}</div>
            <div>当前字号</div>
          </div>
          <div class="font-weight-bold pointer" @click="Decrease">
            <div>Aa-</div>
            <div>字号减小</div>
          </div>
        </div>
        <template #reference>
          <div class="action-item pointer">
            <div class="font-icon">Aa字号</div>
          </div>
        </template>
      </el-popover>
      <div class="action-item">
        <SerachBar color="#d0e1f0" focusplaceholder="请输入视频名称" @serachchange="serachchange" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SerachBar from "@/components/SerachBar/index.vue";
import { ref, reactive, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const Increase = () => {
  if (userStore.FontSize >= 24) {
    ElMessage.warning("字号不能超过24");
    return;
  }
  userStore.FontSize += 1;
  userStore.setFontSize(userStore.FontSize);
};

const Decrease = () => {
  if (userStore.FontSize <= 12) {
    ElMessage.warning("字号不能小于12");
    return;
  }
  userStore.FontSize -= 1;
  userStore.setFontSize(userStore.FontSize);
};

const emit = defineEmits<{
  (e: "actionbarserachchange", event: string): void;
}>();

const serachchange = (query: string) => {
  console.log(query);
  emit("actionbarserachchange", query);
};
</script>

<style lang="scss" scoped>
.video-action-bar {
  width: 100%;
  height: 79px;
  background-color: #212930;
}
.action-list {
  height: 100%;
}
.action-item {
  margin-left: 20px;
}
.font-icon {
  width: 80px;
  height: 40px;
  background-color: rgb(56, 63, 69);
  color: #d0e1f0;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
}
.fontsize-popover {
  width: 250px;
  text-align: center;
}
.font-weight-bold {
  color: #222;
}
</style>
