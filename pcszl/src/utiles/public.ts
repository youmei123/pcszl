/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-04-12 17:00:59
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-05 16:41:54
 * @FilePath: \pcszl\src\utiles\public.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export function timeFormat(dateTime: Date | number | string | null = null, formatStr: string = 'yyyy-mm-dd'): string {
    let date: Date;
    // 若传入时间为假值，则取当前时间
    if (!dateTime) {
        date = new Date();
    }
    // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    else if (/^\d{10}$/.test(String(dateTime).trim())) {
        date = new Date(Number(dateTime) * 1000);
    }
    // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
        date = new Date(Number(dateTime));
    }
    // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
    // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
    else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
        date = new Date(dateTime.replace(/-/g, '/'));
    }
    // 其他都认为符合 RFC 2822 规范
    else {
        date = new Date(dateTime);
    }

    const timeSource: { [key: string]: string } = {
        'y': date.getFullYear().toString(), // 年
        'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        'd': date.getDate().toString().padStart(2, '0'), // 日
        'h': date.getHours().toString().padStart(2, '0'), // 时
        'M': date.getMinutes().toString().padStart(2, '0'), // 分
        's': date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };

    for (const key in timeSource) {
        const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
        if (ret) {
            // 年可能只需展示两位
            const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
            formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
        }
    }

    return formatStr;
}

export function transNumberToShort(value: number, decimal: number = 2): string {
    const k = 10000;
    const sizes: string[] = ['', '万', '亿', '万亿'];
    let i: number | undefined;
    let str: string = '';
    if (value < k) {
        str = value.toString();
    } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        str = (value / Math.pow(k, i)).toFixed(decimal) + sizes[i];
    }
    return str;
}
