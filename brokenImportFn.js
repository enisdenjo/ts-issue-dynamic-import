"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.brokenImportFn = void 0;
async function brokenImportFn(path) {
    return _a = path, Promise.resolve().then(() => require(_a));
}
exports.brokenImportFn = brokenImportFn;
