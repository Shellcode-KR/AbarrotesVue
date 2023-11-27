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

                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="telefono">Telefono:</label>
                        <input type="tel" v-model="phone" required>
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
                        <label for="rol">Rol:</label>
                        <select v-model="role" required>
                            <option value="admin">Admin</option>
                            <option value="employee" selected>Empleado</option>
                            <option value="dev">Desarrollador</option>
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
            edicion: 0,
        };
    },
    methods: {
        navigateTo(route) {
            // Utiliza el enrutador para cambiar la ruta
            this.$router.push({ name: route });
            console.log(`Navegar a ${route}`);
        },
        async cargarUsuario() {
            try {
                const id = this.$route.params.id;
                const token = localStorage.getItem('token');
                const response = await this.$axios.get(`http://localhost:3000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const usuario = response.data;
                // Asigna los datos del usuario a las propiedades del componente
                this.curp = usuario.employee.curp;
                this.rfc = usuario.employee.rfc;
                this.fullname = usuario.employee.fullname;
                // Divide el fullname en nombre y apellido
                const partesNombreApellido = usuario.employee.fullname.split(' ');
                if (partesNombreApellido.length >= 2) {
                    this.nombre = partesNombreApellido[0];
                    this.apellido = partesNombreApellido.slice(1).join(' '); // Join el resto en caso de que haya apellidos compuestos
                } else {
                    // Manejar el caso en que el fullname no tenga el formato esperado
                    console.error('El fullname no tiene el formato esperado:', usuario.employee.fullname);
                }
                this.phone = usuario.employee.phone;
                this.email = usuario.employee.email;
                this.salary = usuario.employee.salary;
                this.username = usuario.username;
                this.password = ''; // Deja la contraseña en blanco por razones de seguridad
                this.role = usuario.role;
                this.id = usuario.id;
                // ... asigna otras propiedades según sea necesario
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
                // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
            }
        },
        async crearUsuario() {
            try {
                let response;

                
                // Construye el objeto con los datos del formulario
                const usuarioActualizado = {
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

                if (this.id) {
                    // Si hay un ID, realiza una solicitud PATCH para actualizar el usuario
                    response = await this.$axios.patch(`http://localhost:3000/api/users/${this.id}`, usuarioActualizado, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    // Muestra una alerta específica para la actualización exitosa

                    alert('Usuario actualizado con éxito');
                    this.edicion = 1;
                } else {
                    // Si no hay un ID, realiza una solicitud POST para crear un nuevo usuario
                    response = await this.$axios.post('http://localhost:3000/api/auth/create-user', usuarioActualizado, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    // Muestra una alerta específica para la creación exitosa

                    alert('Usuario creado con éxito');
                    this.edicion = 2;
                }

                // Redirige al usuario a la lista de usuarios
                this.navigateTo('adminlistaUsuarios');
            } catch (error) {
                console.error('Error al crear/actualizar usuario:', error);
                // Muestra una alerta específica para el error
                alert('Error al crear/actualizar usuario. Verifica los datos y vuelve a intentarlo.');

            }
        },
    },
    mounted() {
        // Llama a cargarUsuario al montar el componente si hay un parámetro id
        if (this.$route.params.id) {
            this.cargarUsuario();
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