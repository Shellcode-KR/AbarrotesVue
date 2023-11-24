<template>
  <div class="login-container">
    <div class="left-section">
      <img src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-shopping-cart-png-image_5399025.jpg"
        alt="Carrito de Compras">
    </div>
    <div class="right-section">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="iniciarSesion">
        <div class="form-group">
          <label for="usuario">Usuario:</label>
          <input type="text" v-model="usuario" required>
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input type="password" v-model="contrasena" required>
        </div>
        <button type="submit" >Iniciar Sesión</button>
      </form>
      <p><a :href="'#'">¿Olvidaste la contraseña?</a></p>
    </div>
  </div>
</template>
  
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import axios from 'axios';

export default defineComponent({
  name: 'LoginForm',
  data() {
    return {
      usuario: '',
      contrasena: '',
      olvidarContrasenaLink: 'olvidar-contrasena.html'
    };
  },
  methods: {
    
    async iniciarSesion() {
      const router = this.$router;

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.usuario,
          password: this.contrasena
        });

        const { token } = response.data;
        localStorage.setItem('varLogin', 'true');
        localStorage.setItem('token', token);

        // Redirige al usuario a la ruta 'paneladmin'
       
        router.push({ name: 'adminventas' });
      } catch (error) {
        alert('Error en el inicio de sesión. Verifica tus credenciales.');
        console.error('Error en el inicio de sesión:', error);
      }
    }
  }
});
</script>

  
<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

.login-container {
  padding: 0;
  margin: 0 12.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


.left-section {
  flex: 1;
  padding: 20px;
  text-align: center;
}

.left-section img {
  max-width: 100%;
}

.right-section {
  flex: 1;
  background-color: D9D9D9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
}

.form-group {
  margin: 10px 0;
}

.form-group:nth-child(2) {
  margin-bottom: 2rem;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #f08922;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #FAB16A;
}

a {
  text-decoration: none;
  color: red;
}

a:hover {
  text-decoration: underline;
}

p {
  text-align: left;
  margin: 0;
}
</style>
  