import { computed, defineComponent, PropType, reactive } from 'vue';
import s from './Bars.module.scss';
export const Bars = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const data = reactive([
      { tag: { id: 1, name: '房租', sign: 'x' }, amount: 1500 },
      { tag: { id: 2, name: '水电', sign: 'x' }, amount: 200 },
      { tag: { id: 3, name: '娱乐', sign: 'x' }, amount: 500 },
    ])
    const betterData = computed(() => {
      const total = data.reduce((sum, item) => sum + item.amount, 0)
      return data.map(item => ({
        ...item,
        percent: Math.round(item.amount / total * 100) + '%'
      }))
    })
    return () => (
      <div class={s.wrapper}>
        {betterData.value.map(({ tag, amount, percent }) => {
          return (
            <div class={s.topItem}>
              <div class={s.sign}>
                {tag.sign}
              </div>
              <div class={s.bar_wrapper}>
                <div class={s.bar_text}>
                  <span>{tag.name}：{percent}</span>
                  <span>¥{amount}</span>
                </div>
                <div class={s.bar}>
                  <div class={s.bar_inner}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})