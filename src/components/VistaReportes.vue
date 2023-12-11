<template>
    <div class="reportes">
        <div class="opciones">
            <button @click="vistaDiaria">Vista Diaria</button>
            <button @click="vistaMensual">Vista Mensual</button>
        </div>

        <div class="filtro" v-if="mostrarFiltro">
            <div v-if="vistaActual === 'diaria'">
                <label>Seleccione un Mes:</label>
                <select v-model="mesSeleccionado">
                    <option v-for="(mes, index) in meses" :key="index" :value="index + 1">
                        {{ mes }}
                    </option>
                </select>

                <label>Seleccione un Día:</label>
                <select v-model="diaSeleccionado">
                    <option v-for="dia in diasDelMes" :key="dia" :value="dia">
                        {{ dia }}
                    </option>
                </select>
            </div>

            <div v-else-if="vistaActual === 'mensual'">
                <label>Seleccione un Mes:</label>
                <select v-model="mesSeleccionado">
                    <option v-for="(mes, index) in meses" :key="index" :value="index + 1">
                        {{ mes }}
                    </option>
                </select>
            </div>

            <button class="btn-reporte" @click="generarReporte">Generar Reporte</button>
        </div>

        <div class="principal">
            <div class="conteiner">
                <!-- Barra lateral con la lista de productos ordenados por existencia -->
                <h3>Productos por Existencia</h3>
                <ul>
                    <li v-for="producto in productosOrdenados" :key="producto.id">
                        {{ producto.name }} - Existencia: {{ producto.stock }}
                    </li>
                </ul>
            </div>

            <div class="conteiner">
                <!-- Productos más vendidos -->
                <h3>Productos Más Vendidos</h3>
                <ul>
                    <li v-for="producto in productosMasVendidos" :key="producto.id">
                        {{ producto.name }} - Ventas: {{ producto.ventas }}
                    </li>
                </ul>
            </div>

            <div class="conteiner">
                <!-- Número total de ventas -->
                <h3>Total de Ventas</h3>
                <p>$ {{ totalVentas }}</p>
            </div>




        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            vistaActual: 'diaria',
            mostrarFiltro: false,
            mesSeleccionado: 1,
            diaSeleccionado: 1,
            meses: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            diasDelMes: [...Array(31).keys()].map(dia => dia + 1),
            productos: [], // Tu lista de productos
            respuestareporte: [],
            totalVentas: 0, // Calcula esto según la vista seleccionada
            productosOrdenados: [], // Ordena tus productos por existencia
            productosMasVendidos: [] // Calcula esto según la vista seleccionada
        };
    },
    methods: {
        calcularTotalVentas() {
            // Suma los totales de ventas de todos los elementos en respuestareporte
            this.totalVentas = this.respuestareporte.reduce((total, reporte) => {
                // Suma el total de cada objeto al total acumulado
                return total + reporte.total;
            }, 0);
        },
        ordenarProductosPorExistencia() {
            this.productosOrdenados = [...this.productos]; // Clona el array para no modificar el original
            this.productosOrdenados.sort((a, b) => a.stock - b.stock);
        },
        obtenerProductosMasVendidos() {
            // Crea un objeto para almacenar las ventas por producto
            const ventasPorProducto = {};

            // Itera sobre cada informe en respuestareporte
            this.respuestareporte.forEach((reporte) => {
                // Itera sobre cada item en el informe
                reporte.items.forEach((item) => {
                    // Verifica si el producto ya existe en el objeto ventasPorProducto
                    if (ventasPorProducto[item.name]) {
                        // Si existe, suma la cantidad vendida
                        ventasPorProducto[item.name] += 1;
                    } else {
                        // Si no existe, inicializa la cantidad vendida en 1
                        ventasPorProducto[item.name] = 1;
                    }
                });
            });

            // Convierte el objeto ventasPorProducto en un array de objetos
            const productosMasVendidos = Object.entries(ventasPorProducto).map(
                ([name, ventas]) => ({ name, ventas })
            );

            // Ordena el array por la cantidad de ventas en orden descendente
            productosMasVendidos.sort((a, b) => b.ventas - a.ventas);

            // Actualiza la propiedad productosMasVendidos con el resultado
            this.productosMasVendidos = productosMasVendidos;
        },
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
                this.ordenarProductosPorExistencia();

                console.log("Lista de productos:", this.productos);
            } catch (error) {
                console.error("Error al cargar la lista de productos:", error);
                // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
            }
        },
        vistaDiaria() {
            this.vistaActual = 'diaria';
            this.mostrarFiltro = true;
        },
        vistaMensual() {
            this.vistaActual = 'mensual';
            this.mostrarFiltro = true;
        },
        async generarReporte() {
            try {
                const token = localStorage.getItem("token");

                // Obtiene el año actual
                const year = new Date().getFullYear();

                // Determina la URL y el cuerpo de la solicitud según la vista seleccionada
                let url, data;
                if (this.vistaActual === 'mensual') {
                    url = 'http://localhost:3000/api/reports/month';
                    data = {
                        "year": year.toString(),
                        "month": this.mesSeleccionado.toString(),
                    };
                } else {
                    url = 'http://localhost:3000/api/reports/day';
                    data = {
                        "year": year.toString(),
                        "month": this.mesSeleccionado.toString(),
                        "day": this.diaSeleccionado.toString(),
                    };
                }

                // Realiza la solicitud HTTP
                const response = await this.$axios.post(url, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Guarda la respuesta en respuestareporte
                this.respuestareporte = response.data;
                this.calcularTotalVentas();
                this.obtenerProductosMasVendidos();


                console.log("Respuesta del reporte:", this.respuestareporte);
            } catch (error) {
                console.error("Error al generar el reporte:", error);
                // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
            }
        },



    },
    mounted() {
        this.cargarProductos();
    }
};
</script>
  
<style scoped>
.reportes {
    display: flex;
    height: 75%;
    width: 80%;
    flex-direction: column;
}

.opciones {
    display: flex;
    gap: 1rem;
    padding: 1rem 1rem 1rem 1rem;
}

.opciones button,
.btn-reporte {
    width: 100%;
    font-size: 150%;
}

.btn-reporte {
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 1rem;
}

.filtro {
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

.principal {
    width: 90%;
    padding: 1rem;
    background-color: #f0f0f0;
    display: flex;
    margin: 3%;
}

.conteiner {
    width: 30%;
}

.sidebar h3 {
    margin-bottom: 10px;
}
</style>
  