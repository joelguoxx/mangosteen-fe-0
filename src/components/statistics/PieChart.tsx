import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
export const PieChart = defineComponent({
  setup: (props, context) => {
    const refPieDiv = ref<HTMLDivElement>()
    onMounted(() => {
      if (refPieDiv.value === undefined) { return }
      var myChart = echarts.init(refPieDiv.value);
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 0,
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      });
    })
    return () => (
      <div ref={refPieDiv} class={s.wrapper}></div>
    )
  }
})