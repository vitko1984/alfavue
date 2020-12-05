<template>
  <div class="l-roof-post">
    <v-layout row wrap>
      <v-flex xs12 offset-md1 md1>
        <v-text-field label="№ п/п"
                      v-model="roof.serviceId"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
       </v-flex>

      <v-flex xs12 md2>
        <v-textarea label="Наименование"
                      v-model="roof.serviceName"
                      required
                      color="light-blue lightnen-1">
        </v-textarea>
      </v-flex>

      <v-flex xs12 md1>
        <v-text-field label="Ед. изм."
                      v-model="roof.unit"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md1>
        <v-text-field label="Цена"
                      v-model="roof.price"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-flex xs1 md1>
        <v-text-field label="Рейтинг"
                      v-model="roof.rating"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-flex xs12 md2>
        <v-textarea label="Фото"
                      v-model="roof.foto"
                      required
                      color="light-blue lighten-1">
        </v-textarea>
      </v-flex>                      


      <v-flex xs12 md2 offset-md10>
        <v-btn block rounded color="md-add-item-btn light-blue lighten-1" @click.native="saveRoof(roof)">Save</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['saveRoof'],
    data () {
      return {
        roof: {
          serviceId: null,  
          serviceName: null,
          unit: null,
          price: null,
          rating: null,
          foto: null
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/custom/styles";

  .uppercased {
    text-transform: uppercase;
  }

  .l-roof-post {
    label, input, .icon, .input-group__selections__comma, textarea {
      //color: #66bb6a!important;
      color: #29B6F6!important;
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .input-group__input {
      border-color: $border-color-input !important;

      .input-group--text-field__prefix {
        margin-bottom: 3px !important;
      }
    }

    .input-group--focused {
      .input-group__input {
        border-color: #66bb6a!important;
      }
    }
  }
</style>