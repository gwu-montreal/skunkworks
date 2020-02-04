// @ts-check
const { createServer } = require("http");
const next = require("next");
const puppeteer = require("puppeteer");

const PORT = 3000;

const headless = !process.argv.includes("--show");

// @ts-ignore ok boomer
const app = next({ dev: !headless });

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const server = createServer(app.getRequestHandler()).listen(PORT);
  server.on("error", e => {
    throw e;
  });

  await Promise.all([
    new Promise(res => server.once("listening", res)),
    app.prepare()
  ]);

  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  if (!headless) {
    page.setDefaultNavigationTimeout(0);
  }

  page.on("load", () => {
    console.log("load");
  });

  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });

  // await page.goto(pathToFileURL("out/index.html").toString(), {
  //   waitUntil: "networkidle0"
  // });

  if (headless) {
    await page.pdf({
      path: "out/zine.pdf",
      landscape: true,
      printBackground: true
    });

    await browser.close();

    console.log("done exporting to pdf.");
  }
})();
