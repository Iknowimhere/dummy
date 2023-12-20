const http = require("http");
const fs = require("fs");
const {parse}=require("querystring");

//routing
let server = http.createServer((req, res) => {
    //when form is submitted method is POST
  if (req.method === "POST") {
      //checking for headers
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      let body = "";
      //data event
      req.on("data", (chunk) => {
        body += chunk;
      });
      //end event
      req.on("end", () => {
        let parsedBody=parse(body)
        res.end(JSON.stringify(parsedBody));
      });
    } else {
      res.end("not a form data");
    }
    //default
  } else {
    if (req.url === "/" || req.url === "/home") {
      res.writeHead(200, "ok", { "content-type": "text/html" });
      let html = fs.createReadStream("./home.html", "utf-8");
      html.pipe(res);
    } else {
      res.end("page not found");
    }
  }
});

server.listen(5000, (err) => {
  if (err) console.log(err.message);
  console.log("Server is running on port 5000...");
});
