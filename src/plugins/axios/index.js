import axios from 'axios'

import devConfig from './axios.dev.config'
import prodConfig from './axios.prod.config'
import getErrorMessage from './httpError'

import { Message } from 'element-ui'

const config = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig
const instance = axios.create(config)
let errMsg = null

/**
 * 请求拦截器
 * 请求发送前进行一些操作
 */
instance.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('token')) {
    config.headers.token = window.sessionStorage.getItem('token')
  }
  return config
}, err => Promise.reject(err))

/**
 * 响应拦截器
 * 接收到响应后进行一些操作
 */
instance.interceptors.response.use(response => {
  if (/.*\/verifyUserName.*/.test(response.config.url) || /.*\/verifyUserEmail.*/.test(response.config.url)) {
    return response.data
  } else if (response.request.responseType === 'json') {
    if (response.data.code === 200) {
      return response.data
    } else {
      let err = {
        config: response.config,
        request: response.request,
        header: response.header,
        response: { data: { status: response.data.code, description: response.data.msg } }
      }
      return responseErrorHandler(err)
    }
  } else {
    return response
  }
}, responseErrorHandler)

/**
 * @description: 统一处理响应错误
 * @param {Object} error
 * @return: 
 */
const responseErrorHandler = error => {
  // 自定义错误
  const err = getErrorMessage(error)
  // 错误提示
  errMsg && errMsg.close()
  errMsg = Message.error(err.description || '')
  return { data: {}, code: err.code }
}

window.$get = instance.get
window.$post = instance.post
window.$axios = instance