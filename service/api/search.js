import request from '../index'

export function getSearchHotDetail() {
  return request.get('/search/hot/detail')
}

export function getSearchSuggest(keywords) {
  return request.get('/search/suggest', {
    type: 'mobile',
    keywords
  })
}

export function getSearch(keywords, limit = 20) {
  return request.get('/search', { 
    keywords,
    limit
  })
}
