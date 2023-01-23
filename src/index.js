#!/usr/bin/env node

import { execa } from "execa";
import chalk from "chalk";
import { readPackage } from "read-pkg";
import { writePackage } from "write-pkg";
import sortPackageJson from "sort-package-json";
import { writeFile } from "node:fs/promises";

const packageJsonOptions = {
  version: "0.0.0",
  license: "MIT",
  files: ["dist/"],
  main: "dist/index.js",
  bin: "dist/index.js",
  type: "module",
  engines: {
    node: ">18",
  },
};

const run = async () => {
  await execa("npm", ["init", "-y"]);

  const packageJson = await readPackage({
    normalize: false,
  });

  const updatedPackageJson = sortPackageJson({
    ...packageJson,
    ...packageJsonOptions,
  });

  await writePackage(updatedPackageJson);
  await writeFile(".npmrc", "save-exact=true");

  console.log(chalk.blue.bold(" npm-init-ex"));
  console.log();
  console.log(`${chalk.cyan(" package.json")} created`);
  console.log(
    ` - ${chalk.dim("Version:")} ${chalk.bold(packageJsonOptions.version)}`
  );
  console.log(
    ` - ${chalk.dim("License:")} ${chalk.bold(packageJsonOptions.license)}`
  );
  console.log(
    ` - ${chalk.dim("Engine:")} ${chalk.bold(packageJsonOptions.engines.node)}`
  );
  console.log(
    ` - ${chalk.dim("Dist folder:")} ${chalk.bold(packageJsonOptions.files[0])}`
  );

  console.log();
  console.log(`${chalk.cyan(".npmrc")} created`);
};

run();
