import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import s from './InputPad.module.scss';
import { time } from '../../shared/time'
import { DatePicker, Popup } from 'vant';
import 'vant/lib/index.css';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const now = new Date()
    const refDate = ref<Date>(now)
    const minDate = ref(new Date(2021, 0, 1))
    const maxDate = ref(new Date(2025, 5, 1))
    const appendText = (n: number | string) => refAmount.value += n.toString()
    const buttons = [
      {
        text: '1', onClick: () => { appendText(1) }
      },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '删除', onClick: () => { refAmount.value = refAmount.value.substring(0, refAmount.value.length - 1) } },
      { text: '提交', onClick: () => { } },
    ]
    const refDatePickerVisble = ref(false)
    const showDatePicker = () => refDatePickerVisble.value = true
    const hideDatePicker = () => refDatePickerVisble.value = false
    const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
    const refAmount = ref('')
    return () => <>
      <div class={s.dateAndamount}>
        <span class={s.date}>
          <Icon name='date' class={s.icon} />
          <span>
            <span onClick={showDatePicker} >{time(refDate.value).format()}</span>
            <Popup position='bottom' v-model:show={refDatePickerVisble.value} >
              <DatePicker
                v-model={refDate.value}
                title="选择日期"
                min-date={minDate.value}
                max-date={maxDate.value}
                onConfirm={hideDatePicker}
                onCancel={hideDatePicker}
              />
            </Popup>
          </span>
        </span>
        <span class={s.amount}>{refAmount.value}</span>
      </div>
      <div class={s.buttons}>
        {buttons.map(button => <button onClick={button.onClick}>{button.text}</button>)}
      </div>
    </>
  }
})