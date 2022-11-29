export async function brokenImportFn(path: string) {
  return import(path);
}
