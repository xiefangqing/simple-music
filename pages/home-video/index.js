import { getTopMV } from '../../service/api/video'

Page({
  data: {
    topMVs: [],
    hasMore: true
  },
  onLoad(options) {
    this.getTopMVData(0)
  },
  onPullDownRefresh() {
    this.getTopMVData(0)
    // 当上拉到无法加载新数据时，hasMore为false，此时再下拉刷新必须重新设为true
    this.setData({ hasMore: true })
    // 主动停止下拉刷新（不然会等待一会）
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  },
  async getTopMVData(offset) {
    const { topMVs, hasMore } = this.data
    if (offset === 0) {
      const res = await getTopMV(offset)
      this.setData({ topMVs: res.data })
    } else {
      if (hasMore) {
        const res = await getTopMV(offset)
        this.setData({ topMVs: [...topMVs, ...res.data] })
        this.setData({ hasMore: res.hasMore })
      }
    }
  },
  handleVideoItemTap(e) {
    const id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`
    })
  }
})
