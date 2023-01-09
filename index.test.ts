import path from "node:path";
import { readFile } from "node:fs/promises";
import { expect, test } from "vitest";
import { execa } from "execa";
import { temporaryDirectory } from "tempy";
import { readPackage } from "read-pkg";

test("npm-init-ex", async () => {
  const directory = temporaryDirectory({ prefix: "hello-world" });
  const { stdout } = await execa("npm-init-ex", [], {
    cwd: directory,
  });

  const packageJson = await readPackage({
    cwd: directory,
    normalize: false,
  });
  const npmrc = await readFile(path.join(directory, ".npmrc"));
  expect(npmrc.toString()).toEqual("save-exact=true");

  // Since the directory name will be different each time, we only assert the prefix part
  expect(packageJson.name?.includes("hello-world")).toBeTruthy();

  expect(packageJson.version).toEqual("0.0.0");
  expect(packageJson.license).toEqual("MIT");
  expect(packageJson.files).toEqual(["dist/"]);
  expect(packageJson.main).toEqual("dist/index.js");
  expect(packageJson.bin).toEqual("dist/index.js");
  expect(packageJson.type).toEqual("module");
  expect(packageJson.engines).toEqual({
    node: ">16",
  });

  expect(stdout).toMatchSnapshot();
});
