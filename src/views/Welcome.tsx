import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue';
import { RouterView, RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
import s from './Welcome.module.scss'
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
const pushmap: Record<string, string> = {
  'Welcome1': '/welcome/2',
  'Welcome2': '/welcome/3',
  'Welcome3': '/welcome/4',
  'Welcome4': '/start',
}

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction, swiping } = useSwipe(main, {
      beforeStart: e => e.preventDefault()
    })
    const route = useRoute()
    const router = useRouter()
    // 禁止后退用 replace 替换 push 
    const push = throttle(() => {
      const name = (route.name || 'Welcome1')?.toString()
      router.push(pushmap[name])

    }, 500)
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        push()
      }
    })
    return () => <div class={s.wrapper}>
      <header>
        <svg>
          <use xlinkHref='#mangosteen'></use>
        </svg>
        <h1>山竹记账</h1>
      </header>
      <main class={s.main} ref={main}>
        <RouterView name="main">
          {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
            <Transition
              enterFromClass={s.slide_fade_enter_from}
              enterActiveClass={s.slide_fade_enter_active}
              leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
              {X}
            </Transition>
          }
        </RouterView>
      </main>
      <footer>
        <RouterView name="footer" />
      </footer>
    </div>
  }
})