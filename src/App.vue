<template>
  <router-view/>
</template>

<script >
import LoginForm from './components/LoginForm.vue';
import PanelAdmin from './components/PanelAdmin.vue';
export default {
  data: () => ({
    login: false
  }),
  mounted() {
    this.refreshUser();
  },
  methods: {
    refreshUser() {
      const logConst = localStorage.getItem('varLogin');
      if (logConst === 'true') {
        this.login = true;

      }
      else {
        this.login = false;
      }
    }
  },
  
}

</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}


#app {
  height: 100%;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}
</style>
