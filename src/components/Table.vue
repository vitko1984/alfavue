<template>
  <div class="Table">
    <!--<BTable
      :expandRow='expandRow'
      :primary-key='keyField'
      :table-class="cn('Table', className)"
      :rowStyle='this.getRowStyle'
      :noDataIndication='noDataText' />-->
    <Loader v-if="this.$store.getters.STAT.isLoading === true" />  
    <BTable v-else-if="this.$store.getters.STAT.data" striped hover bordered :items="this.$store.getters.STAT.data" :fields="this.$store.getters.COLUMNS.headers" />
    <h2 v-else >{{'Нет данных'}}</h2>
  </div>    
</template>

<script>
import { BTable } from "bootstrap-vue";

import Loader from '@/components/Loader';

//const NO_DATA_TEXT = 'Данных нет';

export default {
  name: "Table",
  components: {
    BTable,
    Loader
  },
  data() {
    return {
      //data: data
    };
  },
  methods: {}
};
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