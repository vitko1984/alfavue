<template>
  <div class="Header">  
    <div class="Header-Body">    
      <div class="flex-1 d-flex flex-row justify-content-start align-items-center">
        <PriceIcon v-if="this.$store.getters.HEADER.iconName === 'PriceIcon'" width='45px' height='45px' class='Header-Icon' />
        <ContactIcon v-else-if="this.$store.getters.HEADER.iconName === 'ContactIcon'" width='45px' height='45px' class='Header-Icon' />
        <ClientIcon v-else-if="this.$store.getters.HEADER.iconName === 'ClientIcon'" width='45px' height='45px' class='Header-Icon' />
        <AboutIcon v-else-if="this.$store.getters.HEADER.iconName === 'AboutIcon'" width='55px' height='55px' class='Header-Icon' />
        <RoofIcon v-else-if="this.$store.getters.HEADER.iconName === 'RoofIcon'" width='45px' height='45px' class='Header-Icon' />
        <KarkasIcon v-else-if="this.$store.getters.HEADER.iconName === 'KarkasIcon'" width='55px' height='55px' class='Header-Icon' />
        <BuildIcon v-else-if="this.$store.getters.HEADER.iconName === 'BuildIcon'" width='45px' height='45px' class='Header-Icon' />
        <HouseIcon v-else width='45px' height='45px' class='Header-Icon' />     
        <div class="Header-Title">{{this.$store.getters.HEADER.title}}</div>
      </div>
      <div id="nav">
        <b-nav tabs>
          <b-nav-item to="/">Главная</b-nav-item> 
          <b-nav-item to="/about">О нас</b-nav-item> 
          <b-nav-item to="/krovlya">Кровельные работы</b-nav-item> 
          <b-nav-item to="/karkas">Каркасный дом</b-nav-item> 
          <b-nav-item to="/build">Общестрой</b-nav-item> 
          <b-nav-item to="/prices">Расценки</b-nav-item> 
          <b-nav-item to="/contacts">Контакты</b-nav-item>
          <b-nav-item to="/clients">Клиенты</b-nav-item>
        </b-nav>        
      </div>             
      <div v-if="this.$store.getters.IS_AUTHENTICATED" class="flex-1 d-flex flex-row justify-content-end align-items-center">
        <div class="Header-UserName">{{this.$store.getters.AUTH_USER.username}}</div>
        <!--<a class="btn btn-primary Header-ExitBtn">-->
        <a class="Header-ExitBtn" @click ="Logout">Выйти</a>
      </div>
    </div>        
  </div>
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
.Header {
  color: white;
  //background-color: #039BE5;
  background-color: #6f001b;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.Header-Body {
  width: 100%;
  max-width: 1600px;
  min-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.Header-Icon {
  fill: white;
  margin-right: 20px;
}

.Header-Title {
  font-size: 24px;
}

.Header-UserName {
  font-size: 14px;
  margin-right: 20px;
}

.Header-ExitBtn {
  //border: 1px solid white;
  background-color: #6f001b;
  border-radius: 28px;
  border: 0;
  box-shadow: 0px 1px 1px #d9d9d9;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  padding: 5px 15px;
  text-decoration: none;
  transition-duration: 0.1s;
  transition-property: transform;
   &:hover {
    transform: scale(1.1);
   }
}

#nav {
  padding: 30px;
  display: flex;//
  //@at-rootflex-direction: row;//
  justify-content: space-around;//
  //justify-content: center;//
  align-items: center;//
  a {
    font-weight: bold;
    font-size: 10px;
    //color: #2c3e50;
    color: white;

    &.router-link-exact-active {
      //color: #42b983;
      color: #ab4a44;
      //color: #2c3e50;
    }
  }
}

</style>