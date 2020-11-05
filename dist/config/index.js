"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dev_1 = require("./dev");
const prod_1 = require("./prod");
const getConfig = (type) => {
    let config;
    if (typeof (type) !== 'string') {
        type = String(type);
    }
    if (type === 'production') {
        config = prod_1.default;
    }
    if (type === 'development') {
        config = dev_1.default;
    }
    return config;
};
exports.default = getConfig;
//# sourceMappingURL=index.js.map