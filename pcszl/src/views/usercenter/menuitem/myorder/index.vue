<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 16:29:47
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-17 09:49:20
 * @FilePath: \pcszl\src\views\usercenter\menuitem\myorder\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div class="order-tabs-content">
      <el-tabs v-model="activeIndex" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tablist"
          :key="index"
          :label="item"
          :name="index"
        >
          <OrderItem
            ref="refOrderItem"
            :orderList="orderList"
            :tabIndex="activeIndex"
            :listLoading="listLoading"
            :isopen="isopen"
            @changeGetList="getList"
            @Popup="Popup"
            @kfPopup="linkcustomerservice"
            @zfPopup="submitpay"
          />
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px">
        <Pagination
          @changePage="handlePageChange"
          :count="totalcount"
          :currentPage="pageNo"
        />
      </div>
    </div>
    <RefundPopup
      :order="itemData"
      :visible="isshowRefundPopuo"
      @close="isshowRefundPopuo = false"
    />
    <customerPopup ref="customerPopups" :mobile="mobile" :qrCode="qrCode" />
    <el-dialog
      v-model="PayQrcodeDialogVisible"
      title="支付二维码"
      width="350"
      align-center
      :close-on-click-modal="false"
    >
      <div class="dialog-content f-jc-ac">
        <qrcode-vue :value="qrcodeurl" :size="300" class="qrcode-container" />
      </div>
      <template #footer>
        <div class="buy-btn pointer" @click="paysuccess">已完成支付</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import OrderItem from "./components/OrderItem/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import { listOrder, isRefund, customerServiceMobile } from "@/api/order";
import { submitSingle } from "@/api/usercenter";
import { useUserStore } from "@/store/userStore";
import RefundPopup from "@/views/usercenter/menuitem/myorder/components/RefundPopup/index.vue";
import { ordersType } from "@/utiles/types";
import customerPopup from "./components/customerPopup/index.vue";
import { ElMessage } from "element-plus";
import QrcodeVue from "qrcode.vue";
const userStore = useUserStore();
const tablist = reactive(["全部", "待付款", "待发货", "待收货", "已完成", "售后"]);
const activeIndex = ref(0); //当前订单状态
const pageNo = ref(1); // 当前页码
const totalcount = ref(0); // 总条数
const listLoading = ref(false); //加载
const orderList = reactive([]); // 订单列表
const isopen = ref(0); //是否有售后权限
const isshowRefundPopuo = ref(false); //是否显示退款弹窗
const itemData = ref(<ordersType>{});
const mobile = ref(""); //联系电话
const qrCode = ref(""); //联系二维码
const customerPopups = ref<any>();
const qrcodeurl = ref("");
const PayQrcodeDialogVisible = ref(false); // 支付二维码弹窗
// tab切换
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeIndex.value = tab.paneName as number;
  pageNo.value = 1;
  getList();
};
// 翻页
const handlePageChange = (page: number) => {
  pageNo.value = page;
  getList();
};
// 获取订单列表
const getList = async () => {
  listLoading.value = true;
  let params: any = {
    page: pageNo.value,
    userId: userStore.userId,
    token: userStore.token,
    status: "",
    deviceType: 4,
  };
  let url = "/api/szl/listOrders";
  if (activeIndex.value == 0) {
    params.status = "";
  }
  //待付款
  if (activeIndex.value == 1) {
    params.status = "0";
  }
  //待发货
  if (activeIndex.value == 2) {
    params.status = "3";
  }
  //待收货
  if (activeIndex.value == 3) {
    params.status = "4";
  }
  //已完成
  if (activeIndex.value == 4) {
    params.status = "1";
  }
  if (activeIndex.value == 5) {
    url = "/api/szl/orders/aftersale/list";
  }
  const { data, count } = await listOrder(url, params);
  listLoading.value = false;
  if (data && data.length != 0) {
    data.forEach((item: any, index: number) => {
      if (item.aftersaleList && item.aftersaleList.length != 0) {
        item.refundStatus = item.aftersaleList[0].refundStatus;
        item.aftersaleId = item.aftersaleList[0].id;
        item.deliveryNumber = item.aftersaleList[0].deliveryNumber;
        item.aftersaleStatus = item.aftersaleList[0].status;
      }
    });
  }
  orderList.splice(0, orderList.length, ...(data || []));
  totalcount.value = count;
};
// 是否有售后权限
const getIsOpen = async () => {
  const { data } = await isRefund({
    token: userStore.token,
  });
  isopen.value = data || 0;
};
const Popup = (item: any) => {
  itemData.value = item;
  isshowRefundPopuo.value = true;
};
// 获取客服信息
const linkcustomerservice = async () => {
  const res = await customerServiceMobile({});
  if (res.status == 0) {
    mobile.value = res.data.mobile;
    qrCode.value = res.data.qrCode || "";
    customerPopups.value.linkcustomerservice();
  }
};
const submitpay = async (item: any) => {
  let params: any = {
    userId: userStore.userId,
    payTypeCode: "WXPAY",
    truePrice: item.truePrice,
    productPrice: item.productPrice,
    count: item.count,
    orderType: 7,
    productId: item.productId,
    payType: 4,
    id: item.id,
    deviceType: 4,
  };
  listLoading.value = true;
  const { status, data } = await submitSingle(params);
  listLoading.value = false;
  if (status == "0") {
    qrcodeurl.value = data.qrCode;
    PayQrcodeDialogVisible.value = true;
  }
};
// 支付弹窗 点击已完成支付
const paysuccess = () => {
  PayQrcodeDialogVisible.value = false;
  getList();
};
onMounted(() => {
  getList();
  getIsOpen();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 650px;
}
.demo-tabs {
  min-height: 600px;
}
.buy-btn {
  width: 100%;
  height: 50px;
  background: #fcdc46;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  margin-top: 20px;
}
</style>
