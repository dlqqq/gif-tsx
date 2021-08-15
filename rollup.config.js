import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";

export default defineConfig([
  {
    input: "build/index.js",
    output: {
      file: "dist/index.js",
      format: "esm",
    },
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "dist/index.d.ts",
    },
    plugins: [dts()],
  },
]);
