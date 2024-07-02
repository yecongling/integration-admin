import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      verbose: false,
      deleteOriginFile: true,
    }),
    viteMockServe({
      mockPath: "./mock/", //设置模拟数据的存储文件夹
      logger: true, // 是否在控制台显示请求日志
      localEnabled: false, //设置是否启用本地mock文件
      prodEnabled: false, // 设置打包是否启用mock功能
    }),
  ],
  build: {
    sourcemap: true,
    outDir: "integration",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom", "zustand"],
          antd: ["antd"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
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
