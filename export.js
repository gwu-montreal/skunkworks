// @ts-check
const { pathToFileURL } = require("url");
const puppeteer = require("puppeteer");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pathToFileURL("out/index.html").toString(), {
    waitUntil: "networkidle0"
  });

  await page.pdf({
    path: "out/zine.pdf",
    landscape: true,
    printBackground: true
  });

  await browser.close();

  console.log("done exporting to pdf.");
})();
