<template>
  <div class="sidebar">
    <router-link class="link"   :to="{ name: 'adminlistaUsuarios' }">
      <div class="sidebar-button">
        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png " alt="">
        
        <h3>Usuarios</h3>
      </div>
    </router-link>

    <router-link class="link" :to="{ name: 'adminlistaProductos' }">
      <div class="sidebar-button">
        <img src="https://cdn-icons-png.flaticon.com/512/1524/1524539.png " alt="">
        <h3>Productos</h3>
      </div>
    </router-link>

    <router-link class="link" :to="{ name: 'adminventas' }">
      <div class="sidebar-button">
        <img src="https://cdn-icons-png.flaticon.com/512/8064/8064534.png" alt="">
        <h3>Ventas</h3>
      </div>
    </router-link>

    <router-link class="link" :to="{ name: 'listaProveedores' }">
      <div class="sidebar-button">
        <img src="https://cdn-icons-png.flaticon.com/512/1524/1524539.png " alt="">
        <h3>Proveedores</h3>
      </div>
    </router-link>


    <div class="sidebar-button">
      <img src="https://cdn-icons-png.flaticon.com/128/1188/1188576.png" alt="">
      <h3>Reportes</h3>
    </div>
    <div class="sidebar-button" @click="cerrarSesion()">
      <img src="https://cdn-icons-png.flaticon.com/128/70/70226.png" alt="">
      
      <h3>Cerrar Sesión</h3>
    </div>
  </div>
</template>
  
<script >
export default {
  methods: {
    navigateTo(route) {
      // Utiliza el enrutador para cambiar la ruta
      this.$router.push({ name: route });
      console.log(`Navegar a ${route}`);
    },
    cerrarSesion() {
      // Implementa la lógica para cerrar sesión.
      localStorage.setItem('varLogin', 'false');
      
      console.log('Cerrar sesión...');
      this.navigateTo("login");
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
  justify-content: space-between;
  align-items: center;
  height: 15%; /* Ajusta la altura según tus necesidades */
  width: 100%;
  margin-bottom: 4%;
  margin-top: 4%;
  padding-left: 0%;
  padding-right: 25%;
  text-align: left;
  text-decoration: none !important; 
  cursor: pointer;
   /* Ajusta el relleno según tus necesidades */
  background-color: #F9A95A; /* Color de fondo */
  border: 1px solid #F9A95A; /* Borde y color de borde */
  border-radius: 5px; /* Bordes redondeados */
  color: white; /* Color del texto */
  font-weight: bold; /* Texto en negrita */
  transition: background-color 0.3s ease; /* Transición de color de fondo */
}

.sidebar-button:hover {
  background-color: #E64A19; /* Color de fondo al pasar el ratón */
  color: #FFF; /* Color del texto al pasar el ratón */
}

.sidebar-button i {
  font-size: 50%;
  margin-right: 10%;
}

.sidebar-button h3 {
  margin-right: 5%; /* Ajusta el margen derecho según tus necesidades */
  /* Ajusta el tamaño de la letra según tus necesidades */
  letter-spacing: 1px; /* Añade un espaciado entre letras para mejorar la legibilidad */
  margin-right: auto;
  text-align: right; /* Alinea el texto a la derecha */
 margin-left: 8%;

}

.sidebar-button img {
  height: 60%;
  padding-left: 8%;
  padding-right: 3%;
}

.sidebar-button:hover {
  background-color:white;
  color: black;
}

.link{
  text-decoration: none;
}
</style>

  