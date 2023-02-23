import { defineComponent, PropType, reactive } from 'vue';
import s from './SignInPage.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
import { validate } from '../shared/validate';

export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: '',
    })
    const errors = reactive<{ [key in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@+/, message: '邮箱格式不正确' },
        { key: 'code', type: 'required', message: '必填' },
      ]))
    }
    return () => (
      <MainLayout>{{
        title: () => '登录',
        icon: () => <Icon name='left' />,
        default: () => (
          <div class={s.wrapper}>
            <div class={s.logo}>
              <Icon name='mangosteen' class={s.icon} />
              <h1 class={s.appName}>山竹记账</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <FormItem label='邮箱地址' type='text' v-model={formData.email} error={errors.email?.[0] ?? '　'}
                placeholder='请输入邮箱,然后点击发送验证码' />
              <FormItem label='验证码' type='validationCode' v-model={formData.code} error={errors.code?.[0] ?? '　'}
                placeholder='请输入六位验证码'
              />
              <FormItem class={s.signButton}>
                <Button >登录</Button>
              </FormItem>
            </Form>
          </div>
        )
      }
      }</MainLayout>
    )
  }
})