import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// Configura Axios para que esté disponible globalmente
app.config.globalProperties.$axios = axios;

app.mount('#app');
