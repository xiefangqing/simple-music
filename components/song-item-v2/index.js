Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    index: Number,
    item: {
      type: Object,
      value: {}
    },
    showIndex: {
      type: Boolean,
      value: true
    }
  },
  data: {},
  methods: {
    gotoPlayer() {
      const id = this.properties.item.id
      wx.navigateTo({
        url: `/pages/player/index?id=${id}`
      })
    }
  }
});
