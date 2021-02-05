/*
 * @Description: 日志封装
 * @Author: your name
 * @Date: 2019-05-13 14:21:08
 * @LastEditTime: 2019-06-12 16:18:44
 * @LastEditor: Please set LastEditors
 */

"use strict"
import DailyRotateFile from "winston-daily-rotate-file"
import { createLogger, transports, format } from "winston"
import config from "../config/dbConfig"
const { combine, timestamp, printf } = format

let _transports = null
console.log("config.debug", config.debug)
if (config.debug) {
  _transports = [new transports.Console(config.logger.dev)]
} else {
  _transports = [new DailyRotateFile(config.logger.prd)]
}

const logger = createLogger({
  transports: _transports,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss:SSS",
    }),
    printf((info: any) => {
      const { level, message, timestamp } = info
      let splatInfo = info[Symbol.for("splat")]
      if (level.indexOf("error") !== -1) {
        console.error(info.timestamp, message, splatInfo ? splatInfo : "") // eslint-disable-line
      }
      let more = [message]
      if (splatInfo) {
        splatInfo.forEach((item: { message: any }) => {
          if (item instanceof Error) {
            more.push(item.message)
          } else if (item instanceof Buffer) {
            more.push(item)
          } else if (typeof item === "object") {
            more.push(JSON.stringify(item))
          } else {
            more.push(item)
          }
        })
      }
      return `[${timestamp}] - [${level}] - [${process.pid}]: ${more.join(" ")}`
    })
  ),
})

// module.exports = logger
export default logger
