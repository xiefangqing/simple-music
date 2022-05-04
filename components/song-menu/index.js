const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },
    songMenu: {
      type: Array,
      value: []
    }
  },
  data: {
    screenWidth: app.globalData.screenWidth
  },
  methods: {
    gotoDetailSong(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/detail-song/index?type=menu&id=${id}`
      })
    }
  }
});
