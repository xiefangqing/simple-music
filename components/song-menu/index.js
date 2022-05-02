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
  methods: {}
});
