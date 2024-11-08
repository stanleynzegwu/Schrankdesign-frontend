// vite.config.js
import { defineConfig } from "file:///D:/G%20Dropbox/WORK/Schrankdesign/schrankdesign_frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/G%20Dropbox/WORK/Schrankdesign/schrankdesign_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///D:/G%20Dropbox/WORK/Schrankdesign/schrankdesign_frontend/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig(() => {
  return {
    // vite config
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "named",
          ref: true,
          svgo: false,
          titleProp: true
        },
        include: "**/*.svg"
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHIERyb3Bib3hcXFxcV09SS1xcXFxTY2hyYW5rZGVzaWduXFxcXHNjaHJhbmtkZXNpZ25fZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEcgRHJvcGJveFxcXFxXT1JLXFxcXFNjaHJhbmtkZXNpZ25cXFxcc2NocmFua2Rlc2lnbl9mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRyUyMERyb3Bib3gvV09SSy9TY2hyYW5rZGVzaWduL3NjaHJhbmtkZXNpZ25fZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIlxyXG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAvLyB2aXRlIGNvbmZpZ1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBzdmdyKHtcclxuICAgICAgICBzdmdyT3B0aW9uczoge1xyXG4gICAgICAgICAgZXhwb3J0VHlwZTogXCJuYW1lZFwiLFxyXG4gICAgICAgICAgcmVmOiB0cnVlLFxyXG4gICAgICAgICAgc3ZnbzogZmFsc2UsXHJcbiAgICAgICAgICB0aXRsZVByb3A6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmNsdWRlOiBcIioqLyouc3ZnXCIsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1csU0FBUyxvQkFBb0I7QUFDN1gsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUNoQyxTQUFPO0FBQUE7QUFBQSxJQUVMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxRQUNILGFBQWE7QUFBQSxVQUNYLFlBQVk7QUFBQSxVQUNaLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxVQUNOLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQSxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
