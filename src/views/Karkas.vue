<template>
  <div class="karkas">  
    <h1>Добро пожаловать на страницу каркасного домостроения!</h1>
    <h2>Кнопки</h2>
    <div>Кнопка с v-on:click: <v-btn @click="clk">Кликай!!!</v-btn></div>
    <div>Со ссылкой: <v-btn href="http://vuejs.org">Следуй за мной!!!</v-btn></div>
    <div>С именем пользовательского класса: <v-btn class="Button white--text" color="#6f001c81">Я ничего не делаю!!!</v-btn></div>
    <h2>Suggest(Подсказка)</h2>
    <div><Suggest :options='opts' /></div>
    <h2>Rating</h2>
    <div>No initial value: <Rating /></div>
    <div>Initial value 4: <Rating Value="4" /></div>
    <div>This one goes to 11: <Rating max="11" :defaultValue="defaultValue" /></div>
    <div>Read-only: <Rating readonly Value="3" /></div>
  </div>
</template>

<script>
import Suggest from '@/components/Suggest';
import Rating from '@/components/Rating';
//import classNames from 'classnames';

const TITLE = "Каркасный дом";

export default {
  name: "Karkas",
  components: {Suggest, Rating},
  data () {
    return {
      opts: ["eenie", "meenie", "miney", "mo"]
    }
  },
  methods: {
    clk: () => alert('Ух!!!'),
    defaultValue(value) {console.log(value);}
  },
  mounted() {
    let header = {
    title: TITLE,
    iconName: "KarkasIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }  
};
</script>

<style lang="scss">
@import "@/custom/styles";
.karkas {color: white;}
</style>