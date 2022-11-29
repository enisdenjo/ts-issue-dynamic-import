/** ✅ works */
async function importFn(path: string) {
  return import(path);
}
export { importFn };
