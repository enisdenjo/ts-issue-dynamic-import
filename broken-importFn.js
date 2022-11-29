"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFn = void 0;
/** 🛑 doesn't work */
async function importFn(path) {
    return _a = path, Promise.resolve().then(() => require(_a));
}
exports.importFn = importFn;
