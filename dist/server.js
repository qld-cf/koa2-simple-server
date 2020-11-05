"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa"); // koa框架
const config_1 = require("./config");
const http = require("http");
const socketIO = require("socket.io");
const globalLog_1 = require("./utils/logger/globalLog");
const log_1 = require("./middleware/log");
// 路由分发
const index_1 = require("./router/index");
// 中间件
const cors_1 = require("./middleware/cors");
const bodyParser = require("koa-bodyparser");
const app = new Koa(); // 新建一个koa应用
const env = process.env.NODE_ENV;
const PORT = config_1.default(env).basePort;
const server = http.createServer(app.callback());
// const io = socketIO(server, { pingInterval: 20000 })
const io = socketIO(server);
let interval;
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    // getApiAndEmit(socket)
    interval = setInterval(() => getApiAndEmit(socket), 3000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
const getApiAndEmit = (socket) => {
    const response = new Date();
    // 向客户端发送事件
    socket.emit("FromAPI", response);
};
app.use(cors_1.default);
app.use(log_1.default());
app.use(bodyParser());
index_1.default(app);
globalLog_1.default();
const _server = app.listen(PORT); // 监听应用端口
server.listen(_server); // 监听socket端口 必须要监听该端口服务 不然405
// server.listen(getConfig(env).baseSocketPort) // 监听socket端口
console.log(`服务初始化成功: Server running on port ${PORT}`);
//# sourceMappingURL=server.js.map