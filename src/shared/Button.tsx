import { defineComponent, PropType } from 'vue';
import s from './Button.module.scss';

interface Props {
  onClick?: (e: MouseEvent) => void
}
export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    },
    level: {
      type: String as PropType<'important' | 'normal' | 'danger'>,
      default: 'default'
    }
  },
  setup: (props, context) => {
    return () => (
      <div >
        <button class={[s.button, s[props.level]]}>
          {context.slots.default?.()}
        </button>
      </div>
    )
  }
}) 