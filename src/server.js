const http = require("http");
const app = require("./app");
const env = require("./config/env");

const port = env.PORT || process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;
