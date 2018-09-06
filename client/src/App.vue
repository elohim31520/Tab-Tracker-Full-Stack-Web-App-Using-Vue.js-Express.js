<template>
  <v-app id='app' >
    <pageHeader></pageHeader>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-app>
    

</template>

<script>
import pageHeader from "./components/Header";

export default {
  name: "App",
  components: {
    pageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
