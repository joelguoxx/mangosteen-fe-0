import { defineComponent, PropType, reactive, ref } from 'vue';
import s from './SignInPage.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/Icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
import { validate, hasError } from '../shared/validate';
import { http } from '../shared/Http';
import { useBool } from '../hooks/useBool';
import { useRoute, useRouter } from 'vue-router';
import { refreshMe } from '../shared/me';
import { BackIcon } from '../shared/BackIcon';

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
    const refValidationCode = ref()
    const { bool: refDisabled, toggle, on, off } = useBool(false)
    const router = useRouter()
    const route = useRoute()
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        name: [],
        sign: []
      })
      Object.assign(errors, validate(formData, [
        { key: 'email', type: 'required', message: '必填' },
        { key: 'email', type: 'pattern', regex: /.+@+/, message: '邮箱格式不正确' },
        { key: 'code', type: 'required', message: '必填' },
      ]))
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('/session', formData).catch(onError)
        localStorage.setItem('jwt', response.data.jwt)
        // router.push('/sign_in?return_to=' + encodeURIComponent(route.fullPath))
        const returnTo = route.query.return_to?.toString()
        // const returnTo = localStorage.getItem('returnTo')
        refreshMe()
        router.push(returnTo || '/')
      }
    }
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      on()
      const response = await http.post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(off)
      refValidationCode.value.startCount()

    }
    return () => (
      <MainLayout>{{
        title: () => '登录',
        icon: () => <BackIcon />,
        default: () => (
          <div class={s.wrapper}>
            <div class={s.logo}>
              <Icon name='mangosteen' class={s.icon} />
              <h1 class={s.appName}>山竹记账</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <FormItem label='邮箱地址' type='text' v-model={formData.email} error={errors.email?.[0] ?? '　'}
                placeholder='请输入邮箱,然后点击发送验证码' />
              <FormItem
                ref={refValidationCode}
                label='验证码' type='validationCode'
                v-model={formData.code}
                error={errors.code?.[0] ?? '　'}
                placeholder='请输入六位验证码'
                countForm={6}
                disabled={refDisabled.value}
                onClick={onClickSendValidationCode}
              />
              <FormItem class={s.signButton}>
                <Button type='submit' >登录</Button>
              </FormItem>
            </Form>
          </div>
        )
      }
      }</MainLayout>
    )
  }
})