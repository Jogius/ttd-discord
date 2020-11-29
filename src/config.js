const fs = require("fs");
const path = require("path");

let config = {};

const configFile = "config.ini";
console.log(`Loading configuration from ${configFile}...`)

try {
  const raw = fs.readFileSync(path.join(__dirname, "..", configFile), {encoding: "utf-8"});
  config = require("ini").decode(raw);
} catch (e) {
  throw new Error(`Error reading config file: ${e.message}`);
}

module.exports = config;
