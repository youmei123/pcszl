import { Plugin } from 'xgplayer'

const { POSITIONS } = Plugin
/**
 * @module ./Plugins/logo
 * @exports DemoPlugin
 */
export default class demoPlugin extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'demoPlugin'
  }

  static get defaultConfig () {
      return {
        // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
        position: POSITIONS.ROOT_RIGHT
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
    return `<div class="demo-plugin">这是一个dmeo插件<div class="icon"></div></div>`
  }
}