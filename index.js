/**
 * Tries importing two non-existing packages by name in "parallel" using the provided
 * import function.
 *
 * Since neither package exists, both import attempts will fail.
 *
 * We expect the error message from the import function to contain the name of the
 * importing package, for example: "Cannot find module 'idontexist-1'".
 */
function test(importFn) {
  return Promise.all(
    ["idontexist-1", "idontexist-2"].map(async (name) => {
      try {
        await importFn(name);
      } catch (err) {
        if (!err.message.includes(name)) {
          throw `Error message unrelated to import of ${name}, got: ${err.message}`;
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
