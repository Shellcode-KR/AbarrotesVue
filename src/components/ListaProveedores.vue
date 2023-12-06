<template>
    <div class="contenidoPrincipal">
      <h2>Lista de Proveedores</h2>
      <table>
        <thead>
          <th>Id</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Email</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          <tr v-for="prov in proveedores" :key="prov.id">
            <td>{{ prov.id }}</td>
            <td>{{ prov.name }}</td>
            <td>{{ prov.description }}</td>
            <td>{{ prov.salePrice }}</td>
            <td>{{ prov.stock }}</td>
            <td>
              <button class="btn-editar" @click="editarProveedor(prov)">
                Editar
              </button>
            </td>
            <td>
              <button class="btn-borrar" @click="eliminarProv(prov)">
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        class="guardar"
        type="submit"
        @click="navigateTo('proveedoresInfo')"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png "
          alt=""
        />
        <p>Agregar Producto</p>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        proveedores: [], 
      };
    },
    methods: {
      async cargarProveedores() {
        try {
          const token = localStorage.getItem("token");
          const response = await this.$axios.get(
            "http://localhost:3000/api/providers/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.proveedores = response.data;
  
          console.log("Lista de proveedores:", this.proveedores);
        } catch (error) {
          console.error("Error al cargar la lista de proveedores:", error);
          // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
        }
      },
      editarProveedor(prov) {
        console.log(prov);
        this.$router.push({
          name: "proveedoresInfo",
          params: { id: prov.id },
        });
      },
      async eliminarProv(prov) {
        try {
          const token = localStorage.getItem("token");
          await this.$axios.delete(
            `http://localhost:3000/api/providers/${prov.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          // Recarga la lista de productos después de eliminar
          this.cargarProveedores();
          alert("Proveedor eliminado con éxito");
        } catch (error) {
          console.error("Error al eliminar el Proveedor:", error);
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
      // Llama a cargarProductos al montar el componente
      this.cargarProveedores();
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
    background-color: #d9d9d9;
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
    background-color: rgb(73, 224, 73);
    color: #fff;
    margin-left: 10%;
    margin-right: 5%;
    padding: 10% 20%;
  }
  .btn-editar:hover {
    background-color: rgb(19, 184, 19); /* Color de fondo al pasar el ratón */
    color: black;
  }
  .btn-borrar {
    background-color: rgb(243, 75, 75);
    color: #fff;
    margin-left: 8%;
    margin-right: 10%;
    padding: 17% 22%;
  }
  .btn-borrar:hover {
    background-color: red; /* Color de fondo al pasar el ratón */
    color: black;
  }
  
  .guardar {
    box-sizing: border-box;
    display: flex;
    border-radius: 0.9375rem;
    background: #21b7e7;
    margin: 1rem 0 0 69%;
    padding: 1% 1%;
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
  