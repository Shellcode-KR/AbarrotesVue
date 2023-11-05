<template>
    <HeaderComponente class="cabeza"/>
    <LateralAdmin class="lateral"/>
    <InformacionProducto />
    
</template>
  
<script lang="ts" setup>
    import HeaderComponente from './HeaderComponente.vue';
    import LateralAdmin from './LateralAdmin.vue'
    import InformacionUsuario from './InformacionUsuario.vue'
    import ListaUsuarios from './ListaUsuarios.vue'
    import ListaProductos from './ListaProductos.vue'
    import InformacionProducto from './InformacionProducto.vue'
</script>
  
<style scoped>
    .cabeza{
        box-sizing: border-box;

    }
    
</style>
  