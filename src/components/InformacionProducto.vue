<template>
    <div class="contenidoPrincipal">
        <h2>Información de producto</h2>
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
                        <label for="size">Tamaño:</label>
                        <input class="tama" type="number" v-model="size" required> 
                        <label class="uni" for="categoria">Unidad:</label>
                        
                        <select class="uni" v-model="Unidad" required>
                            <option value="Kilogramo">Kilogramo</option>
                            <option value="Gramos" >Gramo</option>
                            <option value="Litros">Litro</option>
                            <option value="Mililitros">Mililitro</option>

                        </select>
                       
                    </div>
                    
                    <div class="form-group">
                        <label for="precio">Precio compra:</label>
                        <input class="compra" type="number" v-model="precioCompra" required>
                    </div>

                    <div class="form-group">
                        <label for="precio">Precio venta:</label>
                        <input type="number" v-model="precioVenta" required>
                    </div>

                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="stock">Existencia:</label>
                        <input type="number" v-model="stock" required>
                        
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Marca:</label>
                        <input type="text" v-model="brand" required>
                    </div>
                    <div class="form-group">
                        <label for="prov">Proveedor:</label>
                        <input type="numeric" v-model="prov" required>
                    </div>
                    <div class="form-group">
                        <label  class="cate" for="categoria">Categoria:</label>
                        <select class="case" v-model="categoria" required>
                            <option value="1">Bebidas</option>
                            <option value="2">Abarrotes</option>
                            <option value="3">Alimentos</option>
                            <option value="4">Articulos de hogar</option>
                            <option value="5">Higiene personal</option>


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
            precioCompra: "",
            precioVenta:"",
            unidad:"",
            stock: "",
            brand: "",
            prov: 0,
            categoria: 0,
            barcode: "0",
            editingProductId: 0,

        };
    },
    methods: {
        async cargarDatosProducto() {
            try {

                const id = this.$route.params.id;
                console.log(id);
                this.editingProductId = id;
                const token = localStorage.getItem('token');
                const response = await this.$axios.get(`http://localhost:3000/api/products/search/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Llena el formulario con los datos del producto existente
                const producto = response.data;
                this.name = producto.name;
                this.descripcion = producto.name;
                this.barcode = producto.barCode;
                this.size = producto.size;
                this.precioVenta = producto.salePrice;
                this.precioCompra = producto.purchasePrice;

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
                    purchasePrice: this.precioCompra,
                    salePrice: this.precioVenta, // Puedes ajustar según tus necesidades
                    description: this.descripcion +" " + this.size +" " + this.Unidad,
                    barCode: this.name + this.precioVenta +this.precioCompra + this.stock, // Puedes ajustar según tus necesidades
                    // Puedes ajustar según tus necesidades
                    
                    stock: this.stock,
                    brand: this.brand, // Puedes ajustar según tus necesidades
                    measureUnit: this.size +" " + this.Unidad, // Puedes ajustar según tus necesidades
                    providerId: this.prov, // Puedes ajustar según tus necesidades
                    categoryId: this.categoria, // Puedes ajustar según tus necesidades
                };
                if (this.$route.params.id) {
                    response = await this.$axios.patch(`http://localhost:3000/api/products/${this.editingProductId}`, producto, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    alert('Producto actualizado con éxito');
                }
                else{
                    response = await this.$axios.post(`http://localhost:3000/api/products/`, producto, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.$router.push({ name: 'adminlistaProductos' });
                console.log("Enviando producto al backend:", producto);
                alert('Producto creado con éxito');
                }
                
            } catch (error) {
                console.error("Error al crear producto", error);
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

label{
    margin-left: auto;
    font-size: medium;
    padding-right: 5px;

}



.contenidoPrincipal {
    width: 80%;
}

input{
padding-left: 2%;
font-size:medium;


}

.compra{
    width: 60%;
}

.tama{
    padding-left: 1%;
    margin: 0%;
    
    font-size:medium;
    margin-right: 0%;
    width: 17%;
    }

    .cate{
        padding-left: 9%;
        margin: 0%;
        
        font-size:medium;
        margin-right: 0%;
        width: 17%;
        }

        .case{
            width: 65%;
        }

    .uni{
       margin-left: 1%;
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
    width: 40%;
    padding-left: 6%;
}

.form-group {
    display: flex;
    justify-content: space-between;
    margin: 0 5rem 1rem 3rem;
    margin-right: auto;
    margin-left: auto;
    
   
}

.guardar {
    box-sizing: border-box;
    display: flex;
    border-radius: 0.9375rem;
    background: #21B7E7;
    padding: 1rem;
    margin: 1rem 0 0 74%;
}

.guardar p {
    display: flex;
    margin: 1% 1rem;
}

.guardar img {
    width: 1rem;
}
</style>