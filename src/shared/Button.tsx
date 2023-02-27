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
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup: (props, context) => {
    return () => (
      <div >
        <button disabled={props.disabled} type={props.type} onClick={props.onClick} class={[s.button, s[props.level]]}>
          {context.slots.default?.()}
        </button>
      </div>
    )
  }
}) 