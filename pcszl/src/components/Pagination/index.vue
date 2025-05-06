<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-29 17:03:57
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-06 14:33:34
 * @FilePath: \pcszl\src\components\Pagination\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="pagination-cont f-jc-ac">
      <el-pagination
        size="small"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :total="count"
        class="mt-4"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

defineProps({
  count: {
    type: Number,
    default: 0,
  },
  currentPage:{
    type: Number,
    default: 1,
  },
  pageSize:{
    type: Number,
    default: 12,
  }
});

const emit = defineEmits(["changePage"]);
const handleCurrentChange = (currentPage: number) => {
  emit("changePage", currentPage);
};
</script>

<style lang="scss" scoped>
.pagination-cont {
  text-align: center;
  margin: 0 auto;
}
</style>
