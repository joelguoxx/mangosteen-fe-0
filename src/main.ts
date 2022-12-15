import { createApp } from 'vue'
import { App } from './App'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'
import { createWebHashHistory, createRouter} from 'vue-router'


const routes = [
  { path: '/', component: Foo },
  { path: '/about', component: Bar },
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(router)
app.mount('#app')