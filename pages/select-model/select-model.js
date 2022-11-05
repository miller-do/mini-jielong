// pages/model/model.js
const app = getApp()
import setAudio from '../../utils/audio'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgModels:[
      {id:1,url:"/images/bg-model.png",name:"人机对战"},
      // {id:2,url:"/images/bg-model.png",name:"双人游戏"},
      // {id:3,url:"/images/bg-model.png",name:"多人对战"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  gofight(e){
    //音效
    setAudio.setInAudio()
    // console.log("11111",e.currentTarget.dataset.item)
    let optionData=e.currentTarget.dataset.item
    if(optionData.id!=1){
      wx.showToast({
        title: '模式待开放……',
        icon: 'error',
        duration: 2000
      })
      return
    }
    //跳转
    wx.navigateTo({
      url: '/pages/fight-desk/fight-desk?id='+optionData.id,
    })
  },

  backtap(){
    setAudio.setAudio('/static/btnout.mp3');
    wx.navigateBack({
      delta:1
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})