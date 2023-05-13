// components/login/login.js
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      wx.onThemeChange((result) => {
        this.setData({
          theme: result.theme
        })
      })
    },
    onChooseAvatar(e) {
      wx.showModal({
        cancelColor: 'cancelColor',
        content:JSON.stringify(e.detail)
      })
      const { avatarUrl } = e.detail 
      this.setData({
        avatarUrl,
      })
    }
  }
})
