<template>
  <header class="l-header-container">  
    <v-row wrap justify-content-start class="l-basket-header">    
      <v-flex xs12 md1>
        <PriceIcon v-if="this.$store.getters.HEADER.iconName === 'PriceIcon'" width='45px' height='45px' class='Header-Icon' />
        <ContactIcon v-else-if="this.$store.getters.HEADER.iconName === 'ContactIcon'" width='45px' height='45px' class='Header-Icon' />
        <ClientIcon v-else-if="this.$store.getters.HEADER.iconName === 'ClientIcon'" width='45px' height='45px' class='Header-Icon' />
        <AboutIcon v-else-if="this.$store.getters.HEADER.iconName === 'AboutIcon'" width='55px' height='55px' class='Header-Icon' />
        <RoofIcon v-else-if="this.$store.getters.HEADER.iconName === 'RoofIcon'" width='45px' height='45px' class='Header-Icon' />
        <KarkasIcon v-else-if="this.$store.getters.HEADER.iconName === 'KarkasIcon'" width='55px' height='55px' class='Header-Icon' />
        <BuildIcon v-else-if="this.$store.getters.HEADER.iconName === 'BuildIcon'" width='45px' height='45px' class='Header-Icon' />              
        <HouseIcon v-else width='45px' height='45px' class='Header-Icon' />
       </v-flex>

      <v-flex xs12 md2>       
        <div class="Header-Title">{{this.$store.getters.HEADER.title}}</div>
      </v-flex>

      <v-flex xs12 md7>
        <v-row wrap>
          <div id="nav">
            <b-nav tabs>
                <b-nav-item to="/">Главная</b-nav-item> 
                <b-nav-item to="/about">О нас</b-nav-item> 
                <b-nav-item to="/krovlya">Кровельные работы</b-nav-item> 
                <b-nav-item to="/karkas">Каркасный дом</b-nav-item> 
                <b-nav-item to="/build">Общестрой</b-nav-item> 
                <b-nav-item to="/prices">Расценки</b-nav-item> 
                <b-nav-item to="/contacts">Контакты</b-nav-item>
                <b-nav-item to="/clients">Отзывы </b-nav-item>
            </b-nav>        
          </div>
        </v-row>
      </v-flex>              

      <v-flex xs12 offset-md1 md1 v-if="this.$store.getters.IS_AUTHENTICATED" >
        <div class="Header-UserName">{{this.$store.getters.AUTH_USER.username}}</div>
        <v-btn block color= "#6f001c81" class="Button white--text" @click.native ="Logout">Выйти</v-btn>
      </v-flex>
    </v-row>        
  </header>
</template>

<script>
import PriceIcon from '@/images/bill.svg';
import HouseIcon from '@/images/house.svg';
import ContactIcon from '@/images/contact.svg';
import AboutIcon from '@/images/about.svg';
import RoofIcon from '@/images/roof.svg';
import KarkasIcon from '@/images/karkas.svg';
import BuildIcon from '@/images/build.svg';
import ClientIcon from '@/images/clients.svg';
import { BNav, BNavItem } from 'bootstrap-vue';

export default {
  name: "Header", 
  components: {
    PriceIcon, 
    HouseIcon, 
    ContactIcon, 
    AboutIcon, 
    RoofIcon, 
    KarkasIcon, 
    BuildIcon,
    ClientIcon,
    BNav,
    BNavItem
    },
  props: {
    title: String,
    //userName: String,
    renderIcon: String
  },
  data() {
    return {
      
    }  
  },
  methods: {
    Logout: function () {
      this.$store.dispatch('LOGOUT')
      .then(() => {
        this.$router.push('/users')
      })
    }
  },     
}
</script>

<style lang="scss">
  @import "@/custom/styles";

  .l-header-container {
    background-color: $background-color;
    margin: 0 auto;
    padding: 0 15px;
    min-width: 272px;

    .l-basket-header {
      label, input, .icon, .input-group__selections__comma {
        //color: #29b6f6!important;
        color: white!important;
      }
    }

    .l-clients-header {
      label, input, .icon, .input-group__selections__comma {
        color: #66bb6a!important;
      }
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }  
    }

    .Header-Icon {
      fill: white;
      //margin-right: 20px;
      align-items: stretch;
    }

    #nav {
      align-items: baseline;//
      a {
        font-weight: bold;
        font-size: 16px;
        //color: #2c3e50;
        color: white;

        &.router-link-exact-active {
          //color: #42b983;
          color: #ab4a44;
          //color: #2c3e50;
        }
      }
    }

    .Header-Title {
      font-size: 24px;
      color:white;
      align-items: center;
    }

    .Header-UserName {
      font-size: 12px;
      color:white;
      align-items: center;;
    }      
  }  
</style>