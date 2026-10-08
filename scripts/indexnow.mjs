// Run deliberately after deployment. IndexNow submission is never a build side effect.
const key = process.env.INDEXNOW_KEY;
if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key))
  throw new Error(
    "Configure a valid INDEXNOW_KEY (8-128 letters, digits or hyphens).",
  );
const host = "aurexbusinesslab.com";
const paths = process.argv.slice(2);
if (!paths.length)
  throw new Error(
    "Pass changed paths, for example: node --env-file=.env.local scripts/indexnow.mjs / /about",
  );
if (paths.some((p) => !p.startsWith("/") || p.startsWith("//")))
  throw new Error("Use local paths only.");
const result = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/indexnow-key.txt`,
    urlList: paths.map((p) => `https://${host}${p}`),
  }),
});
if (!result.ok) throw new Error(`IndexNow returned ${result.status}`);
console.log(
  `Submitted ${paths.length} URLs to IndexNow. Submission does not guarantee indexing.`,
);
