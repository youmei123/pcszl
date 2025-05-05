/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-14 14:43:24
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 16:25:43
 * @FilePath: \pcszl\src\store\userStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { UserInfo } from '@/utiles/types';
export const useUserStore = defineStore('user', {
    state: () => ({
        UserInfo: {} as UserInfo,
        token:'',
        userId:''
    }),
    actions: {
        setUserInfo(info: UserInfo) {
            this.UserInfo = info;
        },
        setToken(token: string) {
            this.token = token;
        },
        setUserId(userId: string) {
            this.userId = userId;
        },
    },
    // 开启持久化
    persist: {
        storage: localStorage,
        key: 'user-store'
    }
});