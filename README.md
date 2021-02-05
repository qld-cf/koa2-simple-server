# koa2-simple-server


koa2 mysql mongoose redis websocket log4js winston typescript

```
npm install
// 本地热加载开发
npm run dev
// 构建成js
npm run build
// 线上启动 pm2或run dev
npm run pm2-start:watch
// 查看日志
pm2 log

```

#### 修改数据库配置
src/config/dbConfig.ts

CURL测试- http://127.0.0.1:2333/api/v1/koa/mobile?name=华为



TODO: 开发环境开启日志，生产关闭(占用内存)
TODO: mogno和redis 引入和实例创建

###### websocket 前端使用

```
import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:8002";

interface IProps {
  loading: boolean
}

const WebSocket = (props: IProps) => {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transport: ['websocket'] });
    console.log('socket', socket)
    if (socket) {
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }
  }, []);
  return (
    <Card>
      Settings
      <p>
        WebSocket检测: 当前服务器返回时间: <time dateTime={response}>{response}</time>
      </p>
    </Card>
  )
}

export default WebSocket


```

##### TIPS

- run server: 提示server option错误,注意是否pm2已经启动实例