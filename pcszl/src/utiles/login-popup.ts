/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 09:43:02
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-06 16:44:14
 * @FilePath: \pcszl\src\utiles\login-popup.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp, h } from 'vue';
import LoginPopup from '@/components/LoginPopup/index.vue';

const openLoginPopup = () => {
    // 创建一个新的 div 元素作为挂载点
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    // 创建组件实例
    const app = createApp({
        render: () => h(LoginPopup),
    });

    // 挂载组件
    const vm = app.mount(mountNode);

    // 直接调用 open 方法，因为 vm 就是 LoginPopup 组件实例
    if (vm && typeof (vm as any).open === 'function') {
        (vm as any).open();
    }

    return {
        close: () => {
            app.unmount();
            document.body.removeChild(mountNode);
        },
    };
};

export default openLoginPopup;
