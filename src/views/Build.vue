<template>
  <div class="build">    
    <h1>Добро пожаловать на страницу общестроительных работ!</h1>
  </div>
</template>

<script>
const TITLE = "Общестрой";
//const USER = "Иванов Иван Иванович";

export default {
  name: "Build",
  components: {

  },
  data () {
    return {

    }
  },
  mounted() {
    let header = {
    title: TITLE,
    //user: USER,
    iconName: "BuildIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }  
};
</script>