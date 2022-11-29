# Repro for TypeScript issue #\<number\>

This repository contains a reproduction of a regression introduced after [microsoft/TypeScript#49663](https://github.com/microsoft/TypeScript/pull/49663) has landed.

When wrapping the dynamic `import`, exporting the function directly and building for CommonJS, the built artifact will contain a `var _a` outside of the function's scope.

```ts
// brokenImportFn.ts
export async function brokenImportFn(path: string) {
  return import(path);
}

// brokenImportFn.js
("use strict");
var _a; // 👈
Object.defineProperty(exports, "__esModule", { value: true });
exports.brokenImportFn = void 0;
async function brokenImportFn(path) {
  return (_a = path), Promise.resolve().then(() => require(_a));
}
exports.brokenImportFn = brokenImportFn;
```

However, if the function wrapping the dynamic `import` is exported later, the variable will stay in the function's scope.

```ts
// workingImportFn.ts
async function workingImportFn(path: string) {
  return import(path);
}
export { workingImportFn };

// workingImportFn.js
("use strict");
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingImportFn = void 0;
async function workingImportFn(path) {
  var _a; // 👈
  return (_a = path), Promise.resolve().then(() => require(_a));
}
exports.workingImportFn = workingImportFn;
```

This variable outside the function's scope (1st approach with [brokenImportFn.ts](brokenImportFn.ts)) will cause problems when importing multiple modules in "parallel" (using `Promise.all` for example).

**Please check the [index.js](index.js) for exact details and repro.**
