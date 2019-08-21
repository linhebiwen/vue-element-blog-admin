import http from 'http'
import https from 'https'

const baseConfig = {
  baseURL: '/api',

  //请求超时设置
  timeout: 30000,
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  // transformRequest: [function (data) {
  //   // 对 data 进行任意转换处理
  //   return data
  // }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [function (data) {
  //   // 对 data 进行任意转换处理
  //   return data
  // }],

  // 请求数据类型
  headers: {
    'Content-Type': 'application/json'
  },

  // 'withCredentials' 表示跨域请求时是否需要使用凭证
  withCredentials: false,

  // 'auth' 表示应该使用HTTP基础验证，并提供凭证
  // 这将设置一个 'Authorization'头，覆写掉现有的任意使用'headers'设置的自定义'Authorization'头
  auth: {},

  // 'responseType'表示服务器响应的数据类型，可以是'ArrayBuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // 'xsrfCookieName 是用作 xsrf token 的值得cookie名称
  xsrfCookieName: 'XSRF-TOKEN',

  // 'xsrfHeaderName' 是用作 xsrf token 的值的HTTP头名称
  xsrfHeaderName: 'X-XSRF=TOKEN',

  // 'maxContentLength'定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // 'validateStatus' 定义对于给定的HTTP响应状态码 resolve 或 reject, 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve 否则，promise 将被 reject
  validateStatus: function (status) {
    return status >= 200 && status < 300 //默认的
  },

  // 'httpAgent' 和 'httpsAgent' 分别在node.js中用于定义在执行http 和 https时使用的自定义代理。
  // 'keepAlive' 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'maxRedirects' 定义在node.js中 follow 的最大重定向数目
  // 如果设置为0, 将不会follow任何重定向
  maxRedirects: 5
}

export default baseConfig