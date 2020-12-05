<template>
  <v-app>
    <v-container>            
      <Logo />
      <Header 
        :title="this.$store.getters.HEADER.title"
        :userName="this.$store.getters.HEADER.user"
        :renderIcon="this.$store.getters.HEADER.iconName" />
      <v-main>                             
        <router-view/>      
      </v-main>       
      <Footer />
    </v-container>    
  </v-app>        
</template>

<script>
import Logo from "@/Logo.vue";
import Footer from "@/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Logo,
    Footer,
    Header
  }
};
</script>

<style lang="scss">
@import "@/custom/styles";
  #app {
    background: url('./images/back2.jpg') no-repeat center center fixed;
    background-size: cover;
    &:after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: $background-tint;
      opacity: .3;
      z-index: -1;
    }
    .application {
      background: none;
    }  
  }
  
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
