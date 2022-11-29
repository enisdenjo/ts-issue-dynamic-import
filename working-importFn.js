"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFn = void 0;
/** ✅ works */
async function importFn(path) {
    var _a;
    return _a = path, Promise.resolve().then(() => require(_a));
}
exports.importFn = importFn;
