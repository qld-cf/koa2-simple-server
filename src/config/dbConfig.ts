// 自定义的配置：测试环境
const envList = ["test"]
const moment = require("moment")

const dateFormat = function () {
  return "[" + moment().format("YYYY-MM-DD HH:mm:ss.SSS") + "]"
}
// TODO: 抽取公用的后merge
let devConfig: any = {
  debug: true,
  projectName: "koa",
  env: "dev",
  port: 3000,
  jwtSecret: "mapleChain",
  logger: {
    dev: {
      name: "dev",
      level: "debug",
      json: false,
      colorize: "all",
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
    },
    prd: {
      name: "prd",
      level: "info",
      json: false,
      colorize: false,
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
      datePattern: "YYYY-MM-DD",
      filename: "server.%DATE%.log",
      maxFiles: "60d",
    },
  },
  mysql: {
    user: "root",
    password: "123",
    database: "koa",
    orm: {
      dialect: "mysql",
      host: "127.0.0.1",
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
        handleDisconnects: true,
      },
      dialectOptions: {
        connectTimeout: 10000,
      },
      logging: true,
      //时区
      timezone: "+08:00",
    },
  },
  redis: {
    port_redis: "root",
    host_redis: "123",
  },
  urlPrefix: {
    prefix: "/api/v1",
  },
}

let prodConfig: any = {
  debug: false,
  projectName: "koa",
  env: "dev",
  port: 3000,
  jwtSecret: "mapleChain",
  logger: {
    dev: {
      name: "dev",
      level: "debug",
      json: false,
      colorize: "all",
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
    },
    prd: {
      name: "prd",
      level: "info",
      json: false,
      colorize: false,
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
      datePattern: "YYYY-MM-DD",
      filename: "server.%DATE%.log",
      maxFiles: "60d",
    },
  },
  mysql: {
    user: "root",
    password: "123",
    database: "koa",
    orm: {
      dialect: "mysql",
      host: "127.0.0.1",
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
        handleDisconnects: true,
      },
      dialectOptions: {
        connectTimeout: 10000,
      },
      logging: true,
      //时区
      timezone: "+08:00",
    },
  },
  redis: {
    port_redis: "root",
    host_redis: "123",
  },
  urlPrefix: {
    prefix: "/api/v1",
  },
}
export default process.env.NODE_ENV === "prod" ? prodConfig : devConfig
