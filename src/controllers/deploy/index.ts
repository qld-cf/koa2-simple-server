import * as koa from "koa"
import mobileService from "../../services/deploy"

const getBrand = async (ctx: koa.Context, next: Function) => {
  let result: { name: any; rank: any }[] = []
  const { name } = ctx.reqParams.query
  let res = await mobileService.mobileBrand(name)
  res.map((e: { name: any; rank: any }) => {
    result.push({
      name: e.name,
      rank: e.rank,
    })
  })
  ctx.body = result
}

export default {
  getBrand,
}
