const http = require("http");
const fs = require("fs");
const path = require("path");

const validPaths = ["about.html", "contact-me.html", "index.html"];

function serveFile(filePath, res, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("500 Internal Server Error");
    }
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}

http
  .createServer((req, res) => {
    const reqPath = req.url === "/" ? "index.html" : `${req.url}.html`;
    const filePath = path.join(__dirname, reqPath);

    if (!validPaths.includes(path.basename(filePath))) {
      serveFile(path.join(__dirname, "404.html"), res, 404);
    } else {
      serveFile(filePath, res);
    }
  })
  .listen(8080, () =>
    console.log("Server running on: http://localhost:8080/}")
  );
