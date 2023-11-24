<template>
  <div class="contenidoPrincipal">
    <h2>Lista de Usuarios</h2>
    <table>
      <thead>
        <th>Nombre Usuario</th>
        <th>Rol</th>
        <th>Estado</th>
        <th>Acciones</th>
        <th></th>
      </thead>
      <tbody>
        <!-- Utiliza v-for para iterar sobre la lista de usuarios -->
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.username }}</td>
          <td>{{ usuario.role }}</td>
          <td>{{ usuario.estado }}</td>
          <td><button class="btn-editar" @click="editarUsuario(usuario)">Editar</button></td>
          <td><button class="btn-borrar" @click="eliminarUsuario(usuario)">Borrar</button></td>

        </tr>
      </tbody>
    </table>
    <button class="guardar" type="submit" @click="navigateTo('usuarios')">
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
      // Implementa la lógica para navegar a la ruta correspondiente (por ejemplo, usando Vue Router).
      localStorage.setItem('vista', route);
      window.location.reload();
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

button.btn-editar {
  background-color: rgb(236, 236, 94);
  color: #fff;
}

button.btn-borrar {
  background-color: rgb(243, 68, 68);
  color: #fff;
}

.guardar {
  box-sizing: border-box;
  display: flex;
  border-radius: 0.9375rem;
  background: #21B7E7;
  padding: 1rem;
  margin: 1rem 0 0 70%;
}

.guardar img {
  width: 1rem;
}

.guardar p {
  display: flex;
  margin: 1% 1rem;
}
</style>