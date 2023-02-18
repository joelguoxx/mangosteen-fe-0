
import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../shared/Button';
import { EmojiSelects } from '../shared/EmojiSelect';
import { Icon } from '../shared/Icon';
import { Rules, validate } from '../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const errors = reactive<{ [key in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      e.preventDefault
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' }
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
    }
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <Icon name='left' class={s.icon} onClick={() => { }} />,
          default: () => <>
            <TagForm />
            <div class={s.actions}>
              <Button level='danger' class={s.removeTags}>删除标签</Button>
              <Button level='danger' class={s.removeTagsAndItems}>删除标签和记账</Button>
            </div>
          </>
        }}
      </MainLayout>
    )
  }
})