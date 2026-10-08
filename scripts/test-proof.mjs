import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";
const source = ts.transpileModule(
  await fs.readFile("src/lib/proof.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const { roofingProof, publishableProof } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
assert.equal(publishableProof(roofingProof), false);
for (const verificationStatus of ["pending", "verified"])
  for (const permissionToPublish of [false, true])
    assert.equal(
      publishableProof({
        ...roofingProof,
        verificationStatus,
        permissionToPublish,
      }),
      verificationStatus === "verified" && permissionToPublish,
    );
console.log(
  "Proof publication requires both verification and permission in all four combinations.",
);
