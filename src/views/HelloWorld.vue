<!--
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-08 11:15:14
 * @LastEditTime : 2023-03-21 17:22:18
 * @FilePath     : \\my-vue-app\\src\\views\\HelloWorld.vue
-->
<script setup>
import { ref,watch } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import xss from 'xss';
import draggable from 'vuedraggable';
import qs from 'qs'
 
const tableData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])
defineProps({
  msg: String,
})
 
const enabled =ref('true')
const count = ref('1234')
watch(() => count.value, (v) => {
  const html = xss(v);
  console.log(html);
})

const checkMove=(e) =>{
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    }
</script>

<template>
  draggable
  <draggable
      :list="tableData"
      :disabled="!enabled"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
          {{ element.name }}
        </div>
      </template>
</draggable>
  <div>
    <a-button >33</a-button>
      
    <a-input v-model:value="count"></a-input>
    <a-space direction="vertical" :size="12">
      <a-date-picker v-model:value="value1" :locale="locale" />
      <a-date-picker v-model:value="value2" picker="week" />
      <a-date-picker v-model:value="value3" picker="month" />
      <a-date-picker v-model:value="value4" picker="quarter" />
      <a-date-picker v-model:value="value5" picker="year" />
    </a-space>
    <h1>{{ msg }}</h1>



  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
