import { getPlaylistDetail } from '../../service/api/music'

Page({
  data: {
    type: '',
    songList: {}
  },
  onLoad: function (options) {
    const { type, id } = options
    this.setData({ type })
    switch (type) {
      case 'rank':
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptRankingData', data => {
          const { rankingData } = data
          this.setData({ songList: rankingData })
        })
        break
      case 'menu':
        getPlaylistDetail(id).then(res => {
          this.setData({ songList: res.playlist })
        })
    }
  }
});
