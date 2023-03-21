<template>
   echarts非封装简单用法
  <div id="main_charge" style="width: 100%;height: 400px;"></div>
</template>

<script lang="ts" setup> 
// @ts-nocheck
  import { onMounted } from 'vue';   
  import * as echarts from 'echarts';  

  const res = {
    taskOverview:
      [{ efficiency: 0.00, size: 2, elseSum: 2, name: "陶仙武", leader_id: "1631530733682569217", okCount: 0 }],
    taskSummary: { taskStaff: 1, taskIncomplete: 3, taskCompleted: 0, taskSize: 3, taskVehicle: 0, overdueSum: 0 }
  }

  type EChartsOption = echarts.EChartsOption;
  onMounted(() => {
 
      var chartDom = document.getElementById('main_charge');
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      let xAxisData = res.taskOverview.map((item) => {
        return item.name;
      });
      let seriesOkCount = res.taskOverview.map((item) => {
        return item.okCount;
      });
      let seriesElseSum = res.taskOverview.map((item) => {
        return item.elseSum;
      });

      option = {
        color: ['rgb(255,124,150)', 'rgb(71,166,254)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          right: '5%',
          orient: 'vertical',
          formatter: function (name) {
            let data = option.series;
            let tarValue = 0;

            for (let i = 0; i < data.length; i++) {
              if (data[i].name == name) {
                data[i].data.forEach((num) => {
                  tarValue += num;
                });
              }
            }
            let v = tarValue;
            return `${name}(${v})`;
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '未完成',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: seriesElseSum,
          },
          {
            name: '已完成',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: seriesOkCount,
          },
        ],
      };

      option && myChart.setOption(option);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
 
  });
</script>

 