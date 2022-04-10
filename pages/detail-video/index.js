import {
  getMVUrl,
  getMVDetail,
  getRelatedAllVideo
} from '../../service/api/video'

Page({
  data: {
    mvUrlData: {},
    mvDetailData: {},
    mvRelatedAllVideoData: []
  },
  onLoad(options) {
    const id = options.id
    this.getPageData(id)
  },
  getPageData(id) {
    // 并行提高效率（不应该用 Promise.all ）
    getMVUrl(id).then(res => this.setData({ mvUrlData: res.data }))
    getMVDetail(id).then(res => this.setData({ mvDetailData: res.data }))
    getRelatedAllVideo(id).then(res => this.setData({ mvRelatedAllVideoData: res.data }))
  }
});
