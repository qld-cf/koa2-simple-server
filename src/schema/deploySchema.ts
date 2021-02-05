import Joi from "joi"

const brandSchema = {
  query: {
    name: Joi.string().required(),
  },
}

export default {
  brandSchema,
}
