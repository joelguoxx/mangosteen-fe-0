import { defineComponent, PropType, ref, reactive, computed } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';

// 基于准备好的dom，初始化echarts实例
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')


    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type='select' options={[
          { value: 'expenses', text: '支出' },
          { value: 'income', text: '收入' }
        ]} v-model={category.value}
        />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  }
})