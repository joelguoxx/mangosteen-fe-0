import { Overlay } from 'vant';
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Form, FormItem } from '../shared/Form';
import { OverlayMenu } from '../shared/Overlay';
import { Tab, Tabs } from '../shared/Tabs';
import { Time } from '../shared/time';
import { MainLayout } from './MainLayout';
import s from './TimeTabsLayout.module.scss';
const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    }
  }
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    }
  },
  setup: (props, context) => {
    const refSelected = ref('本月')
    const time = new Time()
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const timeList = [
      {
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth(),
      },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').firstDayOfMonth()
      },
      {
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear()
      }
    ]
    const refOverlayVisble = ref(false)
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refOverlayVisble.value = false
    }
    const onSelect = (value: string) => {
      if (value === '自定义时间') {
        refOverlayVisble.value = true
      }
    }
    return () => (
      <MainLayout>{{
        title: () => '山竹记账',
        icon: () => <OverlayMenu />,
        default: () => <>
          <Tabs class={s.xxx} classPrefix={'customTabs'} v-model:selected={refSelected.value}
            onUpdate:selected={onSelect}>
            <Tab name='本月'>
              <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
            </Tab>
            <Tab name='上月'>
              <props.component
                startDate={timeList[1].start.format()}
                endDate={timeList[1].end.format()}
              />
            </Tab>
            <Tab name='今年'>
              <props.component
                startDate={timeList[2].start.format()}
                endDate={timeList[2].end.format()}
              />
            </Tab>
            <Tab name='自定义时间'>
              <props.component
                startDate={customTime.start}
                endDate={customTime.end}
              />
            </Tab>
          </Tabs>
          <Overlay show={refOverlayVisble.value} class={s.overlay}>
            <div class={s.overlay_inner}>
              <header>
                请选择自定义时间：
              </header>
              <main>
                <Form onSubmit={onSubmitCustomTime}>
                  <FormItem label='开始时间' v-model={customTime.start} type='date' />
                  <FormItem label='结束时间' v-model={customTime.end} type='date' />

                  <FormItem>
                    <div class={s.actions}>
                      <button type='button' onClick={() => refOverlayVisble.value = false}>取消</button>
                      <button type='submit'>确认</button>
                    </div>
                  </FormItem>
                </Form>
              </main>
            </div  >
          </Overlay>
        </>
      }
      }</MainLayout>
    )
  }
})