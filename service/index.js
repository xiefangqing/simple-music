const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'http://192.168.4.102:3000'

class Request {
  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method,
        data: params,
        success(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }
  get(url, params) {
    return this.request(url, 'GET', params)
  }
  post(url, data) {
    return this.request(url, 'POST', data)
  }
}

export default new Request()
