import * as echarts from 'echarts';
import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';
export const ManagementStatisticEventRecordChartLineOption = {
  color: [
    ColorTool.warning.smoker,
    ColorTool.warning.charger,
    ColorTool.warning.spray,
  ],
  tooltip: {
    trigger: 'axis',
  },
  background: 'transparent',
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: false,
    axisLabel: {
      color: '#bdd3ff',
    },
    data: [],
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      color: '#bdd3ff',
    },
    axisLine: {
      lineStyle: {
        color: '#7d8caf',
      },
    },
    splitNumber: 3,
    splitLine: {
      lineStyle: {
        color: '#7d8caf',
      },
    },
  },
  series: [
    {
      name: '火灾预警',
      type: 'line',
      stack: 'Total',
      smooth: true,
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ColorTool.warning.smoker,
          },
          {
            offset: 1,
            color: 'rgba(0, 0, 0, 0)',
          },
        ]),
      },
      data: [],
    },
    {
      name: '充电桩预警',
      type: 'line',
      stack: 'Total',
      showSymbol: false,
      smooth: true,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ColorTool.warning.charger,
          },
          {
            offset: 1,
            color: 'rgba(0, 0, 0, 0)',
          },
        ]),
      },
      data: [],
    },
    {
      name: '消防喷淋预警',
      type: 'line',
      stack: 'Total',
      showSymbol: false,
      smooth: true,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: ColorTool.warning.spray,
          },
          {
            offset: 1,
            color: 'rgba(0, 0, 0, 0)',
          },
        ]),
      },
      data: [],
    },
  ],
};
