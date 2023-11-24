<template>
    <div class="contenidoPrincipal">
        <h2>Informacion de Usuario</h2>
        <form @submit.prevent="crearUsuario">
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
                        <label for="user">Usuario:</label>
                        <input type="text" v-model="username" required>
                    </div>
                    <div class="form-group">
                        <label for="correo">Contraseña:</label>
                        <input type="password" v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="correo">Email:</label>
                        <input type="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="rol">Rol:</label>
                        <select v-model="role" required>
                            <option value="admin">Admin</option>
                            <option value="employee" selected>Empleado</option>
                            <option value="dev">Desarrollador</option>
                        </select>
                    </div>
                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="telefono">Telefono:</label>
                        <input type="tel" v-model="phone" required>
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
                        <input type="number" v-model="salary" required>
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
export default {
    data() {
        return {
            curp: '',
            rfc: '',
            fullname: '',
            phone: '',
            email: '',
            salary: 0,
            // Nuevas propiedades para username, password y role
            username: '',
            password: '',
            role: 'admin', // Valor predeterminado, ajusta según tus necesidades
        };
    },
    methods: {
        navigateTo(route) {
            // Implementa la lógica para navegar a la ruta correspondiente (por ejemplo, usando Vue Router).
            localStorage.setItem('vista', route);
            window.location.reload();
            console.log(`Navegar a ${route}`);
        },
        async crearUsuario() {
            try {
                // Construye el objeto con los datos del formulario
                const nuevoUsuario = {
                    curp: this.curp,
                    rfc: this.rfc,
                    fullname: `${this.nombre} ${this.apellido}`,
                    phone: this.phone,
                    email: this.email,
                    salary: this.salary,
                    user: {
                        username: this.username,
                        password: this.password,
                        role: this.role,
                    },
                };

                // Haz la solicitud al backend
                const response = await this.$axios.post('http://localhost:3000/api/auth/create-user', nuevoUsuario, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Muestra un alerta con el resultado
                alert('Usuario creado con éxito');

                // Redirige al usuario a la lista de usuarios
                this.navigateTo('listaUsuarios');
            } catch (error) {
                console.error('Error al crear usuario:', error);
                alert('Error al crear usuario');
            }
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

form {}

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

.guardar {
    box-sizing: border-box;
    display: flex;
    border-radius: 0.9375rem;
    background: #21B7E7;
    padding: 1rem;
    margin: 1rem 0 0 70%;
}

.guardar p {
    display: flex;
    margin: 1% 1rem;
}

.guardar img {
    width: 1rem;
}
</style>