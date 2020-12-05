<template>
  <div class="about">    
    <h1>This is an about page</h1>
  </div>
</template>

<script>
const TITLE = "О нас";
//const USER = "Иванов Иван Иванович";

export default {
  name: "About",
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
    iconName: "AboutIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }
};
</script>
