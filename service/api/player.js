import request from '../index'

export function getSongDetail(ids) {
  return request.get('/song/detail', {
    ids
  })
}

export function getLyric(id) {
  return request.get('/lyric', {
    id
  })
}
