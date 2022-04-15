import request from '../../service/index'

export function getBanner() {
  return request.get('/banner', {
    type: 1
  })
}
