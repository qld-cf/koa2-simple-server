import mysql from "../common/mysql"

const User: any = mysql.pool.define(
  "koa_user",
  {
    // 管理员密码
    password: {
      type: mysql.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

User.sync()

User.upsert({
  password: "e10adc3949ba59abbe56e057f20f883e",
})

export default User
