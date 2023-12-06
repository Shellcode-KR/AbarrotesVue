<template>
    <div class="contenidoPrincipal">
        <h2>Información de producto</h2>
        <form @submit.prevent="enviarProveedores">
            <div class="campos">
                <div class="ladoIzq">
                    <div class="form-group">
                        <label for="name">Nombre del proveedor:</label>
                        <input type="text" v-model="name" required>
                    </div>


                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="phone">Telefono:</label>
                        <input type="text" v-model="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" v-model="email">
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
            phone: "",
            email: "",
            editingProvId: 0,
            

        };
    },
    methods: {
        async cargarDatosProveedor() {
            try {

                const id = this.$route.params.id;
                console.log(id);
                this.editingProvId = id;
                const token = localStorage.getItem('token');
                const response = await this.$axios.get(`http://localhost:3000/api/providers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Llena el formulario con los datos del producto existente
                const prov = response.data;
                this.name = prov.name;
                this.email = prov.email;
                this.phone = prov.phone;

                console.log('Datos del producto cargados para edición:', prov);
            } catch (error) {
                console.error('Error al cargar los datos del producto para edición:', error);
            }
        },
        async enviarProveedores(){
            let response;
            try{
                const proveedor = {
                    name : this.name,
                    phone : this.phone,
                    email : this.email,
                };
                if (this.$route.params.id) {
                    response = await this.$axios.patch(`http://localhost:3000/api/providers/${this.editingProvId}`, proveedor, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });

                    alert('Producto actualizado con éxito');
                }
                else{
                    response = await this.$axios.post(`http://localhost:3000/api/providers/`, proveedor, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                this.$router.push({ name: 'listaProveedores' });
                console.log("Enviando producto al backend:", proveedor);
                alert('Producto creado con éxito');
                }

            }catch (error) {
                console.error("Error al crear proveedor", error);
                alert('Error al crear proveedor, verifica los datos');
            }
        },
    },
    mounted() {
        // Llama a cargarDatosProducto cuando el componente se crea, si estás editando un producto existente
        if (this.$route.params.id) {
            this.cargarDatosProveedor();
        }
    },
};
</script>
<style scoped>
h2 {
    padding: 1rem;
}

label {
    margin-left: auto;
    font-size: medium;
    padding-right: 5px;

}



.contenidoPrincipal {
    width: 80%;
}

input {
    padding-left: 2%;
    font-size: medium;

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