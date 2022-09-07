import { test } from "vitest";
import { execa } from "execa";
import fs from "node:fs";
import { createFixture } from "fs-fixture";

test("1", async () => {
  const mockPackageJson = {
    name: "hello",
    version: "1.0.0",
  };
  const fixture = await createFixture({
    // Directory path syntax - Same as above
    testDirectory: "fileContent",
  });

  console.log(fixture.path);
  await fixture.writeJson("./foo", mockPackageJson);
  const foo = await fixture.readFile("./foo");
  execa("npm-init-ex", [fixture.path]);
  console.log("file: test.ts ~ line 18 ~ test ~ foo", foo.toString());

  await fixture.rm();
});
