import { execa } from "execa";
import { readPackage } from "read-pkg";
import { writePackage } from "write-pkg";

const run = async () => {
  await execa("npm", ["init", "-y"]);
  const packageJson = await readPackage({ normalize: false });
  const updatedPackageJson = {
    ...packageJson,
    version: "0.0.0",
    license: "MIT",
    files: ["dist/"],
    main: "dist/index.js",
    bin: "dist/index.js",
    engines: {
      node: ">16",
    },
  };
  writePackage(updatedPackageJson);
};

run();
