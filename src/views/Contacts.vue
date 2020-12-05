<template>
  <div class="contacts">   
    <h1>Ну и наконец наши контакты!</h1>
  </div>
</template>

<script>
const TITLE = "Контакты";
//const USER = "Иванов Иван Иванович";

export default {
  name: "Contacts",
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
    iconName: "ContactIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }  
};
</script>