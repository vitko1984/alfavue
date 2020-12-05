<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Ваш логин"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
        
        <v-text-field label="Ваш пароль"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn text color="light-blue lighten-1" @click="signUpVisible = true">Создать аккаунт</v-btn>
        <v-btn block color="light-blue lighten-1" @click="submitAuthentication()">Войти</v-btn>
      </v-form>
    </div>

    <div class="l-signup" v-if="signUpVisible">
      <v-form v-model="validSignUp">

        <v-text-field label="Ваш логин"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Ваш пароль"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-text-field label="Подтвердите пароль"
                      v-model="newUser.password_confirm"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="doublePasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (doublePasswordVisible = !doublePasswordVisible)"
                      :type="doublePasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>

        <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Зарегистрироваться</v-btn>
      </v-form>
    </div>

    <v-snackbar timeout="6000"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
  //import Authentication from '@/views/Authentication'
  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        signUpVisible: false,
        loginPasswordVisible: false,
        signUpPasswordVisible: false,
        doublePasswordVisible: false,
        rules: [ (value) => !!value || 'Поле не заполнено...' ],
        credentials: {
          username: '',
          password: ''
        },
        newUser: {
          username: '',
          password: '',
          password_confirm: '',
          is_admin: null
        },
        message: ''
      }
    },
    methods: {
      submitAuthentication () {
        //Authentication.authenticate(this, this.credentials, '/clients');
        this.$store.dispatch('AUTHENTICATE', {context: this, credentials: {url: '/users', body: this.credentials}, redirect: '/clients'});
      },

      submitSignUp () {
        //Authentication.signup(this, this.newUser, '/clients');
        this.$store.dispatch('AUTHENTICATE', {context: this, credentials: {url: '/users/register', body: this.newUser}, redirect: '/clients'});
      }
    }        
  }
</script>

<style lang="scss">
  @import "@/custom/styles";
    .l-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
    //color: #90caf9;
    label, input, .icon {
      color: #29b6f6!important;
    }
    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }
    .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }

</style>