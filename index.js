const http = require("http");
const fs = require("fs");

console.log(`Server running on: http://localhost:8080/}`);
const validPaths = ["./about.html", "./contact-me.html", "./index.html"];

http
  .createServer((req, res) => {
    // Construct the file path from the provided url pathname
    let path = `.${req.url}.html`;

    // If no pathname is provided then make the pathname the index.html file
    if (req.url === "/") {
      path = `./index.html`;
    }

    // If the pathname provided isn't within the validPaths display the 404 page
    if (!validPaths.includes(path)) {
      fs.readFile("./404.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        }
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }

    // If the pathname provided is within the validPaths display the page
    if (validPaths.includes(path)) {
      fs.readFile(path, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
