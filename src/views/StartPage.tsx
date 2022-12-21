import { defineComponent } from 'vue';
import s from './StartPage.module.scss';
import { Button } from '../shared/Button';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi')
    }
    return () => (
      <div>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>测试</Button>
        </div>
      </div>
    )
  }
})