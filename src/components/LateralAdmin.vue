<template>
  <div class="sidebar">
    <div class="sidebar-button" @click="navigateTo('listaUsuarios')">
      <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png " alt="">
      <i class="fas fa-user"></i>
      <span>Usuarios</span>
    </div>
    <div class="sidebar-button" @click="navigateTo('listaProductos')">
      <img src="https://cdn-icons-png.flaticon.com/512/1524/1524539.png " alt="">
      <i class="fas fa-box"></i>
      <span>Productos</span>
    </div>
    <div class="sidebar-button" @click="navigateTo('ventas')">
      <img src="https://cdn-icons-png.flaticon.com/512/8064/8064534.png" alt="">
      <i class="fas fa-dollar-sign"></i>
      <span>Ventas</span>
    </div>
    <div class="sidebar-button" @click="navigateTo('reportes')">
      <img src="https://cdn-icons-png.flaticon.com/128/1188/1188576.png" alt="">
      <i class="fas fa-chart-bar"></i>
      <span>Reportes</span>
    </div>
    <div class="sidebar-button" @click="cerrarSesion()">
      <img src="https://cdn-icons-png.flaticon.com/128/70/70226.png" alt="">
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
      localStorage.setItem('vista', route);
      window.location.reload();
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
  box-sizing: border-box;
  height: 75%;
  width: 20%;
  background-color: #F9B572;
  color: white;
}

.sidebar-button {
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  height: 18%;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 1rem;
}

.sidebar-button i {
  font-size: 20px;
  margin-right: 10px;
}
.sidebar-button img{
  height: 60%;
}
.sidebar-button:hover{
  background-color: aliceblue;
  color: black;
}
</style>
  