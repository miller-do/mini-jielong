// pages/fight-desk/fight-desk.js
const app = getApp();
import {wordsdata} from '../../utils/wordsData'
import setAudio from '../../utils/audio' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    aword:"",
    words:[],
    dragonHeader:null,//开局龙头
    isshowForm:false,//显示输入发送控件
    showPass:true,
    showNotice:false,
    showInputBtn:true,//显示接龙按钮
    showNoticeGroup:true,
    wordsBoxHeight:0,
    showMenu:false,
    sound:'sound',
    showRule:false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    healthStatus:[],//生命值
    propTitle:"提示",
    propContent:"退出后当前战绩将丢失，您确定是要退出吗？",
    healModel:{
      title:"提示",
      content:"您的生命值已不足，确定要投降吗？"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log('options',options)
    //获取龙头
    let word = wordsdata[Math.floor(Math.random()*wordsdata.length)];

    //初始玩家信息
    this.data.healthStatus=[  
      {id:1,value:3},
      {id:2,value:3},
    ]

    this.setData({
      dragonHeader:word,
      healthStatus:this.data.healthStatus
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   setTimeout(function(){
      //音效
      // setAudio.setAudio(`${app.globalData.baseUrl}/sound/y1285.mp3`)
   },1000)
  },

  //跳过
  gopass(){
    setAudio.setAudio('/static/wrong.mp3');
    let that=this;
    // console.log('this.data.healthStatus',this.data.healthStatus[0].value)
    if(this.data.healthStatus[0].value>0){
      this.data.healthStatus.forEach((item,index)=>{
        if(index==0){
          if(item.value>0){
            item.value--
          }
        }
      })
      this.robotAnswer();
    }else{
      this.selectComponent('.model-common-health').showmodel();
    }

    this.setData({
      // showNoticeGroup:false,
      isshowForm:false,
      showPass:false,
      showNotice:this.data.healthStatus[0].value>=0?true:false,
      showInputBtn:false,
      healthStatus:this.data.healthStatus
    })
    
  },

  //人机作答
  robotAnswer(){
    clearTimeout(timer);
    var that=this;
    wx.showLoading({
      title: '对手作答中',
    })
    var timer=setTimeout(()=>{
      // console.log(wordsdata)
      // console.log(this.data.words)
      let lastword,indexword;
      if(this.data.words.length<1){
        //接龙头作答
        // console.log('dragonHeader',this.data.dragonHeader)
        lastword = this.data.dragonHeader.text.split('')[3];
        indexword=wordsdata.filter((item)=>{
          return lastword==item.text.split('')[0];
        })
      }else{
        //接玩家作答
        lastword = this.data.words.slice(-1)[0].text.split('')[3];
        indexword=wordsdata.filter((item)=>{
          return lastword==item.text.split('')[0];
        })
      }
      // console.log('indexword',indexword)
      if(indexword.length<1){
        wx.showToast({
          title: '阁下难到我了！',
          icon: 'error',
          duration: 2000
        })
        //人机生命值显示
        this.data.healthStatus.forEach((item,index)=>{
          if(index==1){
            item.value--
            if(item.value<0){
              setAudio.setAudio('/static/oversucess.mp3');
              this.selectComponent('.game-over').overSuccess();
              return true;
            }
            this.setData({
              showNoticeGroup:true,
              isshowForm:false,
              showPass:true,
              showNotice:false,
              showInputBtn:true,
              healthStatus:this.data.healthStatus
            })
          }
        })
        return
      }
      if(indexword.length>1){
        //查出多个，过滤已有答案
        // indexword=indexword.filter(element => {
        //   let hadshow = that.data.words.filter(item=>{
        //     return element.text==item.text
        //   })
        //   if(hadshow.length>0){
        //     console.log('hadshow',hadshow)
        //     return hadshow[0].text!=element.text
        //   }else{
        //     return element
        //   }
        // });
        // console.log('indexword',indexword)
        this.data.words.push(indexword[Math.floor(Math.random()*indexword.length)])
      }else{
        this.data.words.push(indexword[0])
      }
      this.setData({
        words:this.data.words,
        aword:"",
        showNoticeGroup:true,
        isshowForm:false,
        showPass:true,
        showNotice:false,
        showInputBtn:true
      })
      this.scrollToBottom();
      wx.hideLoading()
    },2000)
  },

  //提示
  gettips(){
    setAudio.setAudio('/static/quickly.mp3');
  },

  //接龙输入
  showInput(){
    setAudio.setAudio('/static/click.mp3');
    this.setData({
      isshowForm:true,
      showInputBtn:false
    })
  },

  //
  setbindinput(e){
    // console.log("data",e)
    if(e.detail.value.trim()==''){
      this.setData({
        aword:""
      })
      return
    }
    //必须为汉字
    var box = /^[\u4e00-\u9fa5]+$/;
    let reg = box.test(e.detail.value);
    if(!reg){
      setAudio.setAudio('/static/warning.mp3');
      wx.showToast({
        title: '请输入汉字！',
        icon: 'error',
        duration: 2000
      })
      this.setData({
        aword:""
      })
      return
    }else{
      //限定字数
      // let len =e.detail.value.length
      // if(len!=4){
      //   wx.showToast({
      //     title: '成语不合规',
      //     icon: 'error',
      //     duration: 2000
      //   })
      //   this.setData({
      //     aword:""//e.detail.value.substr(0,4)
      //   })
      //   return
      // }
      this.setData({
        aword:e.detail.value
      })
    }
    
  },

  sendword(){
    console.log(this.data.aword)
    //不能为空
    if(!this.data.aword){
      setAudio.setAudio('/static/warning.mp3');
      wx.showToast({
        title: '内容不能为空！',
        icon: 'error',
        duration: 2000
      })
      return false
      // wx.hideToast();
    }

    //限定字数
    let len = this.data.aword.length
    if(len!=4){
      setAudio.setAudio('/static/warning.mp3');
      wx.showToast({
        title: '请输入成语！',
        icon: 'error',
        duration: 2000
      })
      return
    }
    
    let lastword = ""
    if(this.data.words.length<1){
      lastword = this.data.dragonHeader.text.split('')[3];
    }else{
      lastword = this.data.words.slice(-1)[0].text.split('')[3];
    }
    //接龙规则
   
    let indexWord = this.data.aword.split('')[0];
    console.log('111', lastword)

    if(indexWord!=lastword){
      setAudio.setAudio('/static/warning.mp3');
      wx.showToast({
        title: '非接龙词语！',
        icon: 'error',
        duration: 2000
      })
      return
    }

    let obj={
      text:this.data.aword,
      tag:"1"//角色标识
    }
    
    this.data.words.push(obj)
    setAudio.setAudio('/static/success.mp3');
    this.setData({
      words:this.data.words,
      aword:"",
      // isshowForm:false,
      // showNotice:false,
      showNoticeGroup:false
    })
    this.scrollToBottom();
    this.robotAnswer();
  },

  //滚动到底部
  scrollToBottom(){
    var query = wx.createSelectorQuery();
    query.select('.words-box').boundingClientRect();
    const that=this;
    query.exec(function (res) {
      // console.log("Res",res)
      that.setData({
        wordsBoxHeight:res[0].height
      })
    })
  },

  //设置
  setting(){
    setAudio.setAudio('/static/warning.mp3');
    wx.showToast({
      title: '功能暂未开放',
      icon: 'error',
      duration: 2000
    })
  },

  //菜单操作
  toggleMenu(){
    // console.log('setAudio',setAudio)
    setAudio.setAudio('/static/click.mp3');
    this.setData({
      showMenu:this.data.showMenu?false:true
    })
  },

  //游戏规则
  gameRule(){
    setAudio.setAudio('/static/click.mp3');
    this.setData({
      showRule:this.data.showRule?false:true
    })
  },

  //游戏音效开关
  setSound(){
    setAudio.setAudio('/static/click.mp3');
    this.setData({
      sound:this.data.sound=='sound'?'offsound':'sound'
    })
  },

  //投降
  surrender(){
    setAudio.setAudio('/static/fail.mp3');
    this.setData({
      isshowForm:false,
      showPass:false,
      showNotice:false,
      showInputBtn:false,
      // gameOver:true,
    })
    this.selectComponent('.game-over').overFail()
    //显示对战清单
  },
  //取消投降
  oncancelHealth(){
    setAudio.setAudio('/static/click.mp3');
    this.setData({
      // showNoticeGroup:false,
      isshowForm:false,
      showPass:true,
      showNotice:false,
      showInputBtn:true,
    })
  },

  //退出游戏
  outGame(){
    setAudio.setAudio('/static/click.mp3');
    let model = this.selectComponent('.model-common')
    // console.log('model',model)
    model.setData({
      show:true
    })
    // model.onconfirm()
  },
  onconfirm(){
    setAudio.setAudio('/static/btnout.mp3');
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    })
  },

  oncancel(){
    setAudio.setAudio('/static/click.mp3');
    // this.toggleMenu();
    this.setData({
      showMenu:false
    })
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

  },

  //退出游戏
  onGetout(e){
    // console.log('onGetout',e)
    setAudio.setAudio('/static/click.mp3');
    wx.navigateBack({
      delta:1
    })
  },

  //重新开始
  onRestart(e){
    // console.log('onRestart',e)
    setAudio.setAudio('/static/click.mp3');
    wx.redirectTo({
      url: '/pages/fight-desk/fight-desk'
    })
  }
})