"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingImportFn = void 0;
async function workingImportFn(path) {
    var _a;
    return _a = path, Promise.resolve().then(() => require(_a));
}
exports.workingImportFn = workingImportFn;
