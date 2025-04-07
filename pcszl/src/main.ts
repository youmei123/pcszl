/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-07 09:32:33
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-04-07 11:29:21
 * @FilePath: \pcszl\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';

const app = createApp(App);
app.component('Header', Header);
app.component('Footer', Footer);
app.use(router);
app.mount('#app');  
