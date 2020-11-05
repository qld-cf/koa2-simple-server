"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_1 = require("../../controllers/example");
const Router = require("koa-router");
const router = new Router();
router.get('*', example_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map