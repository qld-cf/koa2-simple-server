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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var http = __importStar(require("http"));
var globalLog_1 = __importDefault(require("./utils/logger/globalLog"));
var log_1 = __importDefault(require("./middleware/log"));
// 中间件
var cors_1 = __importDefault(require("./middleware/cors"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_static_1 = __importDefault(require("koa-static"));
var path_1 = __importDefault(require("path"));
var router_1 = __importDefault(require("./router"));
var common_1 = __importDefault(require("./config/common"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = new koa_1.default();
var env = process.env.NODE_ENV;
var PORT = common_1.default.APP_PORT;
var server = http.createServer(app.callback());
var io = socket_io_1.default(server, { pingInterval: 20000 });
var interval;
io.on("connection", function (socket) {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    // getApiAndEmit(socket)
    interval = setInterval(function () { return getApiAndEmit(socket); }, 3000);
    socket.on("disconnect", function () {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
var getApiAndEmit = function (socket) {
    var response = new Date();
    // 向客户端发送事件
    socket.emit("FromAPI", response);
};
var staticPath = "../static";
// 使用中间件
app.use(cors_1.default);
app.use(log_1.default());
app.use(koa_bodyparser_1.default());
app.use(koa_static_1.default(path_1.default.join(__dirname, staticPath)));
app.use(router_1.default.routes());
// routerMount(app)
globalLog_1.default();
// 监听应用端口
var _server = app.listen(PORT);
server.listen(_server); // 监听socket端口 必须要监听该端口服务 不然405
// server.listen(getConfig(env).baseSocketPort) // 监听socket端口
console.log("\u670D\u52A1\u521D\u59CB\u5316\u6210\u529F: Server running on port " + PORT);
//# sourceMappingURL=server.js.map