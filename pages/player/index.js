import { getSongDetail, getLyric } from '../../service/api/player'
import { audioContext } from '../../audio-context'
import { throttle, getComponentRect } from '../../utils/index'

Page({
  data: {
    songInfo: {},
    duration: 0,
    currentTime: 0,
    sliderValue: 0,
    isDragging: false,
    lyric: {},
    lyricLocation: 0,
    lyricScrollTop: 0
  },
  onLoad: function (options) {
    const id = options.id
    this.getPageData(id)
    this.playMusic(id)
  },
  getPageData(id) {
    getSongDetail(id).then(res => {
      this.setData({ 
        songInfo: res.songs[0],
        duration: res.songs[0].dt
      })
    })
    getLyric(id).then(res => {
      const lyricStr = res.lrc.lyric
      const lyric = this.parseLyric(lyricStr)
      this.setData({ lyric })
    })
  },
  playMusic(id) {
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    audioContext.onCanplay(() => {
      if (!audioContext.paused) audioContext.play()
    })
    // 节流
    const throttleTimeUpdateFun = throttle(() => {
      // 乘1000把秒变成毫秒，这样可以在wxml利用formatDuration做时间格式化
      const currentTime = audioContext.currentTime * 1000
      const sliderValue = currentTime / this.data.duration * 100
      if (!this.data.isDragging) {
        this.setData({ currentTime, sliderValue })
      }
      let lyricLocation = 0
      for (let location in this.data.lyric) {
        if (currentTime >= location) {
          lyricLocation = location
        } else {
          break
        }
      }
      getComponentRect('.lyric').then(res => {
        const lyricContainerHeight = res[0]?.height // 获取歌词容器的高度
        const index = Object.keys(this.data.lyric).indexOf(lyricLocation)
        this.setData({
          lyricLocation,
          lyricScrollTop: index * 24 - parseInt(lyricContainerHeight / 2)
        })
      })
    }, 300)
    audioContext.onTimeUpdate(throttleTimeUpdateFun)
  },
  dragging(e) {
    const value = e.detail.value
    const currentTime = value / 100 * this.data.duration
    this.setData({ currentTime, isDragging: true })
  },
  afterDrag(e) {
    const value = e.detail.value
    const currentTime =  this.data.duration * (value / 100)
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value, isDragging: false, currentTime })
  },
  togglePlayPause() {
    audioContext.paused ? audioContext.play() : audioContext.pause()
  },
  parseLyric(lyricStr) {
    const lyricArr = lyricStr.split('\n')
    const lyricObj = {}
    lyricArr.forEach(item => {
      const timeReg = /\[\d{2}:\d{2}.\d{2}\]/g
      const timeRegRes = item.match(timeReg)
      if (timeRegRes) {
        const timeRegResStr = timeRegRes[0]
        const timeRegResStrArr = timeRegResStr.slice(1, -1).split(':')
        const time = timeRegResStrArr[0] * 60 * 1000 + timeRegResStrArr[1] * 1000
        const content = item.replace(timeRegRes, '')
        lyricObj[time] = content
      }
    })
    return lyricObj
  }
});
