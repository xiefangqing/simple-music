import request from '../index'

export function getTopMV(offset, limit = 10) {
  return request.get('/top/mv', {
    offset,
    limit
  })
}

export function getMVUrl(id) {
  return request.get('/mv/url', {
    id
  })
}

export function getMVDetail(id) {
  return request.get('/mv/detail', {
    mvid: id
  })
}

export function getRelatedAllVideo(id) {
  return request.get('/related/allvideo', {
    id
  })
}
