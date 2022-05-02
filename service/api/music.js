import request from '../../service/index'

export function getBanner() {
  return request.get('/banner', {
    type: 1
  })
}

export function getPlaylistDetail() {
  return request.get('/playlist/detail', {
    // 热歌榜（/toplist接口能看到榜单对应的id）
    id: 3778678
  })
}

export function getTopPlaylist(limit = 6) {
  return request.get('/top/playlist', {
    limit
  })
}
