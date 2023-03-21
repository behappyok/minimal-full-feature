<!--
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-08 11:15:14
 * @LastEditTime : 2023-03-21 18:00:08
 * @FilePath     : \\my-vue-app\\src\\App.vue
-->
<script setup lang="ts">
// import EchartExampleExtension from './components/EchartExampleExtension.vue'
 
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import axios from 'axios';
import * as xlsx from 'xlsx';
import type { WorkBook } from 'xlsx';
import { onMounted, ref } from 'vue';
 
// import { onKeyStroke, useDebounceFn } from '@vueuse/core';
import { useDebounceFn } from '@vueuse/shared';
import Cropper from 'cropperjs';
import { pathToRegexp } from 'path-to-regexp';
import { toCanvas } from 'qrcode';
import { createI18n } from 'vue-i18n';
import { SearchOutlined } from '@ant-design/icons-vue';
 
const { utils, writeFile } = xlsx;
// const handleEnter=(e)=>{
//   console.log(useDebounceFn)
// }
dayjs.locale('zh-cn');
// const c = encrypt("cipherText", "this.key").toString();
  // enter search

</script>

<template>
  <a-config-provider :locale="zhCN">
    <SearchOutlined/>
    <div class="router-links">
      <router-link :to="{name:'Home'}">Home</router-link> 
      <router-link :to="{name:'FormilyExample'}">Formily表单示例</router-link> 
      <router-link :to="{name:'VxeTableExample'}">vxe-table示例</router-link> 
      <router-link :to="{path:'/echarts-example'}">Echarts示例</router-link> 
    </div>
    <router-view/>
    <!-- <EchartExampleExtension :data="echartData" /> 
    <EchartExample />
    <HelloWorld msg="module by cdn" />-->
    
  </a-config-provider>
</template>

<style scoped>
.router-links :deep a{
  padding: 0 12px;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
