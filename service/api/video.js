import request from '../../service/index.js'

export function getTopMV (offset, limit = 10) {
  return request.get('/top/mv', {
    offset,
    limit
  })
}
