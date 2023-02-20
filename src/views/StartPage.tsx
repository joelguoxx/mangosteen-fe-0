import { defineComponent } from 'vue';
import s from './StartPage.module.scss';
import { Button } from '../shared/Button';
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/Icon';
import { OverlayMenu } from '../shared/Overlay';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {
          {
            title: () => '山竹记账',
            icon: () => <OverlayMenu />,
            default: () => <>
              <Center class={s.pig_wrapper}>
                <Icon name='pig' class={s.pig}></Icon>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to={'/items/create'}>
                  <Button class={s.button}>开始记账</Button></RouterLink>
              </div>
              <RouterLink to={'/items/create'}>
                <FloatButton iconName='add' />
              </RouterLink>
            </>
          }
        }
      </MainLayout>)
  }
})