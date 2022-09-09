#!/usr/bin/env node

// eslint-disable-next-line node/shebang
import { execa } from "execa";
import { readPackage } from "read-pkg";
import { writePackage } from "write-pkg";
import sortPackageJson from "sort-package-json";
import { writeFile } from "node:fs/promises";

const run = async () => {
  console.log("=== npm-init-ex ===");
  await execa("npm", ["init", "-y"]);

  const packageJson = await readPackage({
    normalize: false,
  });

  const updatedPackageJson = sortPackageJson({
    ...packageJson,
    version: "0.0.0",
    license: "MIT",
    files: ["dist/"],
    main: "dist/index.js",
    bin: "dist/index.js",
    type: "module",
    engines: {
      node: ">16",
    },
  });

  await writePackage(updatedPackageJson);
  await writeFile(".npmrc", "save-exact=true");
  console.log("=== Done ===");
};

run();
