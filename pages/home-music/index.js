import { getBanner, getPlaylistDetail, getTopPlaylist } from '../../service/api/music'
import { getComponentRect, throttle } from '../../utils/index'

const throttleGetComponentRect = throttle(getComponentRect, 1000)

Page({
  data: {
    banners: [],
    swiperHeight: 0,
    recommendSong: [],
    hotSongMenu: [],
    hotRanking: {},
    newRanking: {},
    soarRanking: {},
    originalRanking: {},
    newRankingSlice: {},
    soarRankingSlice: {},
    originalRankingSlice: {},
    showRanking: false
  },
  onLoad(options) {
    this.getPageData()
  },
  getPageData() {
    getBanner().then(res => {
      this.setData({ banners: res.banners })
    })
    getTopPlaylist().then(res => {
      this.setData({ hotSongMenu: res.playlists })
    })
    // 热歌榜：3778678 新歌榜：3779629 飙升榜：19723756 原创榜：2884035
    const rankingList = [
      { id: 3778678, key: 'hotRanking', slice: 'recommendSong' },
      { id: 3779629, key: 'newRanking', slice2: 'newRankingSlice' },
      { id: 19723756, key: 'soarRanking', slice2: 'soarRankingSlice' },
      { id: 2884035, key: 'originalRanking', slice2: 'originalRankingSlice' }
    ]
    let count = 0
    rankingList.forEach(r => {
      getPlaylistDetail(r.id).then(res => {
        const data = res.playlist
        count++
        this.setData({ 
          [r.key]: data,
          [r.slice]: data.tracks.slice(0, 6),
          [r.slice2]: {
            coverImgUrl: data.coverImgUrl,
            tracks: data.tracks.slice(0, 3)
          },
          showRanking: count === rankingList.length
        })
      })
    })
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/index'
    })
  },
  gotoDetailSong(e) {
    const rankingData = e.currentTarget.dataset.rankingData
    wx.navigateTo({
      url: '/pages/detail-song/index?type=rank',
      success(res) {
        res.eventChannel.emit('acceptRankingData', { rankingData })
      }
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
