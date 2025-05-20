/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-17 16:26:09
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-20 14:47:43
 * @FilePath: \pcszl\src\views\course\components\Video\Plugins\logo\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Plugin } from 'xgplayer'

const { POSITIONS } = Plugin
/**
 * @module ./Plugins/logo
 * @exports logoPlugin
 */
export default class logoPlugin extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'logoPlugin'
  }

  static get defaultConfig () {
      return {
        // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
        position: POSITIONS.ROOT
      }
  }

  constructor (args) {
    super(args)
  }

  beforePlayerInit () {
   // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit () {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  afterCreate () {
    this.icon = this.find('.icon')
    this.onIconClick = (e) => {
      console.log('class为icon元素点击回调')
    }
    this.onClick = () => {
      console.log('当前插件根节点点击事件')
    }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.icon', 'click', this.onIconClick)
    // 对当前插件根节点绑定click事件
    this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy () {
    this.unbind('.icon', 'click', this.onIconClick)
    this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
  }

  render () {
    return `<div class="logo-plugin">
        <img src="https://shijizhongshi-image.obs.cn-north-4.myhuaweicloud.com/2024/11/4/3516761452157676449/szllogo.png" />
    </div>`
  }
}