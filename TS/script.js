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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var url = 'https://api.thecatapi.com/v1/images/search';
console.log(url);
var button = document.querySelector('button');
var tableBody = document.querySelector('#table-body');
var Cat = /** @class */ (function () {
    function Cat(id, url, width, height) {
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
    }
    return Cat;
}());
var WebDisplay = /** @class */ (function () {
    function WebDisplay() {
    }
    WebDisplay.addData = function (data) {
        var cat = new Cat(data.id, data.url, data.width, data.height);
        var tableRow = document.createElement('tr');
        tableRow.innerHTML = "\n        <td>".concat(cat.id, "</td>\n        <td>\n            <img src=\"").concat(cat.url, "\" alt=\"\u55B5\">\n        </td>\n        <td>").concat(cat.width.toString(), "</td>\n        <td>").concat(cat.height.toString(), "</td>\n        <td>").concat(cat.url, "</td>\n        <td>\n            <a href=\"#\">X</a>\n        </td>\n        ");
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tableRow);
    };
    WebDisplay.deleteData = function (deleteButton) {
        var td = deleteButton.parentElement;
        var tr = td.parentElement;
        tr.remove();
    };
    return WebDisplay;
}());
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    console.log('response', response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log('response', json);
                    return [2 /*return*/, json];
            }
        });
    });
}
function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var json, data, error_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getJSON(url)];
                case 1:
                    json = _a.sent();
                    data = json[0];
                    WebDisplay.addData(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    message = void 0;
                    if (error_1 instanceof Error) {
                        message = error_1.message;
                    }
                    else {
                        message = String(error_1);
                    }
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', getData);
tableBody === null || tableBody === void 0 ? void 0 : tableBody.addEventListener('click', function (ev) {
    if (ev.target instanceof HTMLAnchorElement) {
        // 判断点击的是a才执行删除操作
        WebDisplay.deleteData(ev.target);
    }
});
