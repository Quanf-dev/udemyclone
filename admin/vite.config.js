import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(
            __dirname,
            "src/styles/variables.less"
          )}";`,
        },
      },
    },
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
