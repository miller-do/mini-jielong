// components/rule-info/rule-info.js
import setAudio from '../../utils/audio' 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // showRule:{
    //   type: Boolean,
    //   value: true,
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showRule:false
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
  attached: function () { }, // 此处 attached 的声明会被 lifetimes 字段中的声明覆盖
  ready: function() { },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toggleInfo(){
      setAudio.setAudio('/static/click.mp3')
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
        showRule:this.data.showRule?false:true
      })
    }
  }
})
