import { createApp } from 'vue'
import App from './App.vue'
import ViviFormBuilder from "./builder/App.ts"

createApp(App).use(ViviFormBuilder).mount('#app')
