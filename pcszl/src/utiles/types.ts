/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-12 16:48:32
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-30 09:54:27
 * @FilePath: \pcszl\src\utiles\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ?表示 非必反字段
/**
 * 用户信息类型         
 */
export interface UserInfo {
    id?: string;
    mobile?: string;
    realname?: string;
    nickname?: string;
    state?: number;
    types?: number;
    sex?: string;
    address?: string;
    headImg?: string;
    vipLevel?: number;
    wechatId?: string;
    vipAccount?: number;
    expirationTime?: number;
    bdMerchantId?: string;
    companyUserId?: string;
}


/**
 * 直播列表类型         
 */
export interface LiveListType {
    id: string;
    isopen: number;
    name: string;
    roomid?: string;
    coverImgUrl: string;
    startTime: number;
    endTime: number;
    shareImgUrl: string;
    isWhiteCount: number;
    ispay: number;
    anchorName: string;
    xaxis?: number;
    yaxis?: number;
    closeReplay: number;
    subscribeCount: number;
    isFake?: number;
}
/**
 * 课程列表类型         
 */
export interface CourseListType {
    id: string;
    courseTypeId: string;
    courseName: string;
    coursePrice: number;
    coursePriceIOS: number;
    bdCostPrice: number;
    courseDescription: string;
    isrecommend: number;
    isfree: number;
    isshow: number;
    courseCoverImg: string;
    orders: number;
    addtime: number;
    playCount: number;
    ispay: number;
    posterTemplate?: string;
    xaxis?: number;
    yaxis?: number;
}
/**
 * 课程视频类型        
 */
export interface CourseVideoType {
    id: string;
    courseId?: string;
    videoName?: string;
    hwassetId?: string;
    hwUrl?: string;
    hwSize?: number;
    hwDuration?: number;
    isaudition?: number;
    isshow?: number;
    orders?: number;
    imgUrl?: string;
    qualityList?: {
        hwassetId: string;
        quality: string;
        url: string;
        hwSize: number;
        hwDuration: number;
    }[];
    watchTime?: number;
    isWatermark?: number;
}
/**
 * 商品类型       
 */
export interface ProductType {
    id: string;
    name?: string;
    img?: string;
    price?: number;
    priceIOS?: number;
    originalPrice?: number;
    labels?: string;
    isEntity?: number;
    type?: number;
    contents?: string;
    salesVolume?: number;
    realSalesVolume?: number;
    bdCostPrice?: number;
    isShow?: number;
    description?: string,
    productSpecificationCount: number;
    szlProductVideo?: {
        hwDuration: number;
        hwSize: number;
        hwUrl: string;
        hwassetId: string;
        id: string;
        imgUrl: string;
        productId: string;
        videoName: string;
    }
}
/**
 * 地址类型       
 */
export interface AddressType {
    id?: string;
    userId?: string;
    addtime?: number;
    updatetime?: number;
    name?: string;
    mobile?: string;
    address?: string;
    area?: string;
    isDefault?: number | 1;
    arrayCodeList?: string[];
}

/**
 * 订单类型      
 */
export interface ordersType {
    id: string;
    productId: string;
    productName: string;
    productImg: string;
    status: number;
    orderType: number;
    orderNo: string;
    productPrice: number;
    truePrice: number;
    isEntity: number;
    healthcoinCount: number;
    couponMoney: number;
    count: number;
    addtime: number;
    aftersaleIsShow: number;
    refundStatus: number;
    aftersaleId: string;
    deliveryNumber: string;
    aftersaleStatus: number;
    consignee: string;
    consigneeAddress: string;
    consigneeMobile: string;
    aftersaleList: Array<aftersale>;
    deliveryName: string;
    payTime: number;
    courseId: string;
    payPrice: number;
    deliveryPostage: number;
    productSpecificationName: string;
}
// 售后类型
export interface aftersale {
    id: string;
    refundStatus: number;
    status: number;
    aftersaleCompanyAddress: {
        name: string;
        mobile: string;
        address: string;
        id: string;
    },
    statusText: string;
    logs: [{}]
}

