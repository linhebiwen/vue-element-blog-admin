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
}
