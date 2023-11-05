<template>
    <div class="contenidoPrincipal">
        <h2>Lista de Usuarios</h2>
        <table>
            <thead>
                <th>Nombre Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
                <th></th>
            </thead>
            <tbody>
                <tr>
                    <td>Flavio</td>
                    <td>Admin</td>
                    <td>Cansado</td>
                    <td><button class="btn-editar">Editar</button></td>
                    <td><button class="btn-borrar">Borrar</button></td>
                </tr>
                <tr>
                    <td>Flavio</td>
                    <td>Admin</td>
                    <td>Cansado</td>
                    <td><button class="btn-editar">Editar</button></td>
                    <td><button class="btn-borrar">Borrar</button></td>
                </tr>
                <tr>
                    <td>Flavio</td>
                    <td>Admin</td>
                    <td>Cansado</td>
                    <td><button class="btn-editar">Editar</button></td>
                    <td><button class="btn-borrar">Borrar</button></td>
                </tr>
                <tr>
                    <td>Flavio</td>
                    <td>Admin</td>
                    <td>Cansado</td>
                    <td><button class="btn-editar">Editar</button></td>
                    <td><button class="btn-borrar">Borrar</button></td>
                </tr>

            </tbody>
        </table>
        <button class="guardar" type="submit">
            <img src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png " alt="">
            <p>Guardar</p>
        </button>
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