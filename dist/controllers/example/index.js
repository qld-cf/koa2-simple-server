"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("../../services/example/content");
const index = async (ctx, next) => {
    ctx.body = content_1.getContent('koa');
    await next();
};
exports.default = index;
//# sourceMappingURL=index.js.map