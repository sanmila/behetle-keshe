import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneRoot = path.join(root, ".next", "standalone");
const standaloneNextRoot = path.join(standaloneRoot, ".next");

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true });
}

function replaceDir(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }

  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
}

ensureDir(standaloneNextRoot);
replaceDir(path.join(root, ".next", "static"), path.join(standaloneNextRoot, "static"));
replaceDir(path.join(root, "public"), path.join(standaloneRoot, "public"));

console.log("Standalone assets prepared.");
