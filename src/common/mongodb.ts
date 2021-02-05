import mongoose from "mongoose"
import log from "./log"
import config from "../config/dbConfig"

const db = mongoose.connection
mongoose.connect(config.mongodb.url)

db.on("connected", () => {
  log.info("Mongoose default connection open to: ", config.mongodb.url)
})

db.on("error", (err: any) => {
  log.error("Mongoose connection failed: ", err)
})

db.on("disconnected", () => {
  log.info("Mongoose disconnected...")
})

module.exports = mongoose
