<!--
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-21 17:21:34
 * @LastEditTime : 2023-03-21 17:43:18
 * @FilePath     : \\my-vue-app\\src\\views\\VxeTableExample.vue
-->
<!--
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-14 12:16:09
 * @LastEditTime : 2023-03-14 13:33:26
 * @FilePath     : \\my-vue-app\\src\\views\\AntExample.vue
-->
<template>
  <vxe-grid ref="tableRef" v-bind="gridOptions">>
    <template #name_item="{ data }">
      <vxe-input v-model="data.name" type="text" placeholder="请输入名称" />
    </template>
    <template #operate_item>
      <vxe-button type="submit" status="primary" content="查询" />
      <vxe-button type="reset" content="重置" />
    </template>
    <template #filter="{ $panel, column }">
      <a-input type="type" v-for="(option, index) in column.filters" :key="index" v-model:value="option.data"
        @input="$panel.changeOption($event, !!option.data, option)"></a-input>
    </template>
  </vxe-grid>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { VxeGridProps, VxeGridPropTypes } from 'vxe-table';
import defHttp from '../utils/defHttp'


const tableRef = ref();
const columns : VxeGridPropTypes.Columns= [
  { type: 'checkbox', title: '', width: 60 },
  {
    title: '姓名',
    align: 'left',
    field: 'userName',
    width: '20%',
  },
  {
    title: '联系方式',
    align: 'left',
    field: 'mobile',
  },
  {
    title: '邮箱',
    align: 'left',
    field: 'email',
  },
];
const gridOptions = reactive<VxeGridProps>({
  columns,
  border: true,
  showHeaderOverflow: true,
  showOverflow: true,
  keepSource: true,
  id: 'full_edit_1',
  height: 600,
  // height: 'auto',
  rowConfig: {
    keyField: 'id',
    isHover: true,
  },
  columnConfig: {
    resizable: true,
  },
  filterConfig: {
    remote: true,
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      {
        field: 'name',
        title: '姓名:',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入名称' } },
      },
      {
        field: 'email',
        title: '邮件:',
        span: 6,

        itemRender: { name: '$input', props: { placeholder: '请输入邮件' } },
      },
      {
        field: 'mobile',
        title: '手机号:',
        span: 6,
        itemRender: { name: '$input', props: { placeholder: '请输入手机号' } },
      },
      {
        span: 6,
        align: 'center',
        itemRender: {
          name: '$buttons',
          children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }],
        },
      },
    ],
  },
  editRules: {
    name: [{ min: 1, max: 5, message: '名称长度在 3 到 5 个字符' }],
  },
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showStatus: true,
  },
  pagerConfig: {
    enabled: false,
  },
  checkboxConfig: {
    // labelField: 'id',
    reserve: true,
    highlight: true,
    range: true,
  },
  proxyConfig: {
    form: true,
    ajax: {
      query: async ({ page, form }) => {
        const data = await defHttp.request({
          url: '/pms-portal/web/personnel/querySysUserInfoList',
          params: {
            ...form,
            current: 1,
            size: 10000,
          }
        });
        return data['records'];
      },
    },
  },
});



</script>
