import { getBanner } from '../../service/api/music'
import { getComponentRect, throttle } from '../../utils/index'

const throttleGetComponentRect = throttle(getComponentRect, 1000)

Page({
  data: {
    banners: [],
    swiperHeight: 0
  },
  onLoad(options) {
    this.getPageData()
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/index'
    })
  },
  getPageData() {
    getBanner().then(res => {
      this.setData({ banners: res.banners })
    })
  },
  // 当图片载入完毕时触发
  swiperImageLoaded() {
    // 获取组件高度（节流处理）
    throttleGetComponentRect('.swiper-image').then(res => {
      this.setData({ swiperHeight: res[0].height })
    })
  }
})
