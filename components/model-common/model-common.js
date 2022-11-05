// components/model-common/model-common.js
Component({
  // 允许共用app.wxss
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    propTitle:String,
    propContent:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //显示
    showmodel(){
      this.setData({
        show:true
      })
    },
    //隐藏
    hidemodel(){
      this.setData({
        show:false
      })
    },
    //点击遮罩
    clickMask(e){
      this.setData({
        show:false
      })
      this.oncancel()
    },
    onconfirm(){
      this.setData({
        show:false
      })
      this.triggerEvent('confirm')
    },
    oncancel(){
      this.setData({
        show:false
      })
      this.triggerEvent('cancel')
    }
  }
})
