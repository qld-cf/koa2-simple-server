import Koa from "koa"
import * as http from "http"
import globalLogger from "./utils/logger/globalLog"
import log from "./middleware/log"
// 中间件
import cors from "./middleware/cors"
import bodyParser from "koa-bodyparser"
import koaStatic from "koa-static"
import path from "path"
import router from "./router"
import APP_GLOBAL_CONFIG from "./config/common"
import socketIO from "socket.io"

const app = new Koa()
const env = process.env.NODE_ENV
const PORT: number | string = APP_GLOBAL_CONFIG.APP_PORT
const server = http.createServer(app.callback())

const io = socketIO(server, { pingInterval: 20000 })
let interval: NodeJS.Timeout
io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }
  // getApiAndEmit(socket)
  interval = setInterval(() => getApiAndEmit(socket), 3000)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

const getApiAndEmit = (socket: socketIO.Socket) => {
  const response = new Date()
  // 向客户端发送事件
  socket.emit("FromAPI", response)
}

const staticPath = "../static"

// 使用中间件
app.use(cors)
app.use(log())
app.use(bodyParser())
app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(router.routes())

// routerMount(app)
globalLogger()

// 监听应用端口
const _server = app.listen(PORT)

server.listen(_server) // 监听socket端口 必须要监听该端口服务 不然405
// server.listen(getConfig(env).baseSocketPort) // 监听socket端口

console.log(`服务初始化成功: Server running on port ${PORT}`)
