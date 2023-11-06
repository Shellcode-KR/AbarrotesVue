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
  
  <script>
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
    height: 50%;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #F9A95A;
    color: white;
  }
  
  .logo{
    width: 20%;
  }
  .logo img {
    max-width: 100%;
    height: auto;
  }
  
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  
  .top-info {
    text-align: center;
    margin-bottom: 5%;
  }
  
  .top-info h2 {
    font-size: 2.5rem;
    margin: 0;
  }
  
  .bottom-info {
    display: flex;
    flex-direction: column;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin-left: 3%;
  }

  .info-row p{
    display: inline-block;
    
  }
  </style>
  