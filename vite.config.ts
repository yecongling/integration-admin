import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "./mock/",
      logger: true,
      localEnabled: true, // 开发环境开启
      prodEnabled: false, // 生产环境不启用
    }),
  ],
  build: {
    // sourcemap: true,
    outDir: "integration",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouterDom: ["react-router-dom"],
          mobx: ["mobx", "mobx-react-lite"],
          antd: ["antd"],
        },
      },
    },
  },
  // 配置路径别名解析
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        // 引入全局变量
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
  },
  // 服务器配置以及代理
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/integration",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
