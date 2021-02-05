"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var URL = __importStar(require("url"));
var cors = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var origin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                origin = URL.parse(ctx.get('origin') || ctx.get('referer') || '');
                // 允许来自所有域名请求
                ctx.set("Access-Control-Allow-Origin", origin.protocol + "//" + origin.host);
                // ctx.set("Access-Control-Allow-Origin", `*`);
                // 这样就能只允许 http://localhost:8080 这个域名的请求了
                // ctx.set("Access-Control-Allow-Origin", "http://localhost:9090");
                // 设置所允许的HTTP请求方法
                ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
                // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
                ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
                // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
                // Content-Type表示具体请求中的媒体类型信息
                ctx.set("Content-Type", "application/json;charset=utf-8");
                // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
                // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
                ctx.set("Access-Control-Allow-Credentials", 'true');
                // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
                // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
                // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
                ctx.set("Access-Control-Max-Age", '300');
                /*
                CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
                    Cache-Control、
                    Content-Language、
                    Content-Type、
                    Expires、
                    Last-Modified、
                    Pragma。
                */
                // 需要获取其他字段时，使用Access-Control-Expose-Headers，
                // getResponseHeader('myData')可以返回我们所需的值
                //https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
                ctx.set("Access-Control-Expose-Headers", "myData");
                if (!(ctx.method !== 'OPTIONS')) return [3 /*break*/, 2];
                // 如果请求类型为非预检请求，则进入下一个中间件（包括路由中间件等）
                return [4 /*yield*/, next()];
            case 1:
                // 如果请求类型为非预检请求，则进入下一个中间件（包括路由中间件等）
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                // 当为预检时，直接返回204,代表空响应体
                ctx.body = '';
                ctx.status = 204;
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = cors;
//# sourceMappingURL=cors.js.map