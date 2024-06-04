import { createServer } from "http";

const prosResponse = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1>Bienvenidos</h1>");
          break;
        case "/contacto":
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1>Contacto</h1>");
          break;

        default:
          res.statusCode = 404;
          res.end("<h1>Error 404 - Not Found</h1>");
          break;
      }
      break;

    default:
      break;
  }
};

const app = createServer(prosResponse);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
