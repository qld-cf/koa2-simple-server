"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = __importStar(require("log4js"));
var methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];
var contextLogger = {};
log4js.configure({
    appenders: {
        console: {
            type: 'stdout',
        },
        cheese: {
            type: 'dateFile',
            encoding: 'utf-8',
            filename: 'logs/globalLog',
            layout: {
                type: "pattern",
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
            },
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
        },
    },
    categories: { default: { appenders: ['cheese', 'console'], level: 'info' } }
});
var bindLog = function () {
    var logger = log4js.getLogger('cheese');
    // 循环 methods 将所有方法挂载到ctx 上
    methods.forEach(function (method) {
        contextLogger[method] = function (message) {
            logger[method](message);
        };
    });
    // 为 ctx 增加 log 方法
    Object.defineProperty(global, 'log', {
        value: contextLogger,
        writable: false,
        enumerable: true,
        configurable: false
    });
};
exports.default = bindLog;
//# sourceMappingURL=globalLog.js.map