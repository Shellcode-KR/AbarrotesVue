<template>
    <div class="contenidoPrincipal">
        <h2>Lista de productos</h2>
        <table>
            <thead>
                <th>Nombre</th>
                <th>Descipcion</th>
                <th>Precio</th>
                <th>Existencia</th>
                <th>Acciones</th>
            </thead>
            <tbody>

                <tr v-for="producto in productos" :key="producto.id">
                    <td>{{ producto.name }}</td>
                    <td>{{ producto.description }}</td>
                    <td>{{ producto.salePrice }}</td>
                    <td>{{ producto.stock }}</td>
                    <td><button class="btn-editar" @click="editarProducto(producto)">Editar</button></td>
                    <td><button class="btn-borrar" @click="eliminarProducto(producto)">Borrar</button></td>
                </tr>


            </tbody>
        </table>
        <button class="guardar" type="submit" @click="navigateTo('admininfoProductos')">
            <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
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
                const token = localStorage.getItem('token');
                const response = await this.$axios.get('http://localhost:3000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Asigna la lista de productos a la propiedad productos
                this.productos = response.data;

                console.log('Lista de productos:', this.productos);
            } catch (error) {
                console.error('Error al cargar la lista de productos:', error);
                // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
            }
        },
        editarProducto(producto) {
            console.log(producto);
            this.$router.push({ name: 'admineditProductos', params: { id: producto.id } });
        },
        async eliminarProducto(producto) {
            try {
                const token = localStorage.getItem('token');
                await this.$axios.delete(`http://localhost:3000/api/products/${producto.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Recarga la lista de productos después de eliminar
                this.cargarProductos();
                alert('Producto eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
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
}
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
     margin-left: 10%;
    margin-right: 5%;
    padding: 10% 20%;
    
  }
  .btn-editar:hover {
    background-color:rgb(19, 184, 19); /* Color de fondo al pasar el ratón */
    color: black;
  }
  .btn-borrar {
    background-color:rgb(243, 75, 75) ;
    color: #fff;
    margin-left: 8%;
    margin-right: 10%;
    padding: 17% 22%;
    
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