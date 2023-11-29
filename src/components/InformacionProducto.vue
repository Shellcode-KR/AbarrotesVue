<template>
    <div class="contenidoPrincipal">
        <h2>Informacion de Productos</h2>
        <form @submit.prevent="enviarProducto">
            <div class="campos">
                <div class="ladoIzq">
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripcion:</label>
                        <input type="text" v-model="descripcion" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Codifo de Barras:</label>
                        <input type="numeric" v-model="barcode" required>
                    </div>
                    <div class="form-group">
                        <label for="size">Tamaño:</label>
                        <input type="text" v-model="size" required>
                    </div>
                    <div class="form-group">
                        <label for="precio">Precio Uni. :</label>
                        <input type="numeric" v-model="precio" required>
                    </div>

                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="descripcion">Marca:</label>
                        <input type="text" v-model="brand" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Img Url:</label>
                        <input type="text" v-model="imgurl">
                    </div>
                    <div class="form-group">
                        <label for="stock">Existencia:</label>
                        <input type="numeric" v-model="stock" required>
                    </div>
                    <div class="form-group">
                        <label for="prov">Proveedor:</label>
                        <input type="numeric" v-model="prov" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoria:</label>
                        <select v-model="categoria" required>
                            <option value="1">Bebidas</option>
                            <option value="2" selected>Abarrotes</option>
                            <option value="3">Comestibles</option>
                        </select>
                    </div>
                </div>


            </div>
            <button class="guardar" type="submit">
                <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
                <p>Guardar</p>
            </button>
        </form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            id: 0,
            name: "",
            descripcion: "",
            imgurl: "",
            size: "",
            precio: 0,
            stock: 0,
            brand: "",
            prov: 0,
            categoria: 0,
            barcode: 0,
            editingProductId: 0,

        };
    },
    methods: {
        async cargarDatosProducto() {
            try {
                
                const id = this.$route.params.id;
                console.log(id);
                const token = localStorage.getItem('token');
                const response = await this.$axios.get(`http://localhost:3000/api/products/search/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Llena el formulario con los datos del producto existente
                const producto = response.data;
                this.name = producto.name;
                this.descripcion = producto.description;
                this.barcode = producto.barCode;
                this.size = producto.measureUnit;
                this.precio = producto.salePrice;
                this.stock = producto.stock;
                this.brand = producto.brand;
                
                this.prov = producto.providerId;
                this.categoria = producto.categoryId;

                console.log('Datos del producto cargados para edición:', producto);
            } catch (error) {
                console.error('Error al cargar los datos del producto para edición:', error);
            }
        },
        async enviarProducto() {
            let response;

            try {
                const producto = {
                    name: this.name,
                    purchasePrice: this.precio,
                    salePrice: this.precio, // Puedes ajustar según tus necesidades
                    description: this.descripcion,
                    barCode: this.barcode, // Puedes ajustar según tus necesidades
                     // Puedes ajustar según tus necesidades
                    stock: this.stock,
                    brand: this.brand, // Puedes ajustar según tus necesidades
                    measureUnit: this.size, // Puedes ajustar según tus necesidades
                    providerId: this.prov, // Puedes ajustar según tus necesidades
                    categoryId: this.categoria, // Puedes ajustar según tus necesidades
                };

                response = await this.$axios.post(`http://localhost:3000/api/products/`, producto, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                console.log("Enviando producto al backend:", producto);
            } catch (error) {
                console.error("Error al crear producto",error);
                alert('Error al crear usuario verifica los datos');
            }


        },
    },
    mounted() {
        // Llama a cargarDatosProducto cuando el componente se crea, si estás editando un producto existente
        if (this.$route.params.id) {
            this.cargarDatosProducto();
        }
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

form {}

.campos {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    background-color: #D9D9D9;
    padding: 2rem 1rem;
    margin: 0 5%;
}

.ladoIzq,
.ladoDerecho {
    width: 50%;
}

.form-group {
    display: flex;
    justify-content: space-between;
    margin: 0 2rem 1rem 2rem;
}

.guardar {
    box-sizing: border-box;
    display: flex;
    border-radius: 0.9375rem;
    background: #21B7E7;
    padding: 1rem;
    margin: 1rem 0 0 70%;
}

.guardar input {
    display: flex;
    width: 1rem;
}

.guardar p {
    display: flex;
    margin: 1% 1rem;
}

.guardar img {
    width: 1rem;
}
</style>