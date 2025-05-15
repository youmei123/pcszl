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
    <div @click.stop class="popup-content">
        <div class="kfPopup_bg">
            <div class="kfPopup_title">
                联系我们
            </div>
            <div class="kfPopup_texts">
                <div>识别下方二维码</div>
                <div>或拨打电话联系我们</div>
                <div>
                    联系电话：<span class="kfPopupMobile">{{mobile}}</span>
                </div>
            </div>
            <div class="kfPopup_img">
                <img :src="qrCode" mode="" v-if="qrCode"/>
                <div class="not-img-box f-jc-ac" v-if="!qrCode">
                    暂无
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
const props = defineProps({
  mobile: {
    type: String,
    default: '',
  },
  qrCode: {
    type: String,
    default: '',
  },
});
const visible = ref(false);
const linkcustomerservice = ()=>{
    visible.value=true
}
const closepopup =()=>{
     visible.value=false
}
defineExpose({linkcustomerservice,closepopup})
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
.popup-content {
//   width: 400px;
//   background: #ffffff;
//   border-radius: 10px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   padding: 30px;
//   box-sizing: border-box;
    background-image: url('https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/3/12/3933219188060485964/kfPopup_bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 300px;
    height: 375px;
    padding: 55px 45px 0;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.kfPopup_title{
		font-size: 23px;
		font-weight: bold;
		text-align: center;
		color: #A9423C;
		letter-spacing: 5px;
		margin-bottom: 10px;
	}
	.kfPopup_texts{
		color: #7F312C;
		font-size: 15px;
		line-height: 25px;
		text-align: center;
		margin-bottom: 10px;
		letter-spacing: 1px;
		box-sizing: border-box;
	}
	.kfPopupMobile{
		color: #CE1409;
		font-size: 16px;
		letter-spacing: 0;
	}
	.kfPopup_img{
		background-color: #fff;
		width: 160px;
		height: 160px;
		margin: 0 auto;
	}
	.kfPopup_img img{
		width: 100%;
		height: 100%;
	}
</style>
