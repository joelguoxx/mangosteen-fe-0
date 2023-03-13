
import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../layouts/MainLayout';
import { BackIcon } from '../shared/BackIcon';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon';
import { Rules, validate } from '../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
import { useRoute } from 'vue-router';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>标签不存在</div>
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon class={s.icon} />,
          default: () => <>
            <TagForm id={numberId} kind={route.query.kind?.toString()} />
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