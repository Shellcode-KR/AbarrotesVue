<template>
    <div class="sidebar">
      <div class="sidebar-button" @click="navigateTo('usuarios')">
        <i class="fas fa-user"></i>
        <span>Usuarios</span>
      </div>
      <div class="sidebar-button" @click="navigateTo('productos')">
        <i class="fas fa-box"></i>
        <span>Productos</span>
      </div>
      <div class="sidebar-button" @click="navigateTo('ventas')">
        <i class="fas fa-dollar-sign"></i>
        <span>Ventas</span>
      </div>
      <div class="sidebar-button" @click="navigateTo('reportes')">
        <i class="fas fa-chart-bar"></i>
        <span>Reportes</span>
      </div>
      <div class="sidebar-button" @click="cerrarSesion()">
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar Sesión</span>
      </div>
    </div>
  </template>
  
  <script >
  export default {
    methods: {
      navigateTo(route) {
        // Implementa la lógica para navegar a la ruta correspondiente (por ejemplo, usando Vue Router).
        console.log(`Navegar a ${route}`);
      },
      cerrarSesion() {
        // Implementa la lógica para cerrar sesión.
        localStorage.setItem('varLogin', 'false');
        window.location.reload();
        console.log('Cerrar sesión...');
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    background-color: #333;
    color: white;
    width: 250px;
    padding: 20px;
  }
  
  .sidebar-button {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .sidebar-button i {
    font-size: 20px;
    margin-right: 10px;
  }
  </style>
  