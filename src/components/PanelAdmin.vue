<template>
    <HeaderComponente class="cabeza"/>
    <LateralAdmin class="lateral"/>
    <InformacionUsuario />
    <InformacionProducto />
    <ListaUsuarios />
    <ListaProductos />
    <VistaVentas />
    
</template>
  
<script lang="ts" setup>
    import HeaderComponente from './HeaderComponente.vue';
    import LateralAdmin from './LateralAdmin.vue'
    import InformacionUsuario from './InformacionUsuario.vue'
    import ListaUsuarios from './ListaUsuarios.vue'
    import ListaProductos from './ListaProductos.vue'
    import InformacionProducto from './InformacionProducto.vue'
    import VistaVentas from './VistaVentas.vue'
</script>
  
<style scoped>
    .cabeza{
        box-sizing: border-box;

    }
    
</style>
  