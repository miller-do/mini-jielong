// pages/index/index.js
const app = getApp()
// import { animationUtil } from '../../utils/animateUtil'
import  animationUtil  from '../../utils/animateUtil'
import setAudio from '../../utils/audio' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg:"/images/2.gif",
    btnImg:"/images/play.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData.baseUrl)
    console.log(this)
    animationUtil.animationMiddleHeaderItem(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  startgame(){
    setAudio.setInAudio()
    wx.navigateTo({
      url: '/pages/select-model/select-model',
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