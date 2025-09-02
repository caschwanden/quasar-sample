const http = require("http");
const app = require("./app.js");
const logger = require("./src/middleware/logger/winston_logger.js");

let webServer;

if (process.env.NODE_ENV === "production") {
  // do something for production
  webServer = http.createServer(app);
} else {
  // do something for development
  webServer = http.createServer(app);
}

webServer.listen(process.env.PORT || 3000, () => {
  logger.info(`Server running on port ${process.env.PORT || 3000}`);
});
module.exports = app;
