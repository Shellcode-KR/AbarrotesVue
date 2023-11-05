<template>
    <div class="contenidoPrincipal">
        <h2>Informacion de Usuario</h2>
        <form @submit.prevent="InfoUsuario">
            <div class="campos">
                <div class="ladoIzq">
                    <div class="form-group">
                        <label for="descripcion">Descripcion:</label>
                        <input type="text" v-model="descripcion" required>
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
                        <label for="stock">Existencia:</label>
                        <input type="numeric" v-model="stock" required>
                    </div>
                    <div class="form-group">
                        <label for="prov">Proveedor:</label>
                        <input type="text" v-model="prov" required>
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
</script>

<style>
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
.ladoIzq, .ladoDerecho{
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

.guardar img {
    width: 1rem;
}

.guardar p {
    display: flex;
    margin: 1% 1rem;
}
</style>