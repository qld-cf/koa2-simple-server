import fs from "fs"
import Router from "koa-router"
import middlewareParamCheck from "../middleware/param_valid"
import log from "../common/log"
import config from "../config/dbConfig"
// const fs = require('fs');
// const Router = require('koa-router');
// const middlewareParamCheck = require('../middleware/param_valid');
// const log = require('../common/log');
// const config = require('../config');

import ctroller from "../controllers"
import deploySchema from "../schema/deploySchema"

// 路由列表
const routerConfigList = [
  //登录获取token
  // {
  //   method: "post",
  //   path: "/auth/login",
  //   controller: ctroller.exampleCtrl.login,
  // },
  // {
  //   method: "get",
  //   path: "/auth/verification",
  //   controller: ctroller.exampleCtrl.verification,
  // },
  // //上传解析excel
  // {
  //   method: "post",
  //   path: "/auth/upload/excel",
  //   controller: ctroller.exampleCtrl.uploadExcel,
  // },
  // // 获取爬虫天气
  // {
  //   method: "get",
  //   path: "/koa/weather",
  //   controller: ctroller.exampleCtrl.weather,
  // },
  // 获取手机品牌
  {
    method: "get",
    path: "/koa/mobile",
    controller: ctroller.exampleCtrl.getBrand,
    //参数验证
    paramSchema: deploySchema.brandSchema,
  },
]

const router: any = new Router(config?.urlPrefix)

function addToRouter(routers: any) {
  // 加载api路由列表
  console.log("routers", routers)
  routers.forEach(
    (item: {
      method: any
      path: any
      permission: any[]
      paramSchema: { [x: string]: any }
      controller: any
    }) => {
      log.debug("router", item.method, item.path)
      let method = item.method ? item.method : "all"
      if (item.permission) {
        if (!Array.isArray(item.permission)) {
          item.permission = [item.permission]
        }
        router[method](
          item.path,
          middlewareParamCheck(item.paramSchema),
          ...item.permission,
          item.controller
        )
      } else {
        router[method](
          item.path,
          middlewareParamCheck(item.paramSchema),
          item.controller
        )
      }
    }
  )
}

// 聚合路由
const files = fs.readdirSync(__dirname)
files.forEach((file: any) => {
  // if (file !== "index.js" || file !== "index.js.map") {
  //   console.log(233, file)
  addToRouter(routerConfigList)
  // }
})

// module.exports = router
export default router
