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
                    <td>{{ producto.id }}</td>
                    <td>{{ producto.name }}</td>
                    <td>{{ producto.description }}</td>
                    <td>{{ producto.salePrice }}</td>
                    <td>{{ producto.stock }}</td>
                    <td><button class="btn-editar" @click="agregarAlCarrito(producto)">Seleccionar</button></td>
                </tr>


            </tbody>
        </table>
        <div class="campos">


        </div>

        <div class="campos">

            <div class="ladoDerecho">

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
                <th></th>
                <th>Nombre</th>
                <th>Descripccion</th>
                <th>Precio U.</th>
                <th>Cantidad</th>
                <th>Subtotal</th>

                <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in carrito" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.salePrice }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.salePrice * item.cantidad }}</td>
                    <td><button class="btn-editar" @click="eliminarDelCarrito(index)">Eliminar del carrito</button></td>
                </tr>

            </tbody>
        </table>
        <p>Total a pagar: ${{ calcularTotalVenta() }}</p>
        <div class="form-group">
            <label for="montoRecibido">Monto Recibido:</label>
            <input type="number" v-model="montoRecibido" required>
        </div>
        <p>Cambio: ${{ calcularCambio() }}</p>

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
            montoRecibido: 0,

        };
    },
    methods: {
        async buscarProductoPorId() {
            try {
                // Hacer la solicitud al servidor para buscar productos por ID
                const response = await this.$axios.get(`http://localhost:3000/api/products/search2/${this.productoId}`);
                console.log(response.data);
                this.productosEncontrados = response.data; // Coloca el resultado en el array
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

                const responseVenta = await this.$axios.post('http://localhost:3000/api/sales', {
                    employeeId: 1,
                });
                console.log('Venta creada con éxito:', responseVenta.data);
                const ventaId = responseVenta.data.id;
                const productosParaVenta = this.carrito.map(item => {
                    return {
                        saleId: ventaId,  // Puedes ajustar este valor según tus necesidades
                        productId: item.id,  // ID del producto
                        amount: item.cantidad  // Cantidad de productos a vender
                    };
                });
                for (const productoParaVenta of productosParaVenta) {
                    const responseAddItem = await this.$axios.post('http://localhost:3000/api/sales/add-item', productoParaVenta);

                    console.log('Producto agregado a la venta:', responseAddItem.data);
                }

                alert("venta realizada con exito");

                // Limpia el carrito después de realizar la venta
                this.carrito = [];
            } catch (error) {
                console.error('Error al realizar la venta:', error);
            }
        },
        calcularTotalVenta() {
            // Calcular el total sumando los subtotales de cada elemento en el carrito
            return this.carrito.reduce((total, item) => total + (item.salePrice * item.cantidad), 0);
        },
        calcularCambio() {
            // Calcular el cambio restando el monto recibido del total de la venta
            return this.montoRecibido - this.calcularTotalVenta();
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