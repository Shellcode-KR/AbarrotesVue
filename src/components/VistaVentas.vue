<template>
    <div class="contenidoPrincipal">
        <div class="barraBusqueda">
            <span class="busqueda" >Búsqueda por nombre</span>
            <input class="chido-input" type="text" v-model="productoId" required>
            <a class="icono" href="#" @click="buscarProductoPorId">
                <img class="lupa" src="https://cdn-icons-png.flaticon.com/512/5868/5868370.png" alt="">
            </a>
        </div>
        <table class="produ">
            <thead>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descipcion</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Existencia</th>
                <th>Acciones</th>
            </thead>
            <tbody class="produ" >
                <tr v-for="producto in productosEncontrados" :key="producto.id">
                    <td>{{ producto.id }}</td>
                    <td>{{ producto.name }}</td>
                    <td>{{ producto.description }}</td>
                    <td>{{ producto.salePrice }}</td>
                    <td>{{ producto.brand }}</td>

                    <td>{{ producto.stock }}</td>
                    <td><button class="btn-editar" @click="agregarAlCarrito(producto)">Seleccionar</button></td>
                </tr>


            </tbody>
        </table>

        <div class="campos">

            <div class="ladoDerecho">

                    <label for="cantidad">Cantidad:</label>
                    <input class="canti" type="number" v-model="cantidad" required>
                <button class="agregar" type="submit" @click="agregarAlCarrito(productosEncontrados[0])">
                    <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
                    <p>Agregar al carrito</p>
                </button>
            </div>

        </div>
        <h2>Carrito</h2>
        <table class="produ">
            <thead>
                <th>Nombre</th>
                <th>Descripccion</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>

                <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in carrito" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.salePrice }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.salePrice * item.cantidad }}</td>
                    <td><button class="btn-editar" @click="eliminarDelCarrito(index)">Eliminar del carrito</button></td>
                </tr>

            </tbody>
        </table>
        <div class="conte">
        <p class="form-group1">Total a pagar: ${{ calcularTotalVenta() }}</p>
        <div class="form-group">
            <label for="montoRecibido">Monto Recibido: $</label>
            <input class="input-grande" type="number" v-model="montoRecibido" required>
        
        <p class="cambio" >Cambio: ${{ calcularCambio() }}</p>
    
        <button class="pagar" type="submit" @click="realizarVenta">
            <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png" alt="">
            <p>Pagar</p>
        </button>
    </div>
    </div>
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
                    employeeId: 3,
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
    margin-left: 26%;
    height: 30%;
}


.form-group {
    
margin-left: 0%;
margin-right: 41%;
font-size: 130%;
margin-bottom: 4%;

}
.form-group1 {
    
    margin-left: 0%;
    margin-right: 54%;
    font-size: 130%;
    
    }

.barraBusqueda {
    background-color: #d9d9d9;
    display: flex;
    box-sizing: border-box;
    display: flex;
    margin: 1rem 0 1rem 50%;
    width: 35%;
    
}

table {
    width: 70%;
    background-color: #D9D9D9;
    padding: 2rem;
    margin: 0 15%;
}

.produ {
    width: 70%;
    background-color: #D9D9D9;
    padding: 2rem;
    margin: 0 15%;
    border-radius: 10px; /* Ajusta según tus preferencias */
    box-shadow: 1 4px 8px rgba(0, 0, 0, 0.1); /* Ajusta según tus preferencias */
  }

th,
td {
    padding: 8px;
    text-align: left;
}

td {
    background-color: aliceblue;
}

.agregar {
    border: none;
    border-radius: 5px;
    padding: 10px 20px; /* Aumenté el espacio para hacerlo más llamativo */
    cursor: pointer;
    font-weight: bold;
    background-color: #4CAF50; /* Color de fondo */
    color: #fff; /* Color del texto */
    transition: background-color 0.3s ease; /* Efecto de transición en el cambio de color de fondo */
  
    /* Agregamos sombra para dar profundidad */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .agregar:hover {
    background-color: #45a049; /* Cambio de color al pasar el ratón */
  }

button.btn-editar {
    background-color: rgb(236, 236, 94);
    color:black;
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
.chido-input {
    width: 110%;
    padding: 10px;
    font-size: medium;
    border: 2px solid #3498db;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  .chido-input:focus {
    border-color: #e74c3c;
    box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
  }
  .icono{
    background-color: #34db4a;
    border: 2px solid black;
    border-radius: 5px;
    width: 30%;
  }
.lupa{
    margin-top: 15%;
}
.busqueda{
    margin-top: 3%;
    width: 130%;
    
}
.canti{
    width: 10%;
    font-size: large;
    margin-right: 30%;
    margin-top: 0%;
}

.monto{
margin-left: 20%;
}

.pagar {
    display: flex;
    align-items: center;
    margin-left: 110%; /* Ajusta el margen izquierdo según sea necesario */
    margin-top: -10%; /* Puedes ajustar el margen superior negativo para mover hacia arriba */
    padding: 10px 20px; /* Ajusta el relleno según sea necesario */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    background-color: rgb(9, 117, 189); /* Color de fondo */
    color: #fff; /* Color del texto */
    transition: background-color 0.3s ease; /* Efecto de transición en el cambio de color de fondo */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
  
  }
  
  .pagar img {
    width: 1.5rem;
    margin-right: 0.5rem;
  }
  
  .pagar:hover {
    background-color: #6098ec; /* Cambio de color al pasar el ratón */
  }

.cambio{
    margin-left: 85%;
    margin-right: 0%;
    margin-top: -10%; 
    margin-bottom: 0%;
    padding-top: 0%;
    font-size: 130%;
}

.input-grande {
    font-size: 100%; /* Ajusta el tamaño de fuente según tus preferencias */
    padding: 0%; /* Ajusta el relleno según tus preferencias */
    width: 20%;
    /* Otros estilos si es necesario */
  }

</style>