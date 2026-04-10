const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "happy-man",
      script: "server.js",
      cwd: path.join(__dirname, ".next", "standalone"),
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3000,
      },
    },
  ],
};
