<template>
  <main class="l-roof-page">
    <!--<app-header :basketVisible="basketVisible" 
    @toggleVisibleData="basketVisible = !bascetVisible; roofId = !roofId" 
    :selectState="selectState" 
    :search="search" 
    v-model="search"></app-header>-->
    <div class="l-roof">
      <v-row wrap class="l-roof-search">
        <v-flex xs12 md5>
          <v-text-field v-model="searchValue"
            label="Поиск"           
            :color="basketVisible ? 'light-blue lighten-1' : 'green lighten-1'"
            append-icon="search"
            @input="searchText"
            @click:append="toggleSearch"
            clearable
            :rules="rules"
            hide-details="auto">
          </v-text-field>
        </v-flex>
        <v-flex xs12 offset-md2 md5>
          <v-select v-model="status"
            label="Категории поиска"
            :color="basketVisible ? 'light-blue lighten-1' : 'green lighten-1'"            
            :items="statusItems"
            single-line>
          </v-select>
        </v-flex>
      </v-row>
      <h4 class="white--text text-xs-center my-0">
        Наши приемлемые цены - твой заказ
      </h4>

      <list v-if="ListPage">
        <list-header slot="list-header" 
        :headers="this.$store.getters.COLUMNS.roofHeaders" 
        :sortTbl="sortTbl"
        :sort="sort"></list-header>
        <list-body slot="list-body" 
        :basketVisible="basketVisible" 
        :data="this.$store.getters.DATA" 
        :deleteItem="deleteItem" 
        :getPriceRoof="getPriceRoof" 
        :parsedPriceRoof="parsedPriceRoof"></list-body>
      </list>

      <Posts v-else-if="createPage"
        :roofId="roofId"
        :editPage="editPage"        
        :saveRoof="saveRoof"
        :roof="price_roof"
        :updateRoof="updateRoof">
      </Posts>
    </div>

    <v-snackbar :timeout="timeout"
                bottom="bottom"
                :color="snackColor"
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
               slot="activator" 
               @click.native="roofId = true; listPage = false; editPage = false; createPage = true">
            <v-icon>assignment</v-icon>
          </v-btn>
          <span>Добавить документ</span>
        </v-tooltip>

        <v-tooltip left>
          <v-btn color="green lighten-1"
               dark
               small
               fab
               slot="activator" 
               @click.native="roofId = false; listPage = false; editPage = false; createPage = true">
              <v-icon>account_circle</v-icon>
          </v-btn>
          <span>Добавить нового клиента</span>
        </v-tooltip>

      </v-speed-dial>
    </v-fab-transition>    
  </main>
</template>

<script>
import roof from '@/services/PriceRoofService';
//import basket from '@/services/BasketService';
import List from '@/components/List';
import ListHeader from '@/components/ListHeader';
import ListBody from '@/components/ListBody';
import Posts from '@/components/Posts'

//import {store} from '@/store';

const TITLE = "Кровельные работы";
let preSearchData = null;

export default {
  name: "Roof",
  components: {
    'list': List,
    'list-header': ListHeader,
    'list-body': ListBody,
    Posts
  },
  data () {
    return {
      sort: 1,
      keyName: 'service_id',
      serviceName: '', 
      status: '',
      search: false,
      searchValue: '',
      statusItems: [
        'Кровельные работы', 'Монтаж металлочерепицы', 'Монтаж профнастила', 'Монтаж натуральной черепицы', 'Монтаж катепала', 'Монтаж мягкой кровли', 'Ремонт кровли'
      ],
      basketVisible: true,
      snackbar: false,
      timeout: 6000,
      message: '',
      fab: false ,
      ListPage: true,
      createPage: false,
      roofId: true,
      editPage: false,
      rules: [
        value => !!value || 'Ввести...',
        value => (value && value.length >= 3) || 'Мин 3 символа...',
      ],         
    }
  },
  created() {
    let header = {
    title: TITLE,
    iconName: "RoofIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  },
  methods: {
    async getPrices() {
      roof
      .find({params: { 
          serviceName: this.serviceName, 
          sort: this.sort, 
          key: this.keyName
          }}).then(({data}) => {
              const priceRoof = this.dataParser(data, 'service_id', 'service', 'unit', 'price', 'rating', 'foto');
              this.$store.dispatch('SET_ALL_DATA', priceRoof);
              console.log(priceRoof);
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
    },
    async saveRoof (price_roof) {
      roof
        .post_roof({price_roof})
        .then(res => {
          this.resetFields(price_roof)
          this.snackbar = true
          this.message = res.data.message
          this.snackColor = 'light-blue lighten-1'
          this.getPrices()
        })
        .catch(error => {
          this.errorHandler(error)
        })
      },
    resetFields (item) {
      for (let key in item) {
        item[key] = null;

        if (key === 'quantity' || key === 'price') {
          item[key] = 0;
          };

          item['items'] = [];
      }
    },
    errorHandler (error) {
      const status = error.response.status;
      this.snackbar = true;
      this.snackColor = 'red lighten-1';
      if (status === 404) {
        this.message = 'Неверный запрос...';
      } else if (status === 401 || status === 403) {
        this.message = 'Неавторизовван...';
      } else if (status === 400) {
        this.message = 'Неверно... А может идет передача данных...';
      } else {
        this.message = error.message;
      }
    },
    searchText() {
      const needle = this.searchValue.toLowerCase();
      if (!needle) { // строка поиска будет удалена
        this.$store.dispatch('SET_ALL_DATA', preSearchData);
        return;
      };
      console.log(this.searchValue.toLowerCase());
      console.log(this.search);
      const idx = 'service'; // в каком столбце искать
      const searchdata = preSearchData.filter(function(row) {
      return row[idx].toString().toLowerCase().indexOf(needle)
      > -1;
      });
      this.$store.dispatch('SET_ALL_DATA', searchdata);
    },
    sortTbl(key, sort) {
      this.keyName = key;
      console.log(this.keyName);      
      this.sort = sort;
      console.log(this.sort);
      this.getPrices();      
    }, 
    toggleSearch() {
      if (this.search) {
        this.$store.dispatch('SET_ALL_DATA', preSearchData);
        this.search = false;} 
        else {
          preSearchData = this.$store.getters.DATA;
          this.search = true;
        }
      this.snackbar = this.search;
      this.snackColor = 'light-blue lightnen-1'
      this.message = 'Поиск включен...';
    }  
  },  
  mounted() {
    this.getPrices();    
  }
};
</script>

<style lang="scss">
 @import "@/custom/styles";
  .l-roof {
    background-color: transparent;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
    .l-roof-search {
      display: flex;
      label, .icon, input , .v-select__selection--comma {color: #29B6F6!important;} 
    }   
  }  
</style>