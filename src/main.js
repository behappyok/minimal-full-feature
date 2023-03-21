/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-03-08 11:15:14
 * @LastEditTime : 2023-03-14 13:51:25
 * @FilePath     : \\my-vue-app\\src\\main.js
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
 import Antd from "ant-design-vue";
// import {Button} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createPinia } from "pinia";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import VXETablePluginAntd from "vxe-table-plugin-antd";
import "vxe-table-plugin-antd/dist/style.css";

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      redirect:'/hello-world' 
    },
    {
      path: "/hello-world",
      name: "HelloWorld",
      component: () => import("./views/HelloWorld.vue"),
    },
    {
      path: "/formily-example",
      name: "FormilyExample",
      component: () => import("./views/FormilyExample.vue"),
    },   
    
    {
      path: "/vxe-table-example",
      name: "VxeTableExample",
      component: () => import("./views/VxeTableExample.vue"),
    },
    {
      path: "/ant-example",
      name: "AntExample",
      component: () => import("./views/AntExample.vue"),
    },
    {
      path: "/echarts-example",
      name: "EchartExample",
      component: () => import("./views/EchartExample.vue"),
    },
    {
      path: "/echarts-example-extension",
      name: "EchartExampleExtension",
      component: () => import("./views/EchartExampleExtension.vue"),
    },
  ],
});
VXETable.use(VXETablePluginAntd);

const store = createPinia();
createApp(App)
 .use(Antd)
// .use(Button)
.use(VXETable).use(store).use(router).mount("#app");
