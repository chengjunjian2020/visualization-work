import ts from "rollup-plugin-typescript2";
import path from "path";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import repacle from "rollup-plugin-replace";
import alias from "@rollup/plugin-alias";
const customResolver = resolve({
  extensions: [".mjs", ".js", ".jsx", ".json", ".sass", ".scss"],
});
const isDev = () => {
  return process.env.NODE_ENV === "development";
};
const override = { compilerOptions: { module: 'ESNext' } }

export default {
  input: "./src/index.ts",
  output: {
    file: path.resolve(__dirname, "./lib/index.js"),
    format: "esm",
    name:"gRender",
    sourcemap: true,
  },

  plugins: [
    alias({
      entries: [{ find: "/", replacement: path.resolve(__dirname, "../src") }],
      // customResolver,
    }),
    ts({ tsconfig: './tsconfig.json',tsconfigOverride: override  }),
    terser({
      compress: {
        drop_console: !isDev(),
      },
    }),
    repacle({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    resolve(),
    isDev() && livereload(),
    isDev() &&
      serve({
        open: true,
        openPage: "/public/index.html",
      }),
  ],
};
