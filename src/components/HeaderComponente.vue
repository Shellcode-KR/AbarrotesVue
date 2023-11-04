<template>
    <header class="app-header">
      <div class="logo">
        <img src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-shopping-cart-png-image_5399025.jpg" alt="Logo de la Empresa">
      </div>
      <div class="info">
        <div class="top-info">
          <h2>PANEL DE ADMINISTRACION</h2>
        </div>
        <div class="bottom-info">
          <div class="info-row">
            <p>Sesión iniciada</p><p>Fecha y hora del sistema</p>
          </div>
          <div class="info-row">
            <p>Nombre: {{ nombreUsuario }}</p><p>{{ fecha }}</p>
          </div>
          <div class="info-row">
            <p>Rol: {{ rol }} </p><p>{{ hora }}</p>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        fechaHora: new Date().toLocaleString(),
        nombreUsuario: 'Nombre de Usuario',
        fecha: new Date().toLocaleDateString(),
        rol: 'Administrador',
        hora: new Date().toLocaleTimeString()
      };
    }
  };
  </script>
  
  <style scoped>
  .app-header {
    box-sizing: border-box;
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    background-color: #F9A95A;
    color: white;
  }
  .logo, .bottom-info{
    padding: 1rem;
  }
  .logo{
    box-sizing: border-box;
    width: 20%;
    height: 100%;
    background-color: #F9B572;
  }
  .logo img {
    width: 70%;
  }
  
  .info {
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
    height: 100%;
  }
  
  .top-info {
    text-align: center;
    height: 50%;

  }
  
  .top-info h2 {
    font-size: 2rem;
  }
  
  .bottom-info {
    height: 50%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: rgb(188, 188, 188);
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin-left: 3%;
  }

  .info-row p{
    display: inline-block;
    margin: 0;
    
  }
  </style>
  