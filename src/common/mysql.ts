"use strict"

import log from "./log"
import config from "../config/dbConfig"
import { Sequelize, DataTypes } from "sequelize"
import operatorsAliases from "./operators_aliases"

config.mysql.orm.operatorsAliases = operatorsAliases
let pool = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  config.mysql.orm
)

pool
  .authenticate()
  .then(() => {
    log.info("DB Connection has been established successfully")
  })
  .catch((err: any) => {
    log.error("Unable to connect to the database", err)
  })

export default {
  pool,
  Sequelize,
  DataTypes,
}
