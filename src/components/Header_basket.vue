<template>
  <header class="l-header-container">
    <v-layout row wrap :class="basketVisible ? 'l-basket-header' : 'l-clients-header'">
      <v-flex xs12 md5>
        <v-text-field v-model="searchValue"
                      label="Поиск"
                      append-icon="search"
                      :color="basketVisible ? 'light-blue lighten-1' : 'green lighten-1'" >
        </v-text-field>
      </v-flex>

      <v-flex xs12 offset-md1 md1>
        <v-btn block
               :color="basketVisible ? 'light-blue lighten-1 text--green' : 'green lighten-1'"
               @click.native="$emit(toggleVisibleData)" class="btn">
               {{ basketVisible ? "Клиенты" : "Корзина" }}
        </v-btn>
      </v-flex>

      <v-flex xs12 offset-md1 md2>
        <v-select label="Выбор действия"
                  :color="basketVisible ? 'light-blue lighten-1 blue--text' : 'green lighten-1'"
                  v-model="status"
                  id=""
                  :items="statusItems"
                  single-line>
        </v-select>
      </v-flex>

      <v-flex xs12 offset-md1 md1>
        <v-btn block color="brown white--text" @click.native="submitSignout()" class="btn">Выйти</v-btn>
      </v-flex>
    </v-layout>
  </header>
</template>

<script>
export default {
  props: ['basketVisible'],
  data () {
    return {
      search: '',
      status: '',
      statusItems: ['Извлечь все', 'Добавить', 'Удалить', 'Показать', 'Записать', 'Редактировать']
      }
    },
  methods: {
    submitSignout () {
      this.$store.dispatch('LOGOUT')
      .then(() => {
        this.$router.push('/users')
      })
    }
  }
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
      label, input, icon, input-group__selections__comma {
        color: #29b6f6!important;
      }
    }

    .l-clients-header {
      label, input, icon, .input-group__selections__comma {
        color: #66bb6a!important;
      }
    }

    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }

    .btn {
      margin-top: 17px;
      border-radius: 28px;
      border: 0;
      box-shadow: 0px 1px 1px #d9d9d9;
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      padding: 5px 15px;
      text-decoration: none;
      transition-duration: 0.1s;
      transition-property: transform;
      //color: #6f001b;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>