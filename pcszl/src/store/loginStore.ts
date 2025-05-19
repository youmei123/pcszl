/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-19 15:33:17
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-19 16:11:17
 * @FilePath: \pcszl\src\store\loginStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// stores/useModalStore.ts
import { defineStore } from 'pinia';

// 定义弹窗状态（示例为登录弹窗）
interface ModalState {
    isLoginVisible: boolean; // 控制登录弹窗显示/隐藏
}

export const useModalStore = defineStore('modal', {
    state: (): ModalState => ({
        isLoginVisible: false, // 初始状态为隐藏
    }),
    actions: {
        // 显示登录弹窗的方法
        showLoginModal() {
            console.log('打开登录弹窗')
            this.isLoginVisible = true;
        },
        // 隐藏登录弹窗的方法
        hideLoginModal() {
            console.log('关闭登录弹窗')
            this.isLoginVisible = false;
        },
    },
});