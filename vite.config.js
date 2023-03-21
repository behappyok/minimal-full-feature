/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-03-08 11:15:14
 * @LastEditTime : 2023-03-21 15:54:53
 * @FilePath     : \\my-vue-app\\vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from "rollup-plugin-visualizer";
import { Plugin as importToCDN, autoComplete } from "vite-plugin-cdn-import";
import externalGlobals from "rollup-plugin-external-globals";
// https://vitejs.dev/config/
import { resolve } from "path";

export default defineConfig({
  // resolve: {
  //   alias: [
  //     {
  //       find: /^~ant/,
  //       replacement: resolve("node_modules/ant"),
  //     },
  //   ],
  // },
  server: {
    // Listening on all local IPs
    host: true,
    https: false,
    port: 3101,
    // Load proxy configuration from .env
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: {
        //   "root-entry-name": "default",
        // },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // visualizer({
    //   filename: "./node_modules/.cache/visualizer/stats.html",
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
    importToCDN({
      modules: [
        {
          name: "lodash",
          var: "_",
          path: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js",
        },

        {
          name: "vue",
          var: "Vue",
          path: "https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.prod.js",
        },
        {
          name: "vue-demi",
          var: "VueDemi",
          path: "https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.js",
        },
        {
          name: "pinia",
          var: "Pinia",
          path: "https://cdn.jsdelivr.net/npm/pinia@2.0.33/dist/pinia.iife.js",
        },
        {
          name: "dayjs_plugin_customParseFormat",
          var: "dayjs_plugin_customParseFormat",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/customParseFormat.js",
        },
        {
          name: "dayjs_plugin_weekday",
          var: "dayjs_plugin_weekday",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/weekday.js",
        },
        {
          name: "dayjs_plugin_localeData",
          var: "dayjs_plugin_localeData",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/localeData.js",
        },
        {
          name: "dayjs_plugin_weekOfYear",
          var: "dayjs_plugin_weekOfYear",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/weekOfYear.js",
        },
        {
          name: "dayjs_plugin_weekYear",
          var: "dayjs_plugin_weekYear",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/weekYear.js",
        },
        {
          name: "dayjs_plugin_advancedFormat",
          var: "dayjs_plugin_advancedFormat",
          path: "https://cdn.jsdelivr.net/npm/dayjs/plugin/advancedFormat.js",
        },
        {
          name: "dayjs",
          var: "dayjs",
          path: "https://cdn.jsdelivr.net/npm/dayjs@1.11.7/dayjs.min.js",
        },
        {
          name: "ant-design-vue",
          var: "antd",
          path: "https://cdn.jsdelivr.net/npm/ant-design-vue/dist/antd.js",
          css: "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.15/dist/antd.min.css",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://cdn.jsdelivr.net/npm/vue-router@4.1.6/dist/vue-router.global.prod.js",
        },
        {
          name: "nprogress",
          var: "NProgress",
          path: `https://npm.elemecdn.com/nprogress@0.2.0/nprogress.js`,
          css: "https://npm.elemecdn.com/nprogress@0.2.0/nprogress.css",
        },
        {
          name: "xe-utils",
          var: "XEUtils",
          path: `https://cdn.jsdelivr.net/npm/xe-utils`,
        },
        {
          name: "vxe-table",
          var: "VXETable",
          path: `https://cdn.jsdelivr.net/npm/vxe-table@4.3.10/lib/index.umd.js`,
          css: "https://cdn.jsdelivr.net/npm/vxe-table@4.3.10/lib/style.css",
        },
        {
          name: "vxe-table",
          var: "VXETable",
          path: `https://cdn.jsdelivr.net/npm/vxe-table-plugin-antd@3.0.6/dist/index.umd.js`,
          css: "https://cdn.jsdelivr.net/npm/vxe-table-plugin-antd@3.0.6/dist/style.css",
        },
        {
          name: "xss",
          var: "filterXSS",
          //path: `https://rawgit.com/leizongmin/js-xss/master/dist/xss.js`,
          path: `https://cdn.jsdelivr.net/npm/xss@1.0.14/dist/xss.js`,
        },

        {
          name: "qs",
          var: "Qs",
          path: `https://cdn.jsdelivr.net/npm/qs@6.11.1/dist/qs.js`,
        },

        {
          name: "@vueuse/shared",
          var: "VueUse",
          path: "https://cdn.jsdelivr.net/npm/@vueuse/shared@9.13.0/index.iife.min.js",
        },
        {
          name: "@vueuse/core",
          var: "VueUse",
          path: "https://cdn.jsdelivr.net/npm/@vueuse/core@9.13.0/index.iife.min.js",
        },
        {
          name: "xlsx",
          var: "XLSX",
          path: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
        },
        {
          name: "axios",
          var: "axios",
          path: "https://cdn.jsdelivr.net/npm/axios@1.3.4/dist/axios.min.js",
        },
        {
          name: "crypto-js",
          var: "crypto-js",
          path: "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.js",
        },
        {
          name: "print-js",
          var: "printJS",
          path: "https://cdn.jsdelivr.net/npm/print-js@1.6.0/dist/print.js",
        },
        {
          name: "cropperjs",
          var: "Cropper",
          path: "https://cdn.jsdelivr.net/npm/cropperjs@1.5.13/dist/cropper.js",
        },

        {
          name: "qrcode",
          var: "QRCode",
          path: "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.js",
        },
        {
          name: "vue-i18n",
          var: "VueI18n",
          path: "https://cdn.jsdelivr.net/npm/vue-i18n@9.2.2/dist/vue-i18n.global.prod.js",
          // path: "https://cdn.jsdelivr.net/npm/vue-i18n@9.2.2/dist/vue-i18n.runtime.global.prod.js",
        },
        {
          name: "@ant-design/icons-vue",
          var: "AntDesignIconsVue",
          path: "https://cdn.jsdelivr.net/npm/@elonmuscle/ant-design-icons-vue/dist/ant-design-icons-vue.umd.js",
          // path: "https://cdn.jsdelivr.net/npm/vue-i18n@9.2.2/dist/vue-i18n.runtime.global.prod.js",
        },
        {
          name: "echarts",
          var: "echarts",
          path: `https://cdn.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js`,
        },
        // {
        //   name: "path-to-regexp",
        //   var: "Cropper",
        //   path: "https://cdn.jsdelivr.net/npm/path-to-regexp@6.2.1/dist/index.js",
        // },
        // {
        //   name: "@vue/shared",
        //   var: "VueShared",
        //   path: `https://npm.elemecdn.com/@elonmuscle/vue-shared@3.2.49/dist/vue-shared.umd.js`,
        // },
        {
          name: "is-plain-object",
          var: "isPlainObject",
          path: `https://npm.elemecdn.com/@elonmuscle/is-plain-object@5.0.1/dist/is-plain-object.umd.js`,
        },
        {
          name: "vue-types",
          var: "VueTypes",
          path: `https://npm.elemecdn.com/vue-types@5.0.2/dist/vue-types.umd.js`,
        },
        // {
        //   name: 'vuedraggable',
        //   var: 'dragger',
        //   path: `https://cdn.jsdelivr.net/npm/browse/vuedraggable@4.1.0/dist/vuedraggable.umd.min.js`,
        // }
      ],
    }),
  ],
  build: {
    // rollupOptions: {
    //   external: ["echarts/core"],
    //   plugins: [
    //     externalGlobals({
    //       "echarts/core": "echarts",
    //     }),
    //   ],
    // },
  },
});
