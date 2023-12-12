<template>
  <div class="contenidoPrincipal">
    <h2>Lista de productos</h2>
    <div class="table-container" >
    <table >
      <thead>
        <th>Nombre</th>
        <th>Descipcion</th>
        <th>Precio compra</th>
        <th>Precio venta</th>
        <th>Existencia</th>
        <th>Marca</th>
        <th>Categoria</th> 
        <th>Acciones</th>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.name }}</td>
          <td>{{ producto.description }}</td>
          <td>{{ producto.purchasePrice }}</td>
          <td>{{ producto.salePrice }}</td>  
          <td>{{ producto.stock }}</td>
          <td>{{ producto.brand }}</td>  
          <td>
            <span v-if="producto.categoryId === 1">Bebidas</span>
            <span v-else-if="producto.categoryId === 2">Abarrotes</span>
            <span v-else-if="producto.categoryId === 3">Alimentos</span>
            <span v-else-if="producto.categoryId === 4">Hogar</span>
            <span v-else-if="producto.categoryId === 5">Higiene</span>

          </td>

          

          <td>
            <button class="btn-editar" @click="editarProducto(producto)">
              Editar
            </button>
          </td>
          <td class="espa">
            <button class="btn-borrar" @click="eliminarProducto(producto)">
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <button
      class="guardar"
      type="submit"
      @click="navigateTo('admininfoProductos')"
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
      productos: [], // Agrega la propiedad productos al estado del componente
    };
  },
  methods: {
    async cargarProductos() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          "http://localhost:3000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Asigna la lista de productos a la propiedad productos
        this.productos = response.data;

        console.log("Lista de productos:", this.productos);
      } catch (error) {
        console.error("Error al cargar la lista de productos:", error);
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
      }
    },
    editarProducto(producto) {
      console.log(producto);
      this.$router.push({
        name: "admineditProductos",
        params: { id: producto.id },
      });
    },
    async eliminarProducto(producto) {
      try {
        const token = localStorage.getItem("token");
        console.log("Se esta eliminando el producto",producto);
        await this.$axios.delete(
          `http://localhost:3000/api/products/${producto.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Recarga la lista de productos después de eliminar
        this.cargarProductos();
        alert("Producto eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
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
    this.cargarProductos();
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
  width: 95%;
  background-color: #d9d9d9;
  padding: 1%;
  margin: 0 2%;
}

th,
td {
  padding: 1%;
  text-align: left;
  width: 8%;
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
  padding: 10% 15%;
}
.btn-editar:hover {
  background-color: rgb(19, 184, 19); /* Color de fondo al pasar el ratón */
  color: black;
}
.btn-borrar {
  background-color: rgb(243, 75, 75);
  color: #fff;
  margin-left: 0%;
  margin-right: 0%;
  padding: 10% 15%;
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

.table-container {
  max-height: 55%;
  overflow-y: auto;
  margin-bottom: 0%; /* Espacio entre la tabla y el scroll */
}

.table-container::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar */
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del thumb del scrollbar */
  border-radius: 6px; /* Borde redondeado del thumb */
}

.table-container::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color del track del scrollbar */
  border-radius: 8px; /* Borde redondeado del track */
}
</style>
