<template>
  <main class="l-clients-page">
    <!--<app-header :basketVisible="basketVisible" @toggleVisibleData="basketVisible = !bascetVisible"></app-header>-->
    <div class="l-clients">
      <h4 class="white--text text-xs-center my-0">
        Отзывы:
      </h4>

      <list>
        <list-header slot="list-header" :headers="this.$store.getters.COLUMNS.comentHeaders">
        </list-header>
        <list-body slot="list-body" 
        :basketVisible="basketVisible" 
        :data="data">
        </list-body>
      </list>
    </div>
    <v-snackbar :timeout="timeout"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
    <v-fab-transition>
      <v-speed-dial v-model="fab"
                bottom
                right
                fixed
                direction="top"
                transition="scale-transition">
      <v-btn slot="activator"
             color="red lighten-1"
             dark
             fab
             v-model="fab">
            <v-icon>add</v-icon>
            <v-icon>close</v-icon>
      </v-btn>

      <v-tooltip left>
        <v-btn color="light-blue lighten-1"
               dark
               small
               fab
               slot="activator">
              <v-icon>assignment</v-icon>
        </v-btn>
        <span>Добавить документ</span>
      </v-tooltip>

      <v-tooltip left>
        <v-btn color="green lighten-1"
               dark
               small
               fab
               slot="activator">
              <v-icon>account_circle</v-icon>
        </v-btn>
        <span>Добавить нового клиента</span>
      </v-tooltip>

  </v-speed-dial>
</v-fab-transition>    
  </main>
</template>

<script>
import client from '@/services/ClientService';
import basket from '@/services/BasketService';
import List from '@/components/List'
import ListHeader from '@/components/ListHeader'
import ListBody from '@/components/ListBody'

const TITLE = "Отзывы клиентов";
import {store} from '@/store'; 

export default {
  name: "Clients",
  components: {
    'list': List,
    'list-header': ListHeader,
    'list-body': ListBody
  },
  data () {
    return {
      sort: 1,
      data: ['01.01.2020', 'Ваня и Вася', 'Кровля крыши', '5', 'Отличная работа. Молодцы ребята!'],
      basketVisible: true,
      snackbar: false,
      timeout: 6000,
      message: '',
      fab: false      
    }
  },
  created() {
    let header = {
    title: TITLE,
    //user: USER,
    iconName: "ClientIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  },  
  methods: {
    async getAllBasket() {
      basket
      .find_all({headers: {'Authorization': `Bearer ${store.getters.TOKEN}`}, 
        params: { user_id: this.$store.getters.AUTH_USER._id }}).then(({data}) => {
          this.basket = this.dataParser(data, '_id', 'client', 'title', 'state');
        }).catch(error => {
          this.snackbar = true;
          this.message = error.message;          
        })
      },
    async getAllClients() {
      client
      .find_all({headers: {'Authorization': `Bearer ${store.getters.TOKEN}`},
        params: { user_id: this.$store.getters.AUTH_USER._id}}).then(({data}) => {
              this.clients = this.dataParser(data, '_id', 'client', 'email', 'phone');
        }).catch(error => {
          this.snackbar = true;
          this.message = error.message;
        });
    },  
    dataParser (targetedArray, ...options) {
      let parsedData = []
      targetedArray.forEach(item => {
        let parsedItem = {}
        options.forEach(option => (parsedItem[option] = item[option]))
        parsedData.push(parsedItem)
      })
      return parsedData;
    }
  },
  mounted() {
    this.getAllBasket();
    this.getAllClients();
  }
};
</script>

<style lang="scss" scoped>
 @import "./../custom/styles";

  .l-clients {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>
