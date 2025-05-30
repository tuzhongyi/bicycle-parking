import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';

export const ManagementStatisticEventRecordChartPieOption = {
  color: [
    ColorTool.warning.smoker,
    ColorTool.warning.charger,
    ColorTool.warning.spray,
  ],
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'pie',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      // adjust the start and end angle
      label: {
        alignTo: 'edge',
        formatter: '{value|{c} 起}\n{name|{b}}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 30,
        rich: {
          value: {
            fontSize: '18px',
            color: '#ffffff',
          },
          name: {
            fontSize: '14px',
            color: '#bdd3ff',
          },
        },
      },
      labelLayout: (params: any) => {},
      data: [
        { value: 1048, name: '火灾预警' },
        { value: 735, name: '充电桩预警' },
        { value: 580, name: '消防喷淋预警' },
      ],
    },
  ],
};
