<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

const TITLE = "Домашняя";
//const USER = "Иванов Иван Иванович";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data () {
    return {

    }
  },
  beforeCreate() {
    let header = {
    title: TITLE,
    //user: USER,
    iconName: "HouseIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }  
};
</script>
