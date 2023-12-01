<template>
  <div class="contenidoPrincipal">
    <h2>Lista de Usuarios</h2>
    <table>
      <thead>
        <th>Nombre Usuario</th>
        <th>Rol</th>
       <!-- <th>Estado</th>--> 
        <th>Acciones</th>
        
      </thead>
      <tbody>
        <!-- Utiliza v-for para iterar sobre la lista de usuarios -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.username }}</td>
          <td>{{ usuario.role }}</td>
         
          <td><button class="btn-editar" @click="editarUsuario(usuario)">Editar</button>
            <button class="btn-borrar" @click="eliminarUsuario(usuario)">Borrar</button>
          
          </td>
          

        </tr>
      </tbody>
    </table>
    <button class="guardar" type="submit" @click="navigateTo('AltaUsuario')">
      <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png" alt="">
      <p>Agregar</p>
    </button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      usuarios: [], // Agrega la propiedad usuarios al estado del componente
    };
  },
  methods: {
    async cargarUsuarios() {
      try {
        const token = localStorage.getItem('token');
        const response = await this.$axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Asigna la lista de usuarios a la propiedad usuarios
        this.usuarios = response.data;

        console.log('Lista de usuarios:', this.usuarios);
      } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
      }
    },
    editarUsuario(usuario) {
      this.$router.push({ name: 'adminineditUsuarios', params: { id: usuario.id } });
    },
    async eliminarUsuario(usuario) {
      try {
        const token = localStorage.getItem('token');
        await this.$axios.delete(`http://localhost:3000/api/users/${usuario.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Recarga la lista de usuarios después de eliminar
        this.cargarUsuarios();
        alert('Usuario eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
      }
    },
    navigateTo(route) {
      // Utiliza el enrutador para cambiar la ruta
      this.$router.push({ name: route });
      console.log(`Navegar a ${route}`);
    },
  },
  mounted() {
    // Llama a cargarUsuarios al montar el componente
    this.cargarUsuarios();
  },
};
</script>

<style scoped>
h2 {
  padding: 1rem;
}

.contenidoPrincipal {
  width: 80%;
}

table {
  width: 70%;
  background-color: #D9D9D9;
  padding: 2rem;
  margin: 0 15%;
}

th,
td {
  padding: 8px;
  text-align: left;
}

td {
  background-color: aliceblue;
}

button {
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
}

.btn-editar {
  background-color:rgb(73, 224, 73) ;
  color: #fff;
   margin-left: 8%;
  margin-right: 10%;
  padding: 3% 9%;
  
}
.btn-editar:hover {
  background-color:rgb(19, 184, 19); /* Color de fondo al pasar el ratón */
  color: black;
}



.btn-borrar {
  background-color:rgb(243, 75, 75) ;
  color: #fff;
 
  padding: 3% 9%;
  
}
.btn-borrar:hover {
  background-color:red; /* Color de fondo al pasar el ratón */
  color: black;
}

.guardar {
  box-sizing: border-box;
  display: flex;
  border-radius: 0.9375rem;
  background: #21B7E7;
  margin: 1rem 0 0 69%;
  padding: 2% 4%;
}

.guardar img {
  height: 1rem;
  padding: 0%;
  margin: 0%;
  padding-top: 0%;
}

.guardar p {
  display: flex;
  margin: 1% 1rem;
  font-size: 14px;
}
</style>