<!--
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 11:24:05
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-06-05 09:16:41
 * @FilePath: \pcszl\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-page-navbar f-ja-ac" :class="{ ishome: currentPath == '/' }">
    <div class="logo-box f-shrink0">
      <img
        src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2025/4/7/2951187417718319454/logo.png"
        alt=""
      />
    </div>
    <div class="menu-list f-ja-ac">
      <div
        class="mebu-item"
        :class="{ isActive: currentPath == item.path }"
        v-for="item in navMenuList"
        @click="handmenu(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="user-box f-jc-ac">
      <div
        class="autocomplete"
        :class="{ focused: isFocused }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="autocomplete-box f-je-ac">
          <el-autocomplete
            v-model="state"
            :class="{ 'is-focus': isiconFocused }"
            :placeholder="placeholder"
            :fetch-suggestions="querySearchAsync"
            @focus.stop="handserachfocus"
            @blur.stop="handserachblur"
            @select="handleSelect"
          >
            <template #suffix>
              <!-- <el-icon><Search /></el-icon> -->
              <div class="iconfont icon-sousuo" @click="serve"></div>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <UserPopup />
    </div>
  </div>
</template>

<script setup lang="ts">
import { listCourse } from "@/api/home";
import { listproduct } from "@/api/mall";
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import UserPopup from "@/components/UserPopup/index.vue";
defineProps({
  moretext: {
    type: String,
    default: "查看更多",
  },
});
onMounted(() => {
  allcourselist.value = [];
});

interface LinkItem {
  value: string;
  link: string;
}

const navMenuList = reactive([
  {
    name: "首页",
    path: "/",
  },
  {
    name: "全部课程",
    path: "/course",
  },
  {
    name: "特色疗法",
    path: "/FeatureZone",
  },
  // {
  //   name: "直播",
  // },
  // {
  //   name: "短视频",
  // },
  {
    name: "百科",
    path: "/encyclopedia",
  },
  {
    name: "商城",
    path: "/mall",
  },
  {
    name: "关于我们",
    path: "/about",
  },
  {
    name: "联系我们",
    path: "/aboutIndex",
  },
]);

const allcourselist = ref<LinkItem[]>([]);
const route = useRoute();
const currentPath = ref(route.path);
const state = ref("");
const router = useRouter();
const placeholder = ref("搜索");
const isFocused = ref(false);
const isiconFocused = ref(false);
watch(
  () => route.path,
  (newPath) => {
    currentPath.value = newPath;
    handserachblur();
    allcourselist.value = [];
    state.value = "";
  }
);

const handleMouseEnter = () => {
  console.log("鼠标移入");
  isiconFocused.value = true;
  console.log(isiconFocused.value);
};

const handleMouseLeave = () => {
  console.log("鼠标移出");
  isiconFocused.value = false;
  console.log(isiconFocused.value);
};

const handserachfocus = () => {
  isFocused.value = true;
  isiconFocused.value = true;
  if (route.path == "/mall") {
    placeholder.value = "请输入商品名称";
  } else {
    placeholder.value = "请输入课程名称";
  }
};

const handserachblur = () => {
  placeholder.value = "搜索";
  if (!state.value) isFocused.value = false;
  isiconFocused.value = false;
};

const handmenu = (item: any) => {
  if (currentPath.value == item.path || !item.path) return;
  router.push({
    path: item.path,
  });
};

const cbs = ref(<any>null);
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  if (queryString) {
    cbs.value = cb;
    const results = queryString
      ? filterByValueContainingName(queryString)
      : allcourselist.value;
    cb(results || []);
  } else {
    cb([]);
  }
};

const filterByValueContainingName = (name: string): { value: string; link: string }[] => {
  if (!name) return []; // 处理空字符串输入
  const searchKey = name.toLowerCase(); // 转换为小写进行匹配
  return allcourselist.value.filter(
    (item) => item.value.toLowerCase().includes(searchKey) // 不区分大小写的包含匹配
  );
};
// 点击搜索
const serve = () => {
  if (!state.value) {
    ElMessage({
      type: "warning",
      message: "请输入搜索内容",
    });
    return;
  }
  allcourselist.value = [];
  if (route.path == "/mall") {
    serachProductlist(state.value, cbs.value);
  } else {
    serachcourselist(state.value, cbs.value);
  }
};
// 课程
const serachcourselist = async (queryString: string = "", cb: any) => {
  const { data } = await listCourse({
    condition: queryString || "",
  });
  allcourselist.value = transformCoursesToNameLink(data);
  if (queryString && data.length == 0) {
    ElMessage({
      type: "warning",
      message: "没有找到相关课程",
    });
  }
  cbs.value(allcourselist.value);
};
// 商品
const serachProductlist = async (queryString: string = "", cb: any) => {
  const { data } = await listproduct({
    condition: queryString,
  });
  allcourselist.value = transformCoursesToNameLink(data);
  if (queryString && data.length == 0) {
    ElMessage({
      type: "warning",
      message: "没有找到相关商品",
    });
  }
  cbs.value(allcourselist.value);
};
// 处理数据
const transformCoursesToNameLink = (courses: any[]): LinkItem[] => {
  let list = <any>[];
  if (route.path == "/mall") {
    list = courses.map((item) => ({
      value: item.name,
      link: `/productDetail?productId=${item.id}`,
    }));
  } else {
    list = courses.map((item) => ({
      value: item.courseName,
      link: `/coursevideo?courseId=${item.id}`,
    }));
  }
  return list;
};
// 点击跳转
const handleSelect = (item: Record<string, any>) => {
  console.log(item);
  router.push(item.link);
  state.value = "";
};
</script>

<style lang="scss" scoped>
.home-page-navbar {
  width: 100%;
  background-color: white;
  height: 100px;
  box-sizing: border-box;
  box-shadow: 0px 1px 10px 0px rgba(219, 219, 219, 0.5);
  position: relative; /* 避免被父元素遮挡 */
  z-index: 20;
}
.ishome {
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: none;
  position: absolute;
  top: 0;
  z-index: 5;
}
.logo-box {
  width: 210px;
  height: 51px;
}
.logo-box img {
  width: 100%;
  height: 100%;
}
.menu-list {
  max-width: 1200px;
  width: 100%;
}
.mebu-item {
  color: #212930;
  font-size: 18px;
  cursor: pointer;
}
.mebu-item:hover {
  color: #ce9433 !important;
}
.user-box {
  width: 300px;
}
.user-box .iconfont {
  font-size: 28px;
}
.user-box div {
  cursor: pointer;
}
:deep(.search-container) {
  margin-right: 40px;
}
.isActive {
  color: #ce9433 !important;
}

.autocomplete {
  margin-right: 20px;
  width: 40px;
  // width: 100%;
  // transition: width 0.5s ease;
}

.autocomplete :deep(.el-input__inner) {
  height: 40px;
}
.autocomplete :deep(.el-input) {
  width: 0;
  transition: all 0.5s ease;
}
.autocomplete :deep(.el-input__inner) {
  height: 40px;
  width: 0;
  // display: none; //11
  transition: all 0.5s ease;
}

.autocomplete :deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: none; //111
  transition: all 0.5s ease;
}
.autocomplete :deep(.el-input) {
  border-color: #ffffff;
}

.ishome .autocomplete :deep(.el-input__wrapper) {
  background-color: transparent;
}

.menu-icon .iconfont {
  font-size: 18px;
}
.icon-sousuo {
  font-size: 24px !important;
  color: rgba(33, 41, 48, 1);
}
:deep(.focused .el-input__inner) {
  width: 150px;
  transition: all 0.5s ease;
}
:deep(.focused .el-input__wrapper) {
  background-color: white !important;
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  transition: all 0.5s ease;
}
.icon-tuichu {
  padding-top: 3px;
}
</style>
