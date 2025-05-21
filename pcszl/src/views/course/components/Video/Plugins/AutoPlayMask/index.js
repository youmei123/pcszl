/*
 * @Author: Lzx 924807479@qq.com
 * @Date: 2025-05-17 17:30:38
 * @LastEditors: Lzx 924807479@qq.com
 * @LastEditTime: 2025-05-21 09:27:25
 * @FilePath: \pcszl\src\views\course\components\Video\Plugins\AutoPlayMask\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Plugin,Events } from 'xgplayer'

const { POSITIONS } = Plugin
/**
 * @module ./Plugins/logo
 * @exports AutoPlayMask
 */
export default class AutoPlayMask extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'AutoPlayMask'
  }

  static get defaultConfig () {
      return {
        // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
        position: POSITIONS.ROOT,
      }
  }

  constructor (args) {
    super(args)
    this.timer=null;
  }
  // 显示插件
  show() {
    this.setStyle('display', 'flex')
    let playnextbtn =this.find('.play-next-btn')
    if(playnextbtn.innerHTML!='已暂无下一个视频'){
      let time=2
      this.timer=setInterval(() => {
        playnextbtn.innerHTML = `播放下一节(${time})`
        time--
        if (time < 0) {
          this.hide();
          clearInterval(this.timer)
          this.player.emit('AutoPlayMask-next');
        }
      },1000)
    }
  }

  hide() {
    if(this.timer){
      clearInterval(this.timer)
    }
    this.setStyle('display', 'none')
    let playnextbtn =this.find('.play-next-btn')
    playnextbtn.innerHTML = `播放下一节(3)`
  }
  lastvideo(){
    if(this.timer){
      clearInterval(this.timer)
    }
    console.log('触发已暂无下一个视频按钮')
    let playnextbtn =this.find('.play-next-btn')
    playnextbtn.innerHTML='已暂无下一个视频'
  }
  beforePlayerInit () {
   // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit () {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }
  afterCreate () {
    // this.icon = this.find('.icon')
    this.replayClick = (e) => {
        console.log(e)
        clearInterval(this.timer)
        this.hide();
        this.player.emit('AutoPlayMask-replay');
    }
    this.playnextbtnClick = (e) => {
        console.log(e)
        clearInterval(this.timer)
        this.hide();
        this.player.emit('AutoPlayMask-next');
    }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.replay-btn', 'click', this.replayClick)
    this.bind('.play-next-btn', 'click', this.playnextbtnClick)
    // 对当前插件根节点绑定click事件
    //TODO 插件实例化之后的一些逻辑
  }

  destroy () {
    clearInterval(this.timer);
    this.timer=null;
    this.unbind('.replay-btn', 'click', this.replayClick)
    this.unbind('.play-next-btn', 'click', this.playnextbtnClick)
    // 播放器销毁的时候一些逻辑
  }

  render () {
    return `<div class="AutoPlayMask-plugin f-jc-ac" style="display:none"> >
                <div class="replay-btn" >重播</div>
                <div class="play-next-btn">播放下一节(3)</div>
            </div>`
  }
}