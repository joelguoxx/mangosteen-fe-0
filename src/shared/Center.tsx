import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss';
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  setup: (props, context) => {
    const extraClass = props.direction
    return () => (
      <div class={[s.center, extraClass]}>
        {context.slots.default?.()}
      </div>
    )
  }
})