//音源配置
let audioConfig={
  "bgmDesk":"/static/bgmDesk.mp3",
  "bgm":"/static/bgm.mp3",
  "getin":"/static/comein.mp3",
  "getout":"/static/btnout.mp3",
}

//对战BGN
const innerAudioContextBgmDesk = wx.createInnerAudioContext()

//进入BGM
const innerAudioContextBgm = wx.createInnerAudioContext()

var setAudioBgmDesk =function(url,loop=true,autoplay=false,obeyMuteSwitch=true){
  innerAudioContextBgmDesk.autoplay = autoplay  // 是否自动开始播放，默认为 false
  innerAudioContextBgmDesk.loop = loop  // 是否循环播放，默认为 false
  wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
    obeyMuteSwitch: obeyMuteSwitch,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
    success: function (e) {
    },
    fail: function (e) {
    }
  })
  innerAudioContextBgmDesk.src=audioConfig.bgmDesk//`${app.globalData.baseUrl}/sound/652.mp3`
  // innerAudioContextBgmDesk.play()
  return Promise.resolve(innerAudioContextBgmDesk)
}


var setAudioBgm =function(url,loop=true,autoplay=false,obeyMuteSwitch=true){
  innerAudioContextBgm.autoplay = autoplay  // 是否自动开始播放，默认为 false
  innerAudioContextBgm.loop = loop  // 是否循环播放，默认为 false
  wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
    obeyMuteSwitch: obeyMuteSwitch,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
    success: function (e) {
    },
    fail: function (e) {
    }
  })
  innerAudioContextBgm.src=audioConfig.bgm//`${app.globalData.baseUrl}/sound/652.mp3`
  // innerAudioContextBgm.play()
  return Promise.resolve(innerAudioContextBgm)
}

var stopBgm=function(){
  innerAudioContextBgm.pause()
}

var playBgm=function(){
  innerAudioContextBgm.play()
}
var destroyBgm=function(){
  innerAudioContextBgm.destroy()
}

//按钮音效
var setAudio =function(url,loop=false,autoplay=false,obeyMuteSwitch=true){
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = autoplay  // 是否自动开始播放，默认为 false
  innerAudioContext.loop = loop  // 是否循环播放，默认为 false
  wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
    obeyMuteSwitch: obeyMuteSwitch,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
    success: function (e) {
    },
    fail: function (e) {
    }
  })
  innerAudioContext.src=url//`${app.globalData.baseUrl}/sound/652.mp3`
  innerAudioContext.play();
  innerAudioContext.onEnded(function(e){
    // console.log('e',e)
    innerAudioContext.destroy()
  })
}

var setOutAudio = function(){
  setAudio('/static/comein.mp3',)
}

var setInAudio = function(){
  setAudio('/static/comein.mp3',)
}

module.exports ={
  setAudio,
  setAudioBgm,
  setAudioBgmDesk,
  stopBgm,
  playBgm,
  setOutAudio,
  setInAudio,
  audioConfig,
  innerAudioContextBgm,
  innerAudioContextBgmDesk,
}