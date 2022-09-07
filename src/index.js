import { execa } from "execa";
import { readPackage } from "read-pkg";
import { writePackage } from "write-pkg";
import sortPackageJson from "sort-package-json";

const run = async () => {
  await execa("npm", ["init", "-y"]);
  const packageJson = await readPackage({ normalize: false });
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
  writePackage(updatedPackageJson);
};

run();
