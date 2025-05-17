<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:55:10
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-16 09:02:49
 * @FilePath: \pcszl\src\views\mall\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="page-container">
    <div class="mall-content content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>关于我们 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="about-box">
        <div class="about-title-box">
            <div class="f-jc-ac">
                <div class="about-titleImg-left"></div>
                <div class="about-title">
                    师芝林介绍
                </div>
                <div class="about-titleImg-right"></div>
            </div>
        </div>
        <div class="about-content-box f-ac">
            <div class="about-content-left">
                <img src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/17/5833978437380646705/about_cent.png" alt="">
            </div>
            <div class="about-content-right">
               <div class="content-right-title">
                    师芝林
               </div>
               <div class="content-right-text">
                师芝林是一款旨在为用户提供高效、便捷、全面的学习体验，帮助用户轻松掌握知识，提升学习效果的应用。我们为用户提供丰富的精品课程、热门直播等多种学习资源、途径，更有校长推荐、限时免费与本月新课等板块供用户选择。我们会不断努力改进和优化，为您带来更好的学习体验，快来加入我们吧!
               </div>
            </div>
        </div>
        <div class="about-title-box">
            <div class="f-jc-ac">
                <div class="about-titleImg-left"></div>
                <div class="about-title">
                    师芝林介绍
                </div>
                <div class="about-titleImg-right"></div>
            </div>
        </div>
        <div class="about-content-box f-ac">
            <div class="about-address-left">
                <div class="address-title">
                    
                </div>
            </div>
            <div class="about-address-right f-jc-ac">
                临沂总部
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { customerServiceMobile } from "@/api/order";
const mobile = ref(""); //联系电话
const qrCode = ref(""); //联系二维码
// 获取客服信息
const linkcustomerservice = async () => {
  const res = await customerServiceMobile({});
  if (res.status == 0) {
    mobile.value = res.data.mobile;
    qrCode.value = res.data.qrCode || "";
  }
};
onMounted(() => {
  linkcustomerservice();
});
</script>

<style lang="scss" scoped>
.breadcrumb-cont {
  padding: 20px 0;
  box-sizing: border-box;
}
.about-box{
    width: 100%;
}
.about-title-box{
    margin: 30px auto 20px;
}
.about-titleImg-left{
    width: 60px;
    height: 18px;
    background: url('https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/17/2035612841397225178/titleImg_left.png') no-repeat center;
    background-size: 100% 100%;
}
.about-title{
    font-family: SourceHanSansCN;
    font-weight: 400;
    font-size: 24px;
    color: #212930;
    margin: 0 10px;
}
.about-titleImg-right{
    width: 60px;
    height: 18px;
    background: url('https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/5/17/4364864447489899830/titleImg_right.png') no-repeat center;
    background-size: 100% 100%;
}
.about-content-box{
    width: 100%;
    height: 400px;

    border-radius:  10px ;
    overflow: hidden;
}
.about-content-left{
    width: 800px;
    height: 100%;
}
.about-content-left img{
    width: 100%;
    height: 100%;
}
.about-content-right{
    width: 400px;
    height: 100%;
    background: #CE9433;
    color: #fff;
    padding:60px 40px ;
    box-sizing: border-box;
}
.content-right-title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
.content-right-text{
    font-size: 16px;
    line-height: 34px;
}
.about-address-left{
    width: 50%;
    background: #CE9433;
    padding:25px 40px 0 40px ;
    box-sizing: border-box;
}
.address-title{
    padding:10px 20px ;
    box-sizing: border-box;
    color: #fff;
    font-family: SourceHanSansCN;
    font-weight: 400;
    font-size: 20px;
    background: #CE9433;
    border-radius: 20px;
    border: 1px solid #FFFFFF;
}
</style>
