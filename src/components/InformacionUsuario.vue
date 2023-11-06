<template>
    <div class="contenidoPrincipal">
        <h2>Informacion de Usuario</h2>
        <form @submit.prevent="InfoUsuario">
            <div class="campos">
                <div class="ladoIzq">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" v-model="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="apellido">Apellido:</label>
                        <input type="text" v-model="apellido" required>
                    </div>
                    <div class="form-group">
                        <label for="correo">Email:</label>
                        <input type="email" v-model="correo" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Direccion:</label>
                        <input type="password" v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="rol">Rol:</label>
                        <select v-model="rol" required>
                            <option value="value1">Value 1</option>
                            <option value="value2" selected>Value 2</option>
                            <option value="value3">Value 3</option>
                        </select>
                    </div>
                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="telefono">Telefono:</label>
                        <input type="tel" v-model="telefono" required>
                    </div>
                    <div class="form-group">
                        <label for="direccion">Direccion:</label>
                        <input type="text" v-model="direccion" required>
                    </div>
                    <div class="form-group">
                        <label for="rfc">RFC:</label>
                        <input type="text" v-model="rfc" required>
                    </div>
                    <div class="form-group">
                        <label for="curp">CURP:</label>
                        <input type="text" v-model="curp" required>
                    </div>
                    <div class="form-group">
                        <label for="salario">Salario:</label>
                        <input type="number" v-model="salario" required>
                    </div>
                    <div class="form-group">
                        <label for="activo">Activo:</label>
                        <select v-model="activo" required>
                            <option value="value1">Si</option>
                            <option value="value2" selected>No</option>
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
    padding: 2rem;
    margin: 0 15%;
}
.ladoIzq, .ladoDerecho{
    width: 50%;
}

.form-group {
    display: flex;
    justify-content: space-between;
    margin: 0 3rem 1rem 3rem;
}

.guardar {
    box-sizing: border-box;
    display: flex;
    border-radius: 0.9375rem;
    background: #21B7E7;
    padding: 1rem;
    margin: 1rem 0 0 70%;
}
.guardar img{
    width: 1rem;
}
.guardar p{
    display: flex;
    margin: 1% 1rem;
}
</style>