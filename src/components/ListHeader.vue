<template>
  <header v-if="headers != null" class="l-list-header">
    <div class="md-list-header white--text"
      v-for="header in headers" :key="header.id">        
        {{ header.label }}
        <v-icon @click="sortTbl(header.key, sort * (-1))" color="light-blue lighten-1">mdi-menu-swap</v-icon>
      </div>    
  </header>
</template>

<script>
  export default {
    props: {
      headers: Array, 
      sort: Number, 
      sortTbl: Function
    }    
  }
</script>

<style lang="scss">
  @import "@/custom/styles";

  .l-list-header {
    display: none;
    width: 100%;

    @media (min-width: 601px) {
      margin: 25px 0 0;
      display: flex;
    }

    .md-list-header {
      //padding: 0 15px;      
      width: 100%;
      background-color: $background-color;
      border: 1px solid $border-color-input;
      display: flex;
      height: auto;
      align-items: center;
      justify-content: center;
      font-size: 18px;

      &:first-of-type, &:nth-of-type(4) {width: 10%}
      &:nth-of-type(2) {width: 53%;}
      &:nth-of-type(3), &:nth-of-type(5) {width: 12%;}

      @media (min-width: 601px) {justify-content: flex-start;}
    }
  }
</style>