// ?表示 非必反字段
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
    isFake: number;
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