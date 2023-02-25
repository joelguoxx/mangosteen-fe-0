import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import s from './LineChart.module.scss';
export const LineChart = defineComponent({
  setup: (props, context) => {
    const refLineDiv = ref<HTMLDivElement>()
    onMounted(() => {
      if (refLineDiv.value === undefined) { return }
      var myChart = echarts.init(refLineDiv.value);
      // 绘制图表
      myChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0 }
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      });
    })
    return () => (
      <div ref={refLineDiv} class={s.wrapper}></div>
    )
  }
})