<template>
    <HeaderComponente class="cabeza"/>
    <LateralAdmin class="lateral"/>
    
</template>
  
<script lang="ts" setup>
    import HeaderComponente from './HeaderComponente.vue';
    import LateralAdmin from './LateralAdmin.vue'
</script>
  
<style scoped>
    .cabeza{
        box-sizing: border-box;
        height: 30%;
        width: 100%;
    }
    .lateral{
        box-sizing: border-box;
        height: 100%;
        width: calc(20% + 1rem);
    }
</style>
  