<template> 
  <section v-if="data != null" class="l-list-body white--text">    
    <div class="md-list-item"  v-for="item in data" :key="item.id">  
      <div v-for="info in item" :key="info.id" :class="basketVisible ? 'md-roof-info white--text' : 'md-karkas-info white--text'">
        <div v-if="info != item._id">{{ info }}</div>   
      </div>
      <div v-if="basketVisible" :class="basketVisible ? 'l-roof-actions white--text' : 'l-karkas-actions white--text'">
        <v-btn small text color="yellow accent-1">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <v-btn small text color="red lighten-1">
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>

  export default {
    name: 'ListBody',
    props: ['data', 'basketVisible'],
    components: {},
    data() {
      return {

      }
    },  
  }
</script>

<style lang="scss">
  @import "@/custom/styles";

  .data-table {
    padding-top: 10px;
    padding-bottom: 10px;
    th {
      border: none;
    }
    tbody {
      td {
        border: none;
      }

      tr {
        &:nth-of-type(odd) {
          //background-color: white;
          //background-color: rgba(102, 187, 106, 0.45);
          background-color: #eeeeee11 !important;
          color: greenyellow;
        }

        &:nth-of-type(even) {
          //background-color: #eeeeee;
          //background-color: transparent;
          //background-color:rgba(0, 175, 255, 0.45);
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: greenyellow;
        }
      } 
    }
  
    txt-field {
      color: greenyellow;        
    }   
  }

  .l-list-body {
    display: flex;
    flex-direction: column;

    .md-list-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 15px 0;

      @media (min-width: 960px) {
        flex-direction: row;
        margin: 0;
      }

      .md-roof-info {
        //flex-basis: 17%;
        width: 100%;
        background-color: rgba(0, 175, 255, 0.45);
        //border: 1px solid $border-color-input;
        padding: 0 15px;
        display: flex;
        height: auto;
        align-items: stretch;
        justify-content: center;
        text-align: left;

        &:first-of-type, &:nth-of-type(4) {width: 8%}

        &:nth-of-type(2) {width: 65%;}

        &:nth-of-type(3), &:nth-of-type(5) {width: 13%;}

        @media (min-width: 601px) {
          justify-content: flex-start;
        }
      }

      .md-karkas-info {
        @extend .md-roof-info;
        background-color: rgba(102, 187, 106, 0.45)!important;

        &:nth-of-type(2) {
          text-transform: none;
        }
      }      

      .l-roof-actions {
        flex-basis: 25%;
        display: flex;
        background-color: rgba(0, 175, 255, 0.45);
        //border: 1px solid $border-color-input;
        align-items: center;
        justify-content: center;

        .btn {
          min-width: 45px !important;
          margin: 0 5px !important;
        }
      }

      .l-karkas-actions {
        @extend .l-roof-actions;
        background-color: rgba(102, 187, 106, 0.45)!important;
      }      
    }
  }
</style>