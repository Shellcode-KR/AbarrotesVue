<template>
    <div class="contenidoPrincipal">
        <div class="barraBusqueda">
            <span>Búsqueda por ID</span>
            <input type="text" v-model="productoId" required>
            <a href="#" @click="buscarProductoPorId">
                <img src="https://cdn-icons-png.flaticon.com/512/5868/5868370.png" alt="">
            </a>
        </div>
        <table>
            <thead>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descipcion</th>
                <th>Precio</th>
                <th>Existencia</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="producto in productosEncontrados" :key="producto.id">
                    <td>{{ producto.name }}</td>
                    <td>{{ producto.description }}</td>
                    <td>{{ producto.salePrice }}</td>
                    <td>{{ producto.stock }}</td>
                    <td><button class="btn-editar" @click="agregarAlCarrito(producto)">Editar</button></td>
                </tr>


            </tbody>
        </table>
        <div class="campos">
            <div class="ladoIzq">
                <div class="form-group">
                    <label for="cliente">Cliente:</label>
                    <input type="text" v-model="cliente" required>
                </div>
            </div>

        </div>

        <div class="campos">
            <div class="ladoIzq">
                <div class="form-group">
                    <label for="id">Id:</label>
                    <input type="text" v-model="id" required>
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" v-model="nombre" required>
                </div>
                <div class="form-group">
                    <label for="descripcion">Descripcion:</label>
                    <input type="text" v-model="descripcion" required>
                </div>

            </div>
            <div class="ladoDerecho">
                <div class="form-group">
                    <label for="precio">Precio:</label>
                    <input type="numeric" v-model="precio" required>
                </div>
                <div class="form-group">
                    <label for="cantidad">Cantidad:</label>
                    <input type="number" v-model="cantidad" required>
                </div>
                <button class="guardar" type="submit" @click="agregarAlCarrito(productosEncontrados[0])">
                    <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
                    <p>Agregar al carrito</p>
                </button>
            </div>

        </div>
        <h2>Carrito</h2>
        <table>
            <thead>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripccion</th>
                <th>Existencia</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in carrito" :key="index">
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.precio }}</td>
                    <td>{{ item.existencia }}</td>
                    <td><button class="btn-editar" @click="eliminarDelCarrito(index)">Eliminar del carrito</button></td>
                </tr>

            </tbody>
        </table>
        <button class="pagar" type="submit" @click="realizarVenta">
            <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png" alt="">
            <p>Pagar</p>
        </button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            productoId: "",
            productosEncontrados: [],
            carrito: [],
            cantidad: 1,

        };
    },
    methods: {
        async buscarProductoPorId() {
            try {
                // Hacer la solicitud al servidor para buscar productos por ID
                const response = await this.$axios.get(`http://localhost:3000/api/products/${this.productoId}`);
                this.productosEncontrados = [response.data]; // Coloca el resultado en el array
            } catch (error) {
                console.error('Error al buscar producto por ID:', error);
            }
        },
        agregarAlCarrito(producto) {
            // Asegúrate de que la cantidad sea un número mayor que cero
            const cantidad = parseInt(this.cantidad, 10);
            if (isNaN(cantidad) || cantidad <= 0) {
                console.error('La cantidad debe ser un número mayor que cero');
                return;
            }

            // Busca si el producto ya está en el carrito
            const productoEnCarrito = this.carrito.find(item => item.id === producto.id);

            if (productoEnCarrito) {
                // Si ya está en el carrito, incrementa la cantidad
                productoEnCarrito.cantidad += cantidad;
            } else {
                // Si no está en el carrito, agrégalo con la cantidad del formulario
                this.carrito.push({ ...producto, cantidad });
            }

            console.log('Carrito actualizado:', this.carrito);
        },
        eliminarDelCarrito(index) {
            // Implementa la lógica para eliminar un elemento del carrito
            this.carrito.splice(index, 1);
        },
        async realizarVenta() {
            try {
                // Hacer la solicitud al servidor para realizar la venta
                const response = await this.$axios.post('http://localhost:3000/api/sales', {
                    // Envía la información necesaria, como el cliente y los productos en el carrito
                    cliente: this.cliente,
                    productos: this.carrito,
                });

                console.log('Venta realizada con éxito:', response.data);

                // Limpia el carrito después de realizar la venta
                this.carrito = [];
            } catch (error) {
                console.error('Error al realizar la venta:', error);
            }
        },
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

img {
    width: 1rem;
    margin: 0 0.5rem;
}

.campos {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background-color: #D9D9D9;
    padding: 2rem;
    margin: 0 15%;
}

.ladoIzq,
.ladoDerecho {
    width: 50%;
}

.form-group {
    display: flex;
    justify-content: space-between;
    margin: 0 3rem 1rem 3rem;
}

.barraBusqueda {
    background-color: #d9d9d9;
    display: flex;
    box-sizing: border-box;
    display: flex;
    margin: 1rem 0 1rem 70%;
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

.pagar {
    background-color: rgb(69, 144, 50);
    display: flex;
    box-sizing: border-box;
    margin: 1rem 0 0 70%;
    box-sizing: border-box;
    border-radius: 0.9375rem;
    padding: 1rem;
}

.pagar img {
    width: 1rem;
}

.pagar p {
    display: flex;
    margin: 1% 1rem;
}
</style>