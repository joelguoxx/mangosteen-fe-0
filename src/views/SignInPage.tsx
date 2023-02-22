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
            <Form onSubmit={onSubmit}>
              <FormItem label='邮箱地址' type='text' v-model={formData.email} error={errors.email?.[0] ?? '　'} />
              <FormItem label='验证码' type='validationCode' v-model={formData.code} error={errors.code?.[0] ?? '　'} />
              <FormItem>
                <Button>登录</Button>
              </FormItem>
            </Form>
          </div>
        )
      }
      }</MainLayout>
    )
  }
})