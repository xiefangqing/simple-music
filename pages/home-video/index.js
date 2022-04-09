import { getTopMV } from '../../service/api/video'

Page({
  data: {
    topMVs: []
  },
  onLoad: async function (options) {
    const res = await getTopMV(0)
    this.setData({ topMVs: res.data })
  }
})
