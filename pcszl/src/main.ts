/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-11 15:30:46
 * @FilePath: \pcszl\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';
import loading from "@/components/loading/index.vue";
import 'normalize.css';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App);
app.component('Header', Header);
app.component('Footer', Footer);
app.component('loading', loading);
app.use(router);
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app');  
