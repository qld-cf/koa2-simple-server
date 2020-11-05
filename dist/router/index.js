"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const routerMount = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js' || file === 'index.js.map') {
            return;
        }
        ;
        const router = require(`./${file}/index.js`);
        app.use(router.routes()).use(router.allowedMethods());
    });
};
exports.default = routerMount;
//# sourceMappingURL=index.js.map