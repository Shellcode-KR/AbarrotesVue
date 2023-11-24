<template>
    <HeaderComponente class="cabeza" />
    <LateralAdmin class="lateral" />

    <router-view/>
</template>
  
<script>
import HeaderComponente from './HeaderComponente.vue';
import LateralAdmin from './LateralAdmin.vue'

export default {
  components: { HeaderComponente, LateralAdmin },
};

</script>
  
<style scoped>
.cabeza {
    box-sizing: border-box;

}
</style>
