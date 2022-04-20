// app.js
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0
  },
  onLaunch(options) {
    this.getScreenSize()
  },
  getScreenSize() {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
  }
})
