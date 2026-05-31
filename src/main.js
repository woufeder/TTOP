import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
import './styles/base.css'
import './styles/animations.css'

createApp(App).use(router).mount('#app')
