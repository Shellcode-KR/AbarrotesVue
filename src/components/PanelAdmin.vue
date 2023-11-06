<template>
    <HeaderComponente class="cabeza" />
    <LateralAdmin class="lateral" />
    <InformacionUsuario v-if="currentOption === 'usuarios'" />
    <InformacionProducto v-if="currentOption === 'productos'" />
    <ListaUsuarios v-if="currentOption === 'listaUsuarios'" />
    <ListaProductos v-if="currentOption === 'listaProductos'" />
    <VistaVentas v-if="currentOption === 'ventas'" />
</template>
  
<script>
import HeaderComponente from './HeaderComponente.vue';
import LateralAdmin from './LateralAdmin.vue'
import InformacionUsuario from './InformacionUsuario.vue'
import ListaUsuarios from './ListaUsuarios.vue'
import ListaProductos from './ListaProductos.vue'
import InformacionProducto from './InformacionProducto.vue'
import VistaVentas from './VistaVentas.vue'
export default {
    data() {
        return {
            currentOption: localStorage.getItem('vista') || 'defaultOption',
        };
    },
    watch: {
        currentOption(newValue) {
            localStorage.setItem('vista', newValue);
        },
    },
    components: { HeaderComponente, LateralAdmin, InformacionUsuario, ListaUsuarios, ListaProductos, InformacionProducto, VistaVentas}
}

</script>
  
<style scoped>
.cabeza {
    box-sizing: border-box;

}
</style>
