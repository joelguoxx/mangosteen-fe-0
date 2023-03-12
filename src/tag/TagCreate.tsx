import { defineComponent, PropType } from 'vue';
import s from './Tag.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { TagForm } from './TagForm';
import { BackIcon } from '../shared/BackIcon';

export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: () => <BackIcon class={s.icon} />,
          default: () => (
            <TagForm />
          )
        }}
      </MainLayout>
    )
  }
})