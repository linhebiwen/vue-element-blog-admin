const HTTP_ERROR = {
  HTTP_DEFAULT_ERROR: new Map([
    [400, '请求语法错误'],
    [401, '请求要求用户的身份认证'],
    [403, '服务器拒绝执行此请求'],
    [404, '请求的资源无法找到'],
    [405, '请求中的方法被禁止'],
    [406, '服务器无法根据客户端请求的内容特性完成请求'],
    [407, '请求要求代理的身份认证'],
    [408, '请求超时'],
    [409, '请求存在冲突'],
    [410, '客户端的请求资源已经不存在'],
    [411, '服务器无法处理不带Content-Length的请求信息'],
    [412, '请求信息的先决条件错误'],
    [413, '请求的实体过大'],
    [414, '请求的URI过长'],
    [415, '无法处理请求附带的媒体格式'],
    [416, '无效的请求范围'],
    [417, '无法满足Expect的请求头信息'],
    [500, '服务器内部错误'],
    [501, '服务器不支持该请求'],
    [502, '请求无效'],
    [503, '服务器暂时无法处理该请求'],
    [504, '无法获取请求'],
    [505, 'HTTP协议版本错误']
  ]),
  HTTP_CUSTOM_ERROR: new Map([])
}

const getErrorMessage = error => {
  const response = error.response ? error.response.data : undefined
  const err = {
    title: '未知错误',
    description: '系统发生未知错误',
    code: 500
  }
  if (response === undefined) {
    err.title = '网络异常'
    err.description = '网络异常, 请检查您的网络连接是否正常'
  } else if (typeof response === 'string') {
    err.description = '服务器异常, 请稍后重试'
  } else if (error.response.status < 600) {
    // 常规错误
    err.title = error.response.status < 500 ? '请求错误' : '服务器错误'
    err.description = HTTP_ERROR.HTTP_DEFAULT_ERROR.get(err.response.status)
    err.code = error.response.status
  } else {
    // 自定义错误
    err.title = '博客系统错误'
    err.description = (response && 'status' in response && HTTP_ERROR.CUSTOM_ERROR.has(response.status)) ? HTTP_ERROR.CUSTOM_ERROR.get(response.status) : '服务器异常,请稍后重试'
    err.code = response.status
  }
}

export default getErrorMessage