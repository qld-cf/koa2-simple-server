import db from "../../model"

// 查询
const mobileBrand = async (name: any) => {
  return await db.MobileBrand.findAll({
    where: {
      name: name,
    },
  })
}

export default {
  mobileBrand,
}
