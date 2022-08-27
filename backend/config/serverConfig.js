const port = process.env.PORT || 5000;
const ServerConfig = {
  port: port,
  serverRunningMsg: `Server is running on port: ${port}`
}

module.exports = ServerConfig;