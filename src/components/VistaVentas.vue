<template>
    <div class="contenidoPrincipal">
        <div class="barraBusqueda">
            <input type="text" v-model="pbusqueda" required>
            <a href="#">
                <img src="https://cdn-icons-png.flaticon.com/512/5868/5868370.png " alt="">
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
                <tr>
                    <td>1</td>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
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
                    <input type="text" v-model="cantidad" required>
                </div>
                <button class="guardar" type="submit">
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
                <tr>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
                <tr>
                    <td>CocaCola</td>
                    <td>una coca bien fria</td>
                    <td>30</td>
                    <td>10</td>
                    <td><button class="btn-editar">selecionar</button></td>
                </tr>
            </tbody>
        </table>
        <button class="pagar" type="submit">
            <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
            <p>Pagar</p>
        </button>

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
}</style>