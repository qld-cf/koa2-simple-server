"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var koa_router_1 = __importDefault(require("koa-router"));
var param_valid_1 = __importDefault(require("../middleware/param_valid"));
var log_1 = __importDefault(require("../common/log"));
var dbConfig_1 = __importDefault(require("../config/dbConfig"));
// const fs = require('fs');
// const Router = require('koa-router');
// const middlewareParamCheck = require('../middleware/param_valid');
// const log = require('../common/log');
// const config = require('../config');
var controllers_1 = __importDefault(require("../controllers"));
var deploySchema_1 = __importDefault(require("../schema/deploySchema"));
// 路由列表
var routerConfigList = [
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
        controller: controllers_1.default.exampleCtrl.getBrand,
        //参数验证
        paramSchema: deploySchema_1.default.brandSchema,
    },
];
var router = new koa_router_1.default(dbConfig_1.default === null || dbConfig_1.default === void 0 ? void 0 : dbConfig_1.default.urlPrefix);
function addToRouter(routers) {
    // 加载api路由列表
    console.log("routers", routers);
    routers.forEach(function (item) {
        log_1.default.debug("router", item.method, item.path);
        var method = item.method ? item.method : "all";
        if (item.permission) {
            if (!Array.isArray(item.permission)) {
                item.permission = [item.permission];
            }
            router[method].apply(router, __spreadArrays([item.path,
                param_valid_1.default(item.paramSchema)], item.permission, [item.controller]));
        }
        else {
            router[method](item.path, param_valid_1.default(item.paramSchema), item.controller);
        }
    });
}
// 聚合路由
var files = fs_1.default.readdirSync(__dirname);
files.forEach(function (file) {
    // if (file !== "index.js" || file !== "index.js.map") {
    //   console.log(233, file)
    addToRouter(routerConfigList);
    // }
});
// module.exports = router
exports.default = router;
//# sourceMappingURL=index.js.map