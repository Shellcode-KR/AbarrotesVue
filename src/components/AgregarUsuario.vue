<template>
  <div class="contenidoPrincipal">
    <h2>Alta de usuario</h2>
    <form @submit.prevent="crearUsuario">
      <div class="campos">
        <div class="ladoIzq">
          <div class="form-group">
            <label for="Nombre"
              >Nombre<span class="campo-requerido">*</span>:</label
            >
            <input
              name="whNombre"
              id="whNombre"
              type="text"
              v-model="whNombre"
              @input="SoloLetrasN"
              required
            />
          </div>
          <div class="form-group">
            <label for="paterno"
              >Primer Apellido<span class="campo-requerido">*</span>:</label
            >
            <input
              name="whPaterno"
              id="whPaterno"
              type="text"
              v-model="whPaterno"
              @input="SoloLetrasP"
              required
              :disabled="campo1Vacio"
            />
          </div>

          <div class="form-group">
            <label for="materno"
              >Segundo apellido<span class="campo-requerido">*</span>:</label
            >
            <input
              name="whMaterno"
              id="whMaterno"
              type="text"
              v-model="whMaterno"
              @input="SoloLetrasM"
              required
              :disabled="campo2Vacio"
            />
          </div>

          <div class="form-group">
            <label
              >Fecha de nacimiento:<span class="campo-requerido">*</span
              >:</label
            >
            <input
              type="date"
              name="whFecNac"
              id="whFecNac"
              v-model="whFecNac"
              placeholder="dd/mm/aaaa"
              min="1993-01-01"
              max="2005-12-31"
              :disabled="campo3Vacio"
            />
          </div>

          <div class="form-group">
            <label for="Rol"
              >Genero<span class="campo-requerido">*</span>:</label
            >
            <select name="whGenero" id="whGenero" v-model="whGenero">
              <option value="x">-Elige-</option>
              <option value="F">FEMENINO</option>
              <option value="M">MASCULINO</option>
            </select>
          </div>

          <div class="form-group">
            <label for="Rol"
              >Estado de nacimiento<span class="campo-requerido">*</span
              >:</label
            >
            <select name="whEntNac" id="whEntNac" v-model="whEntNac">
              <option value="x">- Elige un Estado-</option>
              <option value="0">CIUDAD DE MEXICO</option>
              <option value="1">AGUASCALIENTES</option>
              <option value="2">BAJA CALIFORNIA NORTE</option>
              <option value="3">BAJA CALIFORNIA SUR</option>
              <option value="4">CAMPECHE</option>
              <option value="5">COAHUILA</option>
              <option value="6">COLIMA</option>
              <option value="7">CHIAPAS</option>
              <option value="8">CHIHUAHUA</option>
              <option value="9">DURANGO</option>
              <option value="10">GUANAJUATO</option>
              <option value="11">GUERRERO</option>
              <option value="12">HIDALGO</option>
              <option value="13">JALISCO</option>
              <option value="14">ESTADO DE MÉXICO</option>
              <option value="15">MICHOACÁN</option>
              <option value="16">MORELOS</option>
              <option value="17">NAYARIT</option>
              <option value="18">NUEVO LEÓN</option>
              <option value="19">OAXACA</option>
              <option value="20">PUEBLA</option>
              <option value="21">QUERÉTARO</option>
              <option value="22">QUINTANA ROO</option>
              <option value="23">SAN LUIS POTOSÍ</option>
              <option value="24">SINALOA</option>
              <option value="25">SONORA</option>
              <option value="26">TABASCO</option>
              <option value="27">TAMAULIPAS</option>
              <option value="28">TLAXCALA</option>
              <option value="29">VERACRUZ</option>
              <option value="30">YUCATÁN</option>
              <option value="31">ZACATECAS</option>
              <option value="32">EXTRANJERO</option>
            </select>
          </div>
        </div>
        <div class="ladoDerecho">
          <div class="form-group">
            <label for="user"
              >Usuario<span class="campo-requerido">*</span>:</label
            >
            <input
              type="text"
              v-model="username"
              required
              :disabled="campo4Vacio"
            />
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
              title="Debe contener 8 caracteres, 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial (# $ % &)"
              :disabled="campo5Vacio"
              required
            />
            <span
              class="mensaje-validacion"
              v-show="mostrarMensajeContrasena"
              >{{ mensajeContrasena }}</span
            >
          </div>

          <div class="form-group">
            <label for="correo"
              >Email<span class="campo-requerido">*</span>:</label
            >
            <input
              type="email"
              v-model="email"
              :disabled="campo6Vacio"
              required
            />
          </div>

          <div class="form-group">
            <label for="telefono"
              >Telefono<span class="campo-requerido">*</span>:</label
            >
            <input
              type="tel"
              v-model="phone"
              :disabled="campo7Vacio"
              required
            />
          </div>

          <div class="form-curp">
            <p class="region">
              <input
                class="genera"
                type="button"
                value="Pulsa para generar CURP"
                @click="btGenCurp(this.form)"
              />

              <br /><br />
              CURP:<span class="campo-requerido">*</span>:
              <input
                class="input-whCurp"
                name="whCurp"
                id="whCurp"
                v-model="whCurp"
                required
                maxlength="16"
                :disabled="campo8Vacio"
              />
              clave: <span class="campo-requerido">*</span>:
              <input
                type="text"
                class="input-whClave"
                name="whClave"
                id="whClave"
                v-model="clave"
                @input="convertirAMayusculas('clave')"
                required
                maxlength="2"
                :disabled="campo9Vacio"
              />
            </p>
          </div>

          <div class="form-curp">
            <p>
              <label for="rfc"
                >RFC<span class="campo-requerido">*</span>:</label
              >
              <input
                class="input-whCurp"
                type="text"
                v-model="rfc"
                @focus="actualizarRFC"
                @input="convertirAMayusculas('rfc')"
                required
                maxlength="10"
                :disabled="campo10Vacio"
              />
              clave: <span class="campo-requerido">*</span>:
              <input
                type="text"
                class="input-whHomo"
                name="whHomo"
                id="whHomo"
                v-model="homo"
                @input="convertirAMayusculas('homo')"
                :disabled="campo11Vacio"
                required
                maxlength="3"
              />
            </p>
          </div>

          <div class="form-group">
            <label for="Rol">Rol<span class="campo-requerido">*</span>:</label>
            <select v-model="role" required>
              <option value="admin">Admin</option>
              <option value="employee" selected>Empleado</option>
              <option value="dev">Desarrollador</option>
            </select>
          </div>
        </div>
      </div>
      <button
        class="guardar"
        type="submit"
        :disabled="!camposRequeridosCompletos"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2550/2550221.png "
          alt=""
        />
        <p>Guardar</p>
      </button>
    </form>
  </div>
</template>

<script>
function GeneraCURP(nom, pat, mat, fecha, genero, edo) {
  nom = nom
    .toUpperCase()
    .replace(/^(DE |DEL |LO |LOS |LA |LAS |MARIA |JOSE )+/g, "");
  pat = pat.toUpperCase().replace(/^(DE |DEL |LO |LOS |LA |LAS )+/g, "");
  mat = mat.toUpperCase().replace(/^(DE |DEL |LO |LOS |LA |LAS )+/g, "");
  mat = mat === "" ? "X" : mat;

  const primerasLetras =
    pat.charAt(0) + buscaVocal(pat) + mat.charAt(0) + nom.charAt(0);
  const letrasPaternas =
    buscaConsonante(pat) + buscaConsonante(mat) + buscaConsonante(nom);
  const anio = fecha.substring(1, 3);
  const mes = fecha.substring(5, 7);
  const dia = fecha.substring(8, 10);
  const generoLetra = genero === "M" ? "H" : "M";
  const estadoLetras = estado(edo);
  const digitoVerificador = ultdig(
    primerasLetras + anio + mes + dia + generoLetra
  );

  return (
    primerasLetras +
    anio +
    mes +
    dia +
    generoLetra +
    estadoLetras +
    letrasPaternas
  );
}

function buscaVocal(str) {
  var vocales = "AEIOU";
  var i, c;
  for (i = 1; i < str.length; i++) {
    c = str.charAt(i);
    if (vocales.indexOf(c) >= 0) {
      return c;
    }
  }
  return "X";
}

function buscaConsonante(str) {
  var vocales = "AEIOU ��.";
  var i, c;
  for (i = 1; i < str.length; i++) {
    c = str.charAt(i);
    if (vocales.indexOf(c) < 0) {
      return c;
    }
  }
  return "X";
}

function tabla(i, x) {
  if (i >= "0" && i <= "9") return x - 48;
  else if (i >= "A" && i <= "N") return x - 55;
  else if (i >= "O" && i <= "Z") return x - 54;
  else return 0;
}

function cambiaPalabra(str) {
  var pal1 = new RegExp(
    /BUEI|BUEY|CACA|CACO|CAGA|CAGO|CAKA|CAKO|COGE|COJA|COJE|COJI|COJO|CULO|FETO|GUEY/
  );
  var pal2 = new RegExp(
    /JOTO|KACA|KACO|KAGA|KAGO|KOGE|KOJO|KAKA|KULO|LOCA|LOCO|MAME|MAMO|MEAR|MEAS|MEON/
  );
  var pal3 = new RegExp(
    /MION|MOCO|MULA|PEDA|PEDO|PENE|PUTA|PUTO|QULO|RATA|RUIN/
  );
  var val;

  str = str.substring(0, 4);

  val = pal1.test(str) || pal2.test(str);
  val = pal3.test(str) || val;

  if (val) return str.substring(0, 1) + "X" + str.substring(2, 4);

  return str;
}

function estado(edo) {
  var vestado = [
    "DF",
    "AS",
    "BC",
    "BS",
    "CC",
    "CL",
    "CM",
    "CS",
    "CH",
    "DG",
    "GT",
    "GR",
    "HG",
    "JC",
    "MC",
    "MN",
    "MS",
    "NT",
    "NL",
    "OC",
    "PL",
    "QT",
    "QR",
    "SP",
    "SL",
    "SR",
    "TC",
    "TS",
    "TL",
    "VZ",
    "YN",
    "ZS",
    "NE",
  ];
  return vestado[edo];
}

function ultdig(curp) {
  var i,
    c,
    dv = 0;
  for (i = 0; i < curp.length; i++) {
    c = tabla(curp.charAt(i), curp.charCodeAt(i));
    dv += c * (18 - i);
  }
  dv %= 10;
  return dv == 0 ? 0 : 10 - dv;
}

export default {
  data() {
    return {
      id: 0,
      curp: "",
      rfc: "",
      fullname: "",
      phone: "",
      email: "",
      salary: 0,
      // Nuevas propiedades para username, password y role
      username: "",
      password: "",
      role: "admin", // Valor predeterminado, ajusta según tus necesidades
      edicion: 0,

      //curp
      whNombre: "",
      whPaterno: "",
      whMaterno: "",
      whGenero: "",
      whFecNac: "",
      whEntNac: "",
      whCurp: "",
      clave: "",
      homo: "",

      esFechaValida: true,

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

  computed: {
    campo1Vacio() {
      return this.whNombre.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo2Vacio() {
      return this.whPaterno.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo3Vacio() {
      return this.whMaterno.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo4Vacio() {
      return this.whFecNac.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },

    campo5Vacio() {
      return this.username.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo6Vacio() {
      return this.password.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo7Vacio() {
      return this.email.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo8Vacio() {
      return this.phone.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo9Vacio() {
      return this.phone.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo10Vacio() {
      return this.phone.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
    campo11Vacio() {
      return this.phone.trim() === ""; // Verifica si campo1 está vacío o solo contiene espacios en blanco
    },
  },

  methods: {
    actualizarRFC() {
      // Actualizar el valor del RFC con el valor del otro input
      this.rfc = this.whCurp.slice(0, 10);
      //this.rfc = this.otroInput.slice(0, 6);
    },

    // JavaScript Document
    //*************************************************************************************
    btGenCurp() {
      if (
        !this.validaNombrePaternoMaterno() ||
        !this.validaFechaGeneroEstado()
      ) {
        return;
      }

      const curp = GeneraCURP(
        this.whNombre,
        this.whPaterno,
        this.whMaterno,
        this.whFecNac,
        this.whGenero,
        this.whEntNac
      );

      if (curp !== "x") {
        this.whCurp = curp;
        // Puedes mostrar mensajes o realizar otras acciones según sea necesario
      }
    },

    calcularCurp() {
      // Obtén el valor de whCurp directamente desde tu modelo de datos en lugar de usar jQuery
      var Vcurp = this.whCurp;

      // Asigna el valor de whCurp a la propiedad curp en el modelo de datos de Vue
      this.curp = Vcurp;

      var VFecha = this.whFecNac;
      this.birth = VFecha;
    },

    validaNombrePaternoMaterno(tipoAsp) {
      // Utiliza this.whNombre directamente desde el modelo de datos de Vue
      this.whNombre = this.whNombre.trim();

      // Utiliza this.whPaterno directamente desde el modelo de datos de Vue
      this.whPaterno = this.whPaterno.trim();

      // Utiliza this.whMaterno directamente desde el modelo de datos de Vue
      this.whMaterno = this.whMaterno.trim();

      if (tipoAsp !== "3") {
        return true;
      }

      if (!this.validaNombre(this.whNombre)) {
        if (this.whNombre === "") {
          alert("Escribe tu nombre por favor");
        } else {
          alert(
            "El campo nombre solo acepta letras (A-Z), el espacio y el punto.\nNo se aceptan caracteres acentuados ni diéresis."
          );
        }
        // En Vue, evita usar this.whNombre.focus(), ya que Vue maneja el DOM de manera reactiva
        return false;
      }

      if (!this.validaNombre(this.whPaterno)) {
        if (this.whPaterno === "") {
          alert(
            "Escribe tu apellido paterno por favor.\nSi solo tienes un apellido, escríbelo aquí."
          );
        } else {
          alert(
            "El campo de apellido paterno solo acepta letras (A-Z), el espacio y el punto.\nNo se aceptan caracteres acentuados ni diéresis."
          );
        }
        // En Vue, evita usar this.whPaterno.focus()
        return false;
      }

      if (!this.validaNombre(this.whMaterno)) {
        if (this.whMaterno === "") {
          if (
            confirm("¿Deseas dejar el campo de apellido materno en blanco?")
          ) {
            return true;
          }
        } else {
          alert(
            "El campo apellido materno solo acepta letras (A-Z), el espacio y el punto.\nNo se aceptan caracteres acentuados ni diéresis."
          );
        }
        // En Vue, evita usar this.whMaterno.focus()
        return false;
      }

      // En Vue, no es necesario utilizar focus y blur directamente
      return true;
    },

    //*************************************************************************************
    //*************************************************************************************
    validaFechaGeneroEstado(tipoAsp) {
      // Utiliza this.whFecNac directamente desde el modelo de datos de Vue
      this.whFecNac = this.whFecNac.trim();

      if (this.whFecNac === "") {
        alert("Debes elegir tu fecha de nacimiento.");
        // En Vue, evita usar this.whFecNac.focus()
        return false;
      }

      if (this.whFecNac.length !== 10) {
        alert("La fecha de nacimiento debe estar en formato dd/mm/aaaa.");
        // En Vue, evita usar this.whFecNac.focus()
        return false;
      }

      if (this.whGenero === "" || this.whGenero === "x") {
        alert("Selecciona tu género.");
        // En Vue, evita usar this.whGenero.focus()
        return false;
      }

      if (this.whEntNac === "" || this.whEntNac === "x") {
        alert("Elige tu lugar de nacimiento.");
        // En Vue, evita usar this.whEntNac.focus()
        return false;
      }

      // En Vue, no es necesario utilizar focus y blur directamente
      return true;
    },

    validaNombre(cmp) {
      cmp = cmp.trim();
      if (cmp.length === 0) {
        return false;
      }

      for (let i = 0; i < cmp.length; i++) {
        const c = cmp.charAt(i);
        if (!(("A" <= c && c <= "Z") || c === "Ñ" || c === "." || c === " ")) {
          return false;
        }
      }

      return true;
    },

    SoloLetrasN() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.whNombre = this.whNombre.replace(/[^a-zA-Z]/g, "");
    },
    SoloLetrasP() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.whPaterno = this.whPaterno.replace(/[^a-zA-Z]/g, "");
    },
    SoloLetrasM() {
      // Utiliza una expresión regular para permitir solo letras de la A a la Z
      this.whMaterno = this.whMaterno.replace(/[^a-zA-Z]/g, "");
    },

    SoloFecha() {
      this.whFecNac = this.whFecNac.replace(/[^0-9/]/g, "");
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

    navigateTo(route) {
      // Utiliza el enrutador para cambiar la ruta
      this.$router.push({ name: route });
      console.log(`Navegar a ${route}`);
    },
    async cargarUsuario() {
      try {
        const id = this.$route.params.id;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `http://localhost:3000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const usuario = response.data;
        // Asigna los datos del usuario a las propiedades del componente
        this.whCurp = usuario.employee.curp;
        this.rfc = usuario.employee.rfc;
        this.fullname = usuario.employee.fullname;
        // Divide el fullname en nombre y apellido
        const partesNombreApellido = usuario.employee.fullname.split(" ");
        if (partesNombreApellido.length >= 2) {
          this.nombre = partesNombreApellido[0];
          this.apellido = partesNombreApellido.slice(1).join(" "); // Join el resto en caso de que haya apellidos compuestos
        } else {
          // Manejar el caso en que el fullname no tenga el formato esperado
          console.error(
            "El fullname no tiene el formato esperado:",
            usuario.employee.fullname
          );
        }
        this.phone = usuario.employee.phone;
        this.email = usuario.employee.email;

        this.username = usuario.username;
        this.password = ""; // Deja la contraseña en blanco por razones de seguridad
        this.role = usuario.role;
        this.id = usuario.id;
        // ... asigna otras propiedades según sea necesario
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        // Manejar errores, por ejemplo, mostrar un mensaje al usuario.
      }
    },
    async crearUsuario() {
      try {
        let response;

        // Construye el objeto con los datos del formulario
        const usuarioActualizado = {
          curp: this.whCurp + this.clave,
          rfc: this.rfc + this.homo,
          fullname: `${this.whNombre} ${this.whPaterno}`,
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
          response = await this.$axios.patch(
            `http://localhost:3000/api/users/${this.id}`,
            usuarioActualizado,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Muestra una alerta específica para la actualización exitosa

          alert("Usuario actualizado con éxito");
          this.edicion = 1;
        } else {
          // Si no hay un ID, realiza una solicitud POST para crear un nuevo usuario
          response = await this.$axios.post(
            "http://localhost:3000/api/auth/create-user",
            usuarioActualizado,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Muestra una alerta específica para la creación exitosa

          alert("Usuario creado con éxito");
          this.edicion = 2;
        }

        // Redirige al usuario a la lista de usuarios
        this.navigateTo("adminlistaUsuarios");
      } catch (error) {
        console.error("Error al crear/actualizar usuario:", error);
        // Muestra una alerta específica para el error
        alert(
          "Error al crear/actualizar usuario. Verifica los datos y vuelve a intentarlo."
        );
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

.ladoIzq {
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

.form-curp {
  margin: 0% 0% 0rem 20%;
  margin-top: 0%;
  margin-bottom: 0%;

  background-color: #d9d9d9;
}

.genera {
  display: flex;
  margin: 0 0% 0% 30%;
  margin-top: 0%;
  margin-bottom: 0%;
  background-color: rgb(64, 255, 47);
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

select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;
}

/* Estilo cuando el elemento de selección está enfocado */
select:focus {
  border-color: #66afe9;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}

/* Estilo para las opciones dentro del elemento de selección */
select option {
  background-color: #fff;
  color: #333;
}

/* Estilo para el ícono de despliegue (flecha) */
select::-ms-expand {
  display: none;
}

/* Estilo para el ícono de despliegue (flecha) en navegadores webkit */

/* Estilo para el ícono de despliegue (flecha) utilizando un pseudo-elemento */
select:after {
  content: "\25BC"; /* Código Unicode para una flecha hacia abajo */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
}

.input-whCurp {
  width: 40%; /* Ajusta el ancho según tus necesidades */
  padding: 0%;
  margin: 0%;
}
.input-whClave {
  width: 8%; /* Ajusta el ancho según tus necesidades */
  padding: 0%;
  margin: 0%;
}

.input-whHomo {
  width: 10%; /* Ajusta el ancho según tus necesidades */
  padding: 0%;
  margin: 0%;
  margin-top: 0%;
}

.region {
  padding: 0%;
  margin: 0%;
}

.mensaje-validacion {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px; /* Ajusta el ancho según tus necesidades */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
}

.password-container input:focus + .mensaje-validacion {
  display: block;
}
</style>
