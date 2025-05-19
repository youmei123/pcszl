<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-05 10:07:57
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 14:25:02
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\components\RefundPopup\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="shad-box" v-if="visible" @click="closepopup()">
        <div @click.stop class="popup-box">
            <div class="popup-content">
                <div class="top-bar">
                    <div class="popup-title">物流详情</div>
                </div>
                <div class="material-flow-content">
                    <div class="express-delivery-bar f-jb-ac" v-if="expressdelivery.name">
                        <div class="f-ac">
                            <div>
                                {{ expressdelivery.name }}快递 {{ order.deliveryNumber }}
                            </div>
                        </div>
                    </div>
                    <div class="steps-content" v-if="stepData.length > 0">
                        <ccDefineStep :colors="colors" :stepData="stepData" />
                    </div>
                    <div class="steps-content" v-else>
                        <el-empty description="暂无数据" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ccDefineStep from './ccDefineStep.vue'
import { ref, reactive, onMounted } from "vue";
const props = defineProps({
    colors: {
        type: String,
        default: '#fa436a',
    },
    stepData: {
        type: Array,
        default: []
    },
    expressdelivery: {
        type: Object,
        default: {}
    },
    order: {
        type: Object,
        default: {}
    }
});
const visible = ref(false);
const linkcustomerservice = () => {
    visible.value = true
}
const closepopup = () => {
    visible.value = false
}
defineExpose({ linkcustomerservice, closepopup })
</script>

<style lang="scss" scoped>
.shad-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.popup-box {
    width: 650px;
    max-height: 700px;
    background: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    overflow: auto;
}
.popup-content {
    background-color: rgb(242, 242, 242);
    border-radius: 20px;
    padding:18px 20px;
    box-sizing: border-box;
}

.popup-title {
    font-size: 18px;
}

.top-bar {
    margin-bottom: 15px;
    box-sizing: border-box;
}

.material-flow-content {
    border-radius: 10px;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 0 20px 20px;
    box-sizing: border-box;
}

.logo-image-box {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--ThemeColors);
    margin-right: 10px;
}

.logo-image-box image {
    width: 100%;
    height: 100%;
}

.express-delivery-bar {
    border-bottom: 1px solid rgb(243, 243, 243);
    padding: 15px 0;
    box-sizing: border-box;
}

.steps-content {
    overflow: auto;
    height: 550px;
    padding-bottom: 15px;
    box-sizing: border-box;
}
</style>
