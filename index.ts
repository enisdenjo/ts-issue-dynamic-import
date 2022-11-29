import { importFn } from "./broken-importFn";
// import { importFn } from "./working-importFn";

Promise.all(
  ["idontexist-1", "idontexist-2"].map(async (name) => {
    try {
      await importFn(name);
    } catch (err) {
      throw new Error(`Unable to import package ${name}: ${err.stack}`);
    }
  })
).catch((err) => {
  console.log(err);
  process.exit(1);
});
