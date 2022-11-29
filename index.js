function test(importFn) {
  return Promise.all(
    ["idontexist-1", "idontexist-2"].map(async (name) => {
      try {
        await importFn(name);
      } catch (err) {
        if (!err.message.includes(name)) {
          throw `Error message unrelated to import of "${name}", got: "${err.message}"`;
        }
      }
    })
  );
}

(async () => {
  // ✅
  const { workingImportFn } = require("./workingImportFn");
  await test(workingImportFn);
  console.log("No problem with workingImportFn");

  // 🛑
  const { brokenImportFn } = require("./brokenImportFn");
  await test(brokenImportFn);
  console.log("No problem with brokenImportFn");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
