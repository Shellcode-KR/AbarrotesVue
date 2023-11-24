import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

const app = createApp(App);
app.use(router).mount('#app');
// Configura Axios para que esté disponible globalmente
app.config.globalProperties.$axios = axios;

