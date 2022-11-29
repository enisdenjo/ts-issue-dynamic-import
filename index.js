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

// ✅
const { workingImportFn } = require("./workingImportFn");
test(workingImportFn)
  .then(() => {
    console.log("No problem with workingImportFn");
  })
  .catch((err) => {
    console.log("Problem with workingImportFn");
    console.error(err);
  });

// 🛑
const { brokenImportFn } = require("./brokenImportFn");
test(brokenImportFn)
  .then(() => {
    console.log("No problem with brokenImportFn");
  })
  .catch((err) => {
    console.log("Problem with brokenImportFn");
    console.error(err);
  });
