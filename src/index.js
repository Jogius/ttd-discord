// Verify NodeJS version
const nodeVersion = parseInt(process.versions.node.split(".")[0], 10);
if (nodeVersion < 12) {
  console.error("Unsupported NodeJS version! Please install Node.js 12, 13 or 14.");
  process.exit(1);
}

// Check if node modules are installed
const fs = require("fs");
const path = require("path");

try {
  fs.accessSync(path.join(__dirname, "..", "node_modules"));
} catch (e) {
  console.error("Please run \"npm ci\" before starting the bot.");
  process.exit(1);
}

let testedPackage = ""
try {
  const packageJson = require(path.join(__dirname, "..", "package.json"));
  const modules = Object.keys(packageJson.dependencies);
  modules.forEach((mod) => {
    testedPackage = mod;
    fs.accessSync(path.join(__dirname, "..", "node_modules", mod));
  });
} catch (e) {
  console.error(`Please run "npm ci" again! Package "${testedPackage}" is missing.`);
}


const config = require("./config");
const main = require("./main");

main.start();
