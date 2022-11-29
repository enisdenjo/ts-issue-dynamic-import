"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broken_importFn_1 = require("./broken-importFn");
// import { importFn } from "./working-importFn";
Promise.all(["idontexist-1", "idontexist-2"].map(async (name) => {
    try {
        await (0, broken_importFn_1.importFn)(name);
    }
    catch (err) {
        throw new Error(`Unable to import package ${name}: ${err.stack}`);
    }
})).catch((err) => {
    console.log(err);
    process.exit(1);
});
