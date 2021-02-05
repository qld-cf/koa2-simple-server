"use strict"

const _errorCode = require("./error_code") // eslint-disable-line

// 系统自自定义错误
class SysError extends Error {
  code?: any
  status?: number
  content?: undefined
  constructor(
    message: string,
    errorCode: any = _errorCode.ERROR_UNKNOWN,
    content?: undefined,
    status = 200
  ) {
    super(message)
    this.code = errorCode
    this.status = status
    this.content = content
  }
}

export default SysError
