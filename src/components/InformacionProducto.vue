<template>
    <div class="contenidoPrincipal">
      <h2>Alta de productos</h2>
      <form @submit.prevent="enviarProducto">
        <div class="campos">
          <div class="ladoIzq">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" v-model="name" required>
              <span class="required">*</span>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <input type="text" v-model="descripcion" required>
              <span class="required">*</span>
            </div>
            <div class="form-group">
    <label for="codigo">Código:</label>
    <input type="number" v-model="barcode" required @input="validarNumero" />
    <span class="required">*</span>
  </div>
  
  <div class="form-group">
    <label for="size">Tamaño:</label>
    <input type="text" v-model="size" required @input="validarNumeroDecimal" />
    <span class="required">*</span>
  </div>
  <div class="form-group">
    <label for="precio">Precio MXN$:</label>
    <input type="numeric" v-model="precio" required @input="validarNumeroDecimal" />
    <span class="required">*</span>
  </div>
          </div>
          <div class="ladoDerecho">
            <div class="form-group">
              <label for="descripcion">Marca:</label>
              <input type="text" v-model="brand" required>
              <span class="required">*</span>
            </div>
            <div class="form-group">
              <label for="descripcion">Imagen:</label>
              <input type="text" v-model="imgurl">
            </div>
            <div class="form-group">
    <label for="stock">Existencia:</label>
    <input type="number" v-model="stock" required @input="validarNumero" />
    <span class="required">*</span>
  </div>
            <div class="form-group">
    <label for="prov">Proveedor:</label>
    <select v-model="prov" required>
      <option v-for="proveedor in listaProveedores" :key="proveedor.id" :value="proveedor.id">
        {{ proveedor.name }}
      </option>
    </select>
    <span class="required">*</span>
  </div>
            <div class="form-group">
              <label for="categoria">Categoría:</label>
              <select v-model="categoria" required>
                <option value="1">Bebidas</option>
                <option value="2" selected>Abarrotes</option>
                <option value="3">Comestibles</option>
              </select>
              <span class="required">*</span>
            </div>
          </div>
        </div>
        <button class="guardar" type="submit">
          <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png" alt="">
          <p>Guardar</p>
        </button>
      </form>
    </div>
  </template>
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
            listaProveedores: [],

        };
    },
    methods: {
        validarNumeroDecimal(event) {
      const inputValue = event.target.value;

      // Reemplazar cualquier caracter no numérico o no un punto por una cadena vacía
      const numero = inputValue.replace(/[^0-9.]/g, '');

      // Actualizar el valor del campo con el número validado
      event.target.value = numero;
    },
        validarNumero(event) {
      // Este método se ejecutará cada vez que el usuario escriba en el campo
      const inputValue = event.target.value;
      // Reemplazar cualquier caracter no numérico por una cadena vacía
      const numero = inputValue.replace(/[^0-9]/g, '');
      // Actualizar el valor del campo con el número validado
      event.target.value = numero;
    },
        async cargarListaProveedores() {
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
        this.listaProveedores = response.data;

        console.log("Lista de proveedores para el formulario:", this.listaProveedores);
      } catch (error) {
        console.error("Error al cargar la lista de proveedores:", error);
      }
    },
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
                if (this.$route.params.id) {
                    response = await this.$axios.patch(`http://localhost:3000/api/products/${this.editingProductId}`, producto, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    this.$router.push({ name: 'adminlistaProductos' });
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
        // Llama a cargarProductos al montar el componente
    //this.cargarProveedores();
    this.cargarListaProveedores();
        // Llama a cargarDatosProducto cuando el componente se crea, si estás editando un producto existente
        if (this.$route.params.id) {
            this.cargarDatosProducto();
        }
    },
};
</script>
<style scoped>

.required {
  color: red;
  margin-left: 5px;
}
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