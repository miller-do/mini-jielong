// components/model-fail/model-fail.js
Component({
  // 允许共用app.wxss
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    propResult:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    gameOver:false,
    sucess:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //胜利
    overSuccess(){
      this.showmodel();
      this.setData({
        sucess:true
      })
    },
    
    //失败
    overFail(){
      this.showmodel();
      this.setData({
        sucess:false
      })
    },

    //显示model
    showmodel(){
      this.setData({
        gameOver:true
      })
    },

    //
    hidemodal(){
      this.setData({
        gameOver:false
      })
    },

    onOvergame: function(){
      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      this.triggerEvent('getout')//, myEventDetail, myEventOption
    },
    onRestart(){
      this.triggerEvent('restart')//, myEventDetail, myEventOption
    }
  }
})
