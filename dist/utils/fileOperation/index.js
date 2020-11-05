"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.writeFile = void 0;
const fs = require("fs");
const path = require("path");
/**
 * 写入文件工具,所有静态文件m默认存在static文件夹内
 * @param data 写入的内容
 * @param fileName 文件名称
 * @returns {string} 若写入成功则返回文件路径，否则返回undefined
 * @author chrislee
 * @Time 2020/4/11
 */
exports.writeFile = async (data, fileName) => {
    let fileAddr = ``;
    fileAddr = path.resolve(__dirname, `../../static/${fileName}`);
    return new Promise((resolve, reject) => {
        fs.writeFile(fileAddr, data, (err) => {
            if (err) {
                reject(undefined);
            }
            else {
                resolve(fileAddr);
            }
        });
    });
};
/**
 * 删除指定的文件名
 * @param fileName 文件名称
 * @returns {string} 若删除成功，返回文件名称，否则返回undefined
 * @author chrislee
 * @Time 2020/4/11
 */
exports.removeFile = async (fileName) => {
    let fileAddr = ``;
    fileAddr = path.resolve(__dirname, `../../static/${fileName}`);
    return new Promise((resolve, reject) => {
        fs.unlink(fileAddr, (err) => {
            if (err) {
                reject(undefined);
            }
            else {
                resolve(fileName);
            }
        });
    });
};
//# sourceMappingURL=index.js.map