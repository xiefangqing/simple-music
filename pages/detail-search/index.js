import { getSearchHotDetail, getSearchSuggest, getSearch } from '../../service/api/search'
import { debounce } from '../../utils/index'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 400)

Page({
  data: {
    value: '',
    hotKeywords: [],
    suggestList: [],
    suggestAllNodes: [],
    searchResult: []
  },
  onLoad: function (options) {
    this.getPageData()
  },
  getPageData() {
    getSearchHotDetail().then(res => {
      this.setData({ hotKeywords: res.data })
    })
    
    
    
  },
  confirmSearch() {
    const value = this.data.value
    getSearch(value).then(res => {
      this.setData({ searchResult: res.result.songs })
    })
  },
  clickKeyword(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ value: keyword })
    this.confirmSearch()
  },
  valueChange(e) {
    const value = e.detail
    this.setData({ value })
    if (!value.length) {
      this.setData({ 
        suggestList: [],
        searchResult: []
      })
      return
    }
    debounceGetSearchSuggest(e.detail).then(res => {
      const suggestList = res.result.allMatch
      this.setData({ suggestList })
      // 匹配标红
      const keywords = suggestList?.map(s => s.keyword)
      const suggestAllNodes = []
      for (const keyword of keywords) {
        if (keyword.startsWith(value)) {
          suggestAllNodes.push([{
            name: 'span',
            attrs: {
              style: 'color: red;'
            },
            children: [{
              type: 'text',
              text: value
            }]
          }, {
            name: 'span',
            attrs: {
              style: 'color: black;'
            },
            children: [{
              type: 'text',
              text: keyword.slice(value.length)
            }]
          }])
        } else {
          suggestAllNodes.push([{
            name: 'span',
            attrs: {
              style: 'color: black;'
            },
            children: [{
              type: 'text',
              text: keyword
            }]
          }])
        }
      }
      this.setData({ suggestAllNodes })
    }).catch(err => {
      console.log(err)
      // 无建议
      this.setData({ suggestList: [] })
    })
  }
});
