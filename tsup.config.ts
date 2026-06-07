import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/base64.ts", "src/run_length.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  target: "node18",
  clean: true,
});
