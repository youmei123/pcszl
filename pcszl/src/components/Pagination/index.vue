<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-29 17:03:57
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-29 17:11:22
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
        :total="50"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
</script>

<style lang="scss" scoped>
.pagination-cont {
  text-align: center;
  margin: 0 auto;
}
</style>
