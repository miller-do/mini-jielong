// pages/fight-desk/fight-desk.js
//json横屏配置 "pageOrientation":"landscape"
const app = getApp();
import {wordsdata} from '../../utils/wordsData'
import setAudio from '../../utils/audio' 
let {debounce,throttle}=require('../../utils/util')
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
    mode:1,
    browseMode:{
      browseWord:"",
      explainWord:null
    },
    historyWords:[],
    animatedType:'lightSpeedIn',
    show: false,
    buttons: [
        {
            type: 'default',
            className: '',
            text: '拒绝',
            value: 0
        },
        {
            type: 'primary',
            className: '',
            text: '允许',
            value: 1
        }
    ],
    avatarUrl:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    nickname:""
  },
  formSubmit(e){
    console.log('form发生了submit事件，携带数据为：', e)
    if (!e.detail.value.nickname) {
      wx.showModal({
        content:'请填入昵称！'
      })
      return
    }
   
    wx.setStorageSync('curUserInfo', e.detail.value)
    this.setData({
      nickname:e.detail.value.nickname,
      show: false
    })
  },
  reject(){
    this.setData({
      show: false
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },

  getuseInfo: function () {
    this.setData({
        show: true
    })
  },
  buttontap(e) {
    console.log(e.detail)
    if (e.detail.index==1) {
      this.formSubmit(e)
      this.setData({
        show: false
      })
    } else {
      this.setData({
        show: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let mode=wx.getStorageSync('mode');
    if (mode) {
      this.setData({
        mode:mode
      })
    }else{
      wx.setStorageSync('mode', options.id);
      this.setData({
        mode:options.id
      })
    }
    
    // console.log('mode',this.data.mode)

    //初始玩家信息
    this.data.healthStatus=[
      {id:1,value:3},
      {id:2,value:3},
    ]

    //获取龙头
    let word = wordsdata[Math.floor(Math.random()*wordsdata.length)];
   
    //过词模式
    if (this.data.mode==1) {
      this.data.historyWords.push(word);
      this.setData({
        ['browseMode.browseWord']:word,
        ['browseMode.explainWord']:word.ex,
      })
      // console.log('word.ex',this.data.browseMode)
      setTimeout(()=>{
        this.setData({
          animatedType:'',
        })
      },500)
      // console.log('browseMode.explainWord',this.data.browseMode.explainWord)
    } else {
      this.setData({
        dragonHeader:word,
        healthStatus:this.data.healthStatus
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    setAudio.innerAudioContextBgm.stop()
    setAudio.setAudioBgmDesk().then(res=>{
      res.play()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onReady')
  },

  //快速过词
  getword(){
    console.log('getword',this.data.historyWords)
    let curword = wordsdata[Math.floor(Math.random()*wordsdata.length)];
    this.data.historyWords.some(e=>{
      // return e.text!=curword.text
      if (e.text!=curword.text) {
        this.data.historyWords.push(curword)
        return true;//跳出循环
      }else{
        curword = wordsdata[Math.floor(Math.random()*wordsdata.length)];
        return true;//跳出循环
      }
    })
    console.log('curword',curword)
   
    this.setData({
      ['browseMode.browseWord']:curword,
      animatedType:'lightSpeedIn'
    })
    setTimeout(()=>{
      this.setData({
        animatedType:'',
      })
    },500)
  },

  //跳过
  gopass(){
    setAudio.setAudio('/static/wrong.mp3');
    let that=this;
    if (this.data.mode==1) {
      throttle(this.getword(),3000)
      return
    }
    
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
    }).then(()=>{
      console.log('21212')
    })
    var timer=null;
    timer=setTimeout(()=>{
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
              setAudio.innerAudioContextBgmDesk.stop();
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
    },500)
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
    if(this.data.sound=='offsound'){
      setAudio.innerAudioContextBgmDesk.stop();
    }else{
      setAudio.innerAudioContextBgmDesk.play();
    }
  },

  //投降确定按钮
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
    setAudio.innerAudioContextBgmDesk.stop();
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
  },
  onconfirm(){
    setAudio.setAudio('/static/btnout.mp3');
    wx.navigateBack({
      delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
    })
    wx.removeStorageSync('mode');
  },

  oncancel(){
    setAudio.setAudio('/static/click.mp3');
    // this.toggleMenu();
    this.setData({
      showMenu:false
    })
  },

  //退出游戏
  onGetout(e){
    // console.log('onGetout',e)
    setAudio.setAudio('/static/click.mp3');
    wx.navigateBack({
      delta:1
    })
    wx.removeStorageSync('mode');
  },

  //重新开始
  onRestart(e){
    // console.log('onRestart',this.data.mode)
    setAudio.setAudio('/static/click.mp3');
    // this.onShow()
    wx.redirectTo({
      url: '/pages/fight-desk/fight-desk?id='+this.data.mode
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('onHide')
    setAudio.innerAudioContextBgmDesk.stop();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // console.log('onUnload')
    setAudio.innerAudioContextBgmDesk.stop();
    wx.removeStorageSync('mode');
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

  
})