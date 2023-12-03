<template>
    <div class="contenidoPrincipal">
        <h2>Información de usuario</h2>
        <form @submit.prevent="crearUsuario">
            <div class="campos">
                <div class="ladoIzq">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" v-model="nombre" required
                        @input="SoloLetrasN">
                    </div>
                    <div class="form-group">
                        <label for="apellido">Apellido:</label>
                        <input type="text" v-model="apellido" required
                        @input="SoloLetrasP">
                    </div>
                    <div class="form-group">
                        <label for="user">Usuario:</label>
                        <input type="text" v-model="username" required>
                    </div>
                    <div
                    class="form-group"
                    :class="{
                      'valida-contrasena': contrasenaValida,
                      'invalida-contrasena': !contrasenaValida,
                    }"
                  >
                    <label for="correo"
                      >Contraseña<span class="campo-requerido">*</span>:</label
                    >
                    <input
                      type="password"
                      v-model="password"
                      @input="validarContrasena"
                      required
                    />
                    <span
                      class="mensaje-validacion"
                      v-show="mostrarMensajeContrasena"
                      >{{ mensajeContrasena }}</span
                    >
                  </div>
                    <div class="form-group">
                        <label for="correo">Email<span class="campo-requerido">*</span>:</label>
                        <input type="email" v-model="email" required>
                    </div>

                </div>
                <div class="ladoDerecho">
                    <div class="form-group">
                        <label for="telefono">Telefono:</label>
                        <input type="tel" v-model="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="curp">CURP:</label>
                        <input type="text" v-model="curp" required
                        @input="convertirAMayusculas('curp')"
                        
                        maxlength="18">
                    </div>
                    <div class="form-group">
                        <label for="rfc">RFC:</label>
                        <input type="text" v-model="rfc" required
                        @input="convertirAMayusculas('rfc')"
                        maxlength="13">
                    </div>
                    
                  
                    <div class="form-group">
                        <label for="rol">Rol:</label>
                        <select  v-model="role" required>
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
nombre:"",
apellido:"",
            contrasenaValida: false,
      mensajeContrasena: "",
      mostrarMensajeContrasena: false,
      camposRequeridosCompletos: true,

        };
    },


    watch: {
        phone: function (newPhone) {
      // Expresión regular para validar si el teléfono comienza con '+'
      const regexTelefonoConPlus = /^\+/;

      // Si comienza con '+', limitar la longitud a 13 caracteres
      if (regexTelefonoConPlus.test(newPhone)) {
        this.phone = newPhone.replace(/[^\d+]/g, "").slice(0, 13);
      } else {
        // Si no comienza con '+', limitar la longitud a 10 caracteres
        this.phone = newPhone.replace(/[^\d]/g, "").slice(0, 10);
      }
    },
  },





    methods: {
        navigateTo(route) {
            // Utiliza el enrutador para cambiar la ruta
            this.$router.push({ name: route });
            console.log(`Navegar a ${route}`);
        },


        SoloLetrasN() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.nombre = this.nombre.replace(/[^a-zA-Z]/g, '');
    },
    SoloLetrasP() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.apellido = this.apellido.replace(/[^a-zA-Z]/g, '');
    },
    SoloLetrasM() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.whMaterno = this.whMaterno.replace(/[^a-zA-Z]/g, '');
    },

    SoloFecha() {
      this.whFecNac = this.whFecNac.replace(/[^0-9/]/g, '');
    },

    
    convertirAMayusculas(propiedad) {
      // Método para convertir la propiedad a mayúsculas
      this[propiedad] = this[propiedad].toUpperCase();

      if (propiedad === "curp" && this[propiedad].length === 18) {
        // Limitar la longitud de la CURP a 18 caracteres
        this[propiedad] = this[propiedad].slice(0, 18);

        // Expresión regular para validar la CURP
        const regexCURP = /^[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}$/;

        // Validar la CURP
        if (!regexCURP.test(this[propiedad])) {
          alert(
            "La CURP ingresada no es válida. Asegúrate de seguir el formato correcto."
          );
          // Puedes agregar más lógica según tus necesidades, como restablecer el valor o deshabilitar el botón de guardar.
        } else {
          // Si la CURP es válida y tiene 18 caracteres, tomar los primeros 10 caracteres y asignarlos al RFC
          this.rfc = this[propiedad].slice(0, 10);

          // Limitar la longitud del RFC a 13 caracteres
          this.rfc = this.rfc.slice(0, 13);
        }
      }

      if (propiedad === "rfc") {
        // Limitar la longitud del RFC a 13 caracteres
        this.rfc = this.rfc.slice(0, 13);
      }

      if (propiedad === "phone") {
        // Expresión regular para validar si el teléfono comienza con '+'
        const regexTelefonoConPlus = /^\+/;

        // Si comienza con '+', limitar la longitud a 13 caracteres
        if (regexTelefonoConPlus.test(this[propiedad])) {
          this[propiedad] = this[propiedad].replace(/[^\d+]/g, "").slice(0, 13);
        } else {
          // Si no comienza con '+', limitar la longitud a 10 caracteres
          this[propiedad] = this[propiedad].replace(/[^\d]/g, "").slice(0, 10);
        }
      }
    },


    
    validarContrasena() {
      // Expresión regular para validar la contraseña
      const regexContrasena =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()]).{8,16}$/;

      // Truncar la contraseña si excede los 16 caracteres
      if (this.password.length > 16) {
        this.password = this.password.slice(0, 16);
      }

      // Validar la longitud y formato de la contraseña
      this.contrasenaValida =
        regexContrasena.test(this.password) && this.password.length >= 8;

      // Actualizar el mensaje de validación
      if (this.password.length < 8) {
        this.mensajeContrasena =
          "La contraseña debe contener al menos 8 caracteres.";
      } else if (this.password.length > 16) {
        this.mensajeContrasena =
          "La contraseña no debe tener maximo de 16 caracteres.";
      } else if (!/[a-z]/.test(this.password)) {
        this.mensajeContrasena =
          "La contraseña debe contener al menos una letra minúscula.";
      } else if (!/[A-Z]/.test(this.password)) {
        this.mensajeContrasena =
          "La contraseña debe contener al menos una letra mayúscula.";
      } else if (!/\d/.test(this.password)) {
        this.mensajeContrasena =
          "La contraseña debe contener al menos un número.";
      } else if (!/[!"#$%&'()]/.test(this.password)) {
        this.mensajeContrasena =
          "La contraseña debe contener al menos un carácter especial (!\"#$%&'()).";
      } else {
        this.mensajeContrasena = "";
      }

      // Mostrar o ocultar el mensaje según la validación
      this.mostrarMensajeContrasena =
        !this.contrasenaValida || this.mensajeContrasena !== "";
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
                const usuarionuevo = {
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
                const usuarioActualizado = {
                    username: this.username,
                    password: this.password,
                    role: this.role,

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
                    response = await this.$axios.post('http://localhost:3000/api/auth/create-user', usuarionuevo, {
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
.form-group label {
  text-align: right;
  width: 40%; /* Ajusta el ancho según tus necesidades */
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 60%; /* Ajusta el ancho según tus necesidades */
}

.form-group.valida-contrasena {
  color: green; /* Color para indicar que la contraseña es válida */
}

.form-group.invalida-contrasena {
  color: red; /* Color para indicar que la contraseña no es válida */
}

.campo-requerido {
  color: red;
  margin-left: 5px;
}

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
  background-color: #d9d9d9;
  padding: 2rem;
  padding-top: 3%;
  margin-bottom: 0%;
  padding-bottom: 0%;
  margin: 0 5%;
  width: 90%;
  border-radius: 10px; /* Puedes ajustar el valor según tus preferencias */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Puedes ajustar los valores según tus preferencias */
}



.ladoIzq{
    width: 53%;
}
.ladoDerecho {
  width: 45%;
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
  background: #21b7e7;
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