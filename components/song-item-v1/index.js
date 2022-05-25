Component({
properties: {
  item: {
    type: Object,
    observer(val) {
      // 因为wxs传入数组有问题，所以在这处理多个作者的情况
      this.setData({ authorName: val.ar.map(a => a.name).join(', ') })
    }
  }
},
data: {
  authorName: ''
},
  methods: {
    gotoPlayer() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/player/index?id=${id}`
      })
    }
  }
});
