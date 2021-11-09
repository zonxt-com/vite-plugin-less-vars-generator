import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import lessVarsPlugin from "../../src";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // lessVarsPlugin({ lessPath: "./src/styles/var.less" }),
    lessVarsPlugin({ lessPath: path.join(__dirname, "src/styles/var.less") }),
  ],
});
