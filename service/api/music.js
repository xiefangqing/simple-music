import request from '../index'

export function getBanner() {
  return request.get('/banner', {
    type: 1
  })
}

// 可以从 /toplist 接口查到榜单对应id
export function getPlaylistDetail(id) {
  return request.get('/playlist/detail', {
    id
  })
}

export function getTopPlaylist(limit = 6) {
  return request.get('/top/playlist', {
    limit
  })
}
