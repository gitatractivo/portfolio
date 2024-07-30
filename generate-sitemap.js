import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Your website URL
const hostname = "https://gitanshutalwar.com";
const currentDate = new Date().toISOString();

// Create a stream to write to
const stream = new SitemapStream({ hostname });

// Return a promise that resolves with your XML string
const sitemap = streamToPromise(
  Readable.from([
    { url: "/", changefreq: "daily", priority: 1.0, lastmod: currentDate },
  ]).pipe(stream)
).then((data) => data.toString());

// Write the sitemap to a file
sitemap.then((xmlString) => {
  fs.writeFileSync(path.join(__dirname, "dist", "sitemap.xml"), xmlString);
  console.log("Sitemap generated!");
});
