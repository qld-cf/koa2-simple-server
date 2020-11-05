"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContent = void 0;
const getContent = (code) => {
    let res;
    if (typeof code !== "string") {
        res = `${String(code)} Server is Running`;
    }
    else {
        res = `${code} Server is Running`;
    }
    return res;
};
exports.getContent = getContent;
//# sourceMappingURL=content.js.map