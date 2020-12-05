<template>
  <div class="services">
    <Header 
      :title="title"
      :userName="user"
      className="Price-Header"
      bodyClassName="Price-HeaderBody"
      :renderIcon="iconName" />    
    <h1>Наши сервисы:</h1>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

const TITLE = "Сервисы";
const USER = "Иванов Иван Иванович";

export default {
  name: "Services",
  components: {
    Header
  },
  data () {
    return {
      title: TITLE,
      user: USER,
      iconName: "ServicesIcon"
    }
  }
};
</script>