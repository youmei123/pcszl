import { createApp, h, ref } from 'vue';
import LoginPopup from '@/components/LoginPopup/index.vue';

// 定义一个函数来创建并挂载组件
export const useLoginPopup = (data: any) => {
    const popupRef = ref(null);
    const app = createApp({
        setup() {
            const popupData = ref(data);
            return () => h(LoginPopup, { ...popupData.value, ref: popupRef });
        }
    });

    const mountElement = document.createElement('div');
    mountElement.id = 'loginpopup';

    const existingPopup = document.getElementById('loginpopup');
    if (existingPopup) {
        document.body.removeChild(existingPopup);
    }

    document.body.appendChild(mountElement);

    app.mount(mountElement);

    // 返回组件实例
    return popupRef.value;
};

// 可以考虑将其封装为插件形式，方便全局使用
const LoginPopupPlugin = {
    install(app: any, options?: any) {
        app.config.globalProperties.$loginPopup = (data: any) => {
            return useLoginPopup(data);
        };
    }
};

// 导出一个新的 $loginPopup 方法，这个方法模拟插件安装后的调用
export const $loginPopup = (data?: any) => {
    const dummyApp = createApp({}); // 创建一个虚拟的 App 实例
    LoginPopupPlugin.install(dummyApp, { data });
    return dummyApp.config.globalProperties.$loginPopup(data);
};

export default LoginPopupPlugin;