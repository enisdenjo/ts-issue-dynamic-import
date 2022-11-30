# Repro for [TypeScript issue #51696](https://github.com/microsoft/TypeScript/issues/51696)

This repository contains a reproduction of a regression introduced after [microsoft/TypeScript#49663](https://github.com/microsoft/TypeScript/pull/49663) has landed.

When wrapping the dynamic `import`, exporting the function directly and building for CommonJS, the built artifact will contain a `var _a` outside of the function's scope.

```ts
// brokenImportFn.ts
export async function brokenImportFn(path: string) {
  return import(path);
}

// brokenImportFn.js
"use strict";
var _a; // 👈 outside func scope
Object.defineProperty(exports, "__esModule", { value: true });
exports.brokenImportFn = void 0;
async function brokenImportFn(path) {
    return _a = path, Promise.resolve().then(() => require(_a));
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workingImportFn = void 0;
async function workingImportFn(path) {
    var _a; // 👈 inside func scope
    return _a = path, Promise.resolve().then(() => require(_a));
}
exports.workingImportFn = workingImportFn;
```

This variable outside the function's scope (1st approach with [brokenImportFn.ts](brokenImportFn.ts)) will cause problems when importing multiple modules in "parallel" (using `Promise.all` for example).

**Please check the [index.js](index.js) for exact details and repro.**

Also, I've set up a [CI](.github/workflows/ci.yml) to run - you can see [it failing in the Actions tab](https://github.com/enisdenjo/ts-issue-dynamic-import/actions).
