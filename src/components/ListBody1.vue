<template>
  <div v-if="data != null" class="Table">
    <b-table 
      :headers="this.$store.getters.COLUMNS.roofHeaders" 
      :items="data"
      striped 
      hover 
      bordered 
       />      
  </div>
</template>

<script>
  import { BTable } from 'bootstrap-vue';

  export default {
    name: 'ListBody',
    components: {
      'b-table': BTable    
    },
    props: ['data'], 
    data() {
      return {

      }
    } 
  }

</script>

<style lang="scss">
  .TableContainer {
  padding-top: 10px;
  padding-bottom: 10px;
}

.Table {
  padding-top: 10px;
  padding-bottom: 10px;
  tbody {
    td {
      border: none;
    }

    tr {
      &:nth-of-type(odd) {
        background-color: white;
      }

      &:nth-of-type(even) {
        background-color: #eeeeee;
      }
    }    
  }
}

.Table-Header {
  background-color: #424242;
  color: white;
  
  th {
    border: none;
  }
}
</style>