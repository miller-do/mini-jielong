
const app = getApp();
console.log('app1111',app)
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
  innerAudioContext.play()
}

var setOutAudio = function(){
  setAudio('/static/comein.mp3',)
}

var setInAudio = function(){
  setAudio('/static/comein.mp3',)
}

module.exports ={
  setAudio,
  setOutAudio,
  setInAudio
}