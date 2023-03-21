<!--
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-03-09 17:51:42
 * @LastEditTime : 2023-03-21 17:58:47
 * @FilePath     : \\my-vue-app\\src\\views\\EchartExampleExtension.vue
-->
<template>
  <div>   echarts封装用法
    <div id="chartRef" ref="chartRef" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script setup lang="ts">
import { EChartsOption } from 'echarts/types/dist/echarts';
import { onMounted, ref, reactive, Ref,defineProps, unref } from 'vue';
import { useECharts } from '../hooks/web/useECharts';
const dataSource = ref([]);
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
const loading = ref(false);

const option:EChartsOption = reactive({
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18,
      },
      axisLine: {
        lineStyle: {
          width: 18,
        },
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 15,
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10,
        },
      },
      title: {},
      detail: {
        valueAnimation: true,
        fontSize: 50,
        formatter: '{value}%',
        offsetCenter: [0, '80%'],
      },
      data: [
        {
          value: 70,
          name: '本地磁盘',
        },
      ],
    },
  ],
});

function initCharts() {
  //@ts-ignore
  option.series[0].data[0].name = echartData.value.name;
    //@ts-ignore
  option.series[0].data[0].value = echartData.value.restPPT;
  setOptions(option);
}
const echartData = ref({ name: "/", rest: 8551903232, restPPT: 77, max: 37688381440 })
onMounted(() => {
  //  echarts.use(GaugeChart);
  initCharts();
});
</script>
