"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis_db1 = exports.default_redis = void 0;
var redisConnection_1 = __importDefault(require("./redisConnection"));
var dbConfig = require("../../config");
var env = process.env.NODE_ENV;
var redisConfig = {
    port: dbConfig.redis.port_redis,
    host: dbConfig.redis.host_redis,
};
var RedisTool = /** @class */ (function () {
    function RedisTool(opt) {
        this.redis = null;
        if (opt) {
            this.config = Object.assign(redisConfig, opt);
        }
        else {
            this.config = redisConfig;
        }
        // this.connToRedis()
        this.connToRedis()
            .then(function (res) {
            if (res) {
                console.log("redis connet success");
            }
        })
            .catch(function (e) {
            console.error("The Redis Can not Connect:" + e);
        });
    }
    /**连接redis */
    RedisTool.prototype.connToRedis = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.redis) {
                resolve(true); //已创建
            }
            else {
                redisConnection_1.default(_this.config)
                    .then(function (resp) {
                    _this.redis = resp;
                    resolve(true);
                })
                    .catch(function (err) {
                    reject(err);
                });
            }
        });
    };
    /**存储string类型的key-value */
    RedisTool.prototype.setString = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var val, k, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        val = typeof value !== "string" ? JSON.stringify(value) : value;
                        k = typeof value !== "string" ? JSON.stringify(key) : key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.set(k, val)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**获取string类型的key-value */
    RedisTool.prototype.getString = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var id, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = typeof key !== "string" ? JSON.stringify(key) : key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.get(id)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**删除string类型的key-value */
    RedisTool.prototype.delString = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var id, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = typeof key !== "string" ? JSON.stringify(key) : key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.del(id)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**获取当前数据库key的数量 */
    RedisTool.prototype.getDbSize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.redis.dbsize()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedisTool;
}());
exports.default_redis = new RedisTool();
exports.redis_db1 = new RedisTool({ db: 1 });
// export const redis_db2 = new RedisTool({db:2})
// export const redis_db3 = new RedisTool({db:3})
// export const redis_db4 = new RedisTool({db:4})
exports.default = exports.default_redis;
//# sourceMappingURL=redisOperate.js.map