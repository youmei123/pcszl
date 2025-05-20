<template>
  <div class="page-container">
    <div class="submit-order-container content">
      <div class="breadcrumb-cont">
        <el-breadcrumb :separator-icon="DArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>提交订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="submit-order-content f-jb-as">
        <div class="submit-order-left" v-if="Commodity">
          <div v-if="isEntity == 0">
            <VirtualOrder
              ref="virtualOrder"
              :type="isEntity"
              :data="Commodity"
              @productchange="productchange"
            />
          </div>
          <div v-else>
            <EntityCreateOrder
              v-if="isEntity == 1"
              :product="product"
              @addresschange="addresschange"
            />
            <VirtualOrder
              ref="virtualOrder"
              :type="isEntity"
              :data="Commodity"
              :freightcharges="freightcharges"
              @productchange="productchange"
            />
          </div>
        </div>
        <el-affix :offset="145" target=".submit-order-content">
          <div class="submit-order-right">
            <div class="right-title">付款详情</div>
            <div class="row-list">
              <div class="row-item f-jb-ac">
                <div>商品总价:</div>
                <div class="price">
                  ￥{{ (paycount * (Commodity?.price || 0)).toFixed(2) }}
                </div>
              </div>
              <div class="row-item f-jb-ac">
                <div>订单运费:</div>
                <div>￥{{ freightcharges }}</div>
              </div>
              <div class="row-item f-jb-ac">
                <div>需付款:</div>
                <div class="price" v-if="isEntity == 1">
                  ￥{{
                    Number((paycount * (Commodity?.price || 0)).toFixed(2)) +
                    freightcharges
                  }}
                </div>
                <div class="price" v-else>
                  ￥{{ (paycount * (Commodity?.price || 0)).toFixed(2) }}
                </div>
              </div>
              <div class="row-item f-jb-ac">
                <div>支付方式:</div>
                <div class="f-ac">
                  <div class="iconfont icon-weixinzhifu"></div>
                  <div>微信支付</div>
                </div>
              </div>
            </div>
            <div class="buy-btn pointer" @click="submitorder">提交订单</div>
          </div>
        </el-affix>
      </div>
    </div>
    <el-dialog
      v-model="PayQrcodeDialogVisible"
      title="支付二维码"
      width="300"
      align-center
      :close-on-click-modal="false"
    >
      <div class="dialog-content f-jc-ac">
        <qrcode-vue :value="qrcodeurl" :size="250" class="qrcode-container" />
      </div>
      <template #footer>
        <div class="buy-btn pointer" @click="paysuccess">已完成支付</div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { DArrowRight } from "@element-plus/icons-vue";
import EntityCreateOrder from "../submitorder/components/EntityCreateOrder/index.vue";
import VirtualOrder from "../submitorder/components/VirtualOrder/index.vue";
import { useRoute, useRouter } from "vue-router";
import { singleCourse } from "@/api/course";
import { submitSingle } from "@/api/usercenter";
import { postage } from "@/api/order";
import { useUserStore } from "@/store/userStore";
import { CourseListType } from "@/utiles/types";
import { ProductType } from "@/utiles/types";
import { ref, onMounted } from "vue";
import { singleproduct } from "@/api/mall";
import { ElMessage } from "element-plus";
import QrcodeVue from "qrcode.vue";
import { AddressType } from "@/utiles/types";
import { ElLoading } from "element-plus";

interface CommodityType {
  id: string;
  price?: number;
  img?: string;
  name?: string;
}

const route = useRoute();
const router = useRouter();
const virtualOrder = ref<InstanceType<typeof VirtualOrder>>();

const userStore = useUserStore();
const types = Number(route.query.types); // 1课程 7商品
const courseId = route.query.courseId; // 课程id
const productId = route.query.productId; // 商品id
const isEntity = ref(0); // 0虚拟  1实体
const course = ref<CourseListType>(); //课程对象
const product = ref<ProductType>(); // 商品对象
const Commodity = ref<CommodityType>(); //商品对象
const PayQrcodeDialogVisible = ref(false); // 支付二维码弹窗
const qrcodeurl = ref("");
const paycount = ref(1);
const freightcharges = ref(0);
const address = ref<AddressType>();

console.log(types);

onMounted(() => {
  if (types == 1) {
    getSingleCourse();
  } else {
    getSingleProduct();
  }
});

const getSingleCourse = async () => {
  const { data } = await singleCourse({
    courseId: courseId,
    userId: userStore.userId,
  });
  const { listVideo, ...singlecourse } = data;
  course.value = singlecourse as CourseListType;
  Commodity.value = {
    id: course.value?.id,
    name: course.value?.courseName,
    price: course.value?.coursePrice,
    img: course.value?.courseCoverImg,
  };
  console.log(course.value);
};

const getSingleProduct = async () => {
  const { data } = await singleproduct({
    productId: productId,
    userId: userStore.userId,
  });
  product.value = data as ProductType;
  isEntity.value = product.value?.isEntity || 0;
  Commodity.value = {
    id: product.value?.id,
    name: product.value?.name,
    price: product.value?.price,
    img: product.value?.img,
  };
  console.log(product.value);
};

const getPostage = async (text: string) => {
  const { status, data } = await postage({
    address: text,
  });
  if (status == 0) {
    freightcharges.value = data;
  }
};

const addresschange = (item: AddressType) => {
  address.value = item;
  if (!item.area) return;
  if (!item.area.includes("西藏自治区") && !item.area.includes("新疆维吾尔自治区")) {
    freightcharges.value = 0;
  } else {
    let text = "";
    if (item.area!.includes("西藏自治区")) {
      text = "西藏";
    } else if (item.area!.includes("新疆维吾尔自治区")) {
      text = "新疆";
    }
    getPostage(text);
  }
};

const productchange = ({ count }: any) => {
  paycount.value = count;
};

const submitorder = async () => {
  const { remake } = virtualOrder.value!.getInfo();

  let params: any = {
    userId: userStore.userId,
    payType: 4,
    deviceType: 4,
    payTypeCode: "WXPAY",
    remark: remake || "",
    orderType: types,
  };
  if (types == 1) {
    params.courseId = course.value?.id;
    params.productName = course.value?.courseName;
    params.truePrice = course.value?.coursePrice;
  }
  if (types == 7) {
    if (isEntity.value == 1) {
      params.truePrice =
        Number(((product.value?.price || 0) * paycount.value).toFixed(2)) +
        Number(freightcharges.value);
      params.productId = product.value?.id;
      params.consignee = address.value?.name || "";
      params.consigneeMobile = address.value?.mobile || "";
      params.consigneeAddress =
        (address.value?.area || "") + (address.value?.address || "");
    } else {
      params.truePrice = (product.value?.price || 0) * paycount.value;
      params.productId = product.value?.id;
    }
  }
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const { status, data, message } = await submitSingle(params);
  if (status == "0") {
    qrcodeurl.value = data.qrCode;
    console.log(data);
    loading.close();
    PayQrcodeDialogVisible.value = true;
  } else {
    loading.close();
    // if (message) {
    //   ElMessage.warning(message);
    // }
  }
};

const paysuccess = () => {
  PayQrcodeDialogVisible.value = false;
  if (types == 1) {
    router.push("/usercenter/mycourse");
  } else {
    router.push("/usercenter/myorder");
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 550px !important;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.breadcrumb-cont {
  padding: 15px 0;
  box-sizing: border-box;
}
.submit-order-left {
  width: 810px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.submit-order-right {
  width: 370px;
  background: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.right-title {
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
}
.row-list {
  padding-bottom: 25px;
  border-bottom: 1px solid #dddddd;
  padding-top: 5px;
  box-sizing: border-box;
}
.row-item {
  margin-top: 20px;
  font-weight: bold;
}
.price {
  color: #fb2b1e;
}
.icon-weixinzhifu {
  color: rgb(21, 186, 17);
  margin-right: 5px;
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
:deep(.el-dialog__footer){
  padding-top: 0;
}
:deep(.el-dialog){
  padding-bottom: 20px;
}
</style>
