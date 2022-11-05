var app = getApp()
//心跳动画
module.exports = {
  animationMiddleHeaderItem: animationMiddleHeaderItem,//心跳动画
}

// 平移动画
function animationMiddleHeaderItem(that) {
  var circleCount = 0;
  // 心跳的外框动画  
  that.animationMiddleHeaderItem = wx.createAnimation({
    duration: 1000,    // 以毫秒为单位  
    timingFunction: 'linear',
    delay: 100,
    transformOrigin: '50% 50%',
    success: function (res) {
    }
  });
  setInterval(function () {
    if (circleCount % 2 == 0) {
      that.animationMiddleHeaderItem.scale(1.3).step();
    } else {
      that.animationMiddleHeaderItem.scale(1.0).step();
    }

    that.setData({
      animationMiddleHeaderItem: that.animationMiddleHeaderItem.export()  //输出动画
    });

    circleCount++;
    if (circleCount == 1000) {
      circleCount = 0;
    }
  }.bind(this), 1000);
  return that.animationMiddleHeaderItem;
}