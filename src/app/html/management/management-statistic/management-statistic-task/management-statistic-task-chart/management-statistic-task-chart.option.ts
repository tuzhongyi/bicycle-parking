import * as echarts from 'echarts';
export const ManagementStatisticTaskChartOption = {
  series: [
    {
      type: 'gauge',
      radius: '70%',
      center: ['50%', '55%'],
      startAngle: -15,
      endAngle: -165,
      clockwise: false,
      progress: {
        show: true,
        overlap: false,
        roundCap: false,
        clip: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          color: [
            [
              1,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#3363F2', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#9B0FFF', // 100% 处的颜色
                },
              ]),
            ],
          ],
        },
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      detail: {
        show: false,
      },
      pointer: {
        show: false,
      },
      data: [],
    },
  ],
};
