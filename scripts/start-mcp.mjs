import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED_DEPENDENCIES = [
  "@modelcontextprotocol/ext-apps",
  "@modelcontextprotocol/sdk",
  "@tldraw/assets",
  "@vitejs/plugin-react",
  "fractional-indexing",
  "react",
  "react-dom",
  "tldraw",
  "vite",
  "zod",
];

function dependencyDir(packageName) {
  return path.join(ROOT_DIR, "node_modules", ...packageName.split("/"));
}

function missingDependencies() {
  return REQUIRED_DEPENDENCIES.filter((packageName) => !existsSync(dependencyDir(packageName)));
}

const missing = missingDependencies();
if (missing.length > 0) {
  throw new Error(
    `Cowart dependencies are not installed: ${missing.join(", ")}. `
      + `Run \"npm ci\" manually in ${ROOT_DIR}, then restart Codex.`,
  );
}

process.chdir(ROOT_DIR);
await import(pathToFileURL(path.join(ROOT_DIR, "mcp", "server.mjs")).href);
