import Vue from "vue";
import Vuex from "vuex";

import moment from "moment";
import {filter} from "underscore";

import { prices } from "@/lib/mock/MockData";
import service from '@/services/UserService';
import router from '@/router';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    data: [],
    columns: {
      basketHeaders: ['№ п/п', 'Наименование', 'Ед. изм.', 'Количество', 'Стоимость', 'Клиент', 'Дата'],
      roofHeaders: [
        {
          key: 'service_id',
          label: '№ п/п',
          sortable: true,
          thClass: "Table-Header"
        },
        {
          key: 'unit',
          label: 'Ед.изм.',
          sortable: false,
          thClass: "Table-Header"       
        },
        {
          key: 'price',    
          label: 'Цена',   
          sortable: true,
          thClass: "Table-Header"
        },
        {
          key: 'rating',
          label: 'Рейтинг',        
          sortable: true,
          class: "white--text",         
          user: '',
          iconName: ''
        },
        {
          key: 'foto',
          label: 'Фото',
          sortable: false,
          class: "white--text",
          thClass: "Table-Header"
        }
      ],
      headers: [
        {
          key: "good_id",
          label: '№ п/п',
          sortable: true,
          thClass: "Table-Header",
          thStyle: {
            width: "150px"
          },
          formatter: (value, key, item) => {
            moment.locale("ru");
            return moment(item.date * 1).format("lll");
          }
        },
        {
          key: "good",
          label: "Наименование",
          thClass: "Table-Header",
          sortable: false,                 
        },
        {
          key: "category_id",
          label: "Категория",
          thClass: "Table-Header",
          sortable: true
        },
        {
          key: "brand",
          label: "Марка",
          thClass: "Table-Header",
          sortable: false
        },
        {
          key: "rating",
          label: "Рейтинг",
          thClass: "Table-Header",
          sortable: true
        }, 
        {
          key: 'photo', 
          label: 'Фото',
          thClass: "Table-Header",
          sortable: false,
          thStyle: {
            width: "150px"
          }        
        }
      ]
    },  
    stat:{
      filter: {
        startDate: null,
        endDate: null,
        brandName: '',
        highRating: false
      }
    },
    auth: {
      token: localStorage.getItem('user-token') || '',
      status: '',
      user: {
        user_id: localStorage.getItem('user-id') || '',
        authenticated: false,
      },
    clients: []  
    }
  },     
  getters: {
    COLUMNS: state => state.columns,
    STAT: state => state.stat,
    DATA: state => state.data,
    HEADER: state => state.header,
    IS_AUTHENTICATED: state => !!state.auth.token,
    AUTH_STATUS: state => state.auth.status,
    AUTH_USER: state => state.auth.user,
    TOKEN: state => state.auth.token,
    CLIENTS: state => state.clients
  },
  mutations: {
    SET_STAT: (state, payload) => {state.stat = payload},
    SET_FILTER: (state, payload) => {state.stat.filter = payload;},
    SET_DATA: (state, payload) => {state.data = payload;},
    ADD_DATA: (state, payload) => {state.data.push(payload);},
    SET_HEADER: (state, payload) => {state.header = payload;},
    AUTH_REQUEST: (state, payload )=> state.auth.status = payload.status,
    AUTH_SUCCESS: (state, payload) => {
      state.auth.status = payload.status;
      state.auth.token = payload.token;
      state.auth.user = {...payload.user};
    },
    AUTH_ERROR: (state, payload) => state.auth.status = payload.status,
    AUTH_LOGOUT: (state) => {
      state.auth.status = '';
      state.auth.token = '';
      state.auth.user.user_id = '';
    },
    SET_CLIENTS: (state, payload) => {state.clients = payload;},
    ADD_CLIENTS: (state, payload) => {state.clients.push(payload);},    
  },
  actions: {
    SET_STAT: ({commit}, payload) => {commit('SET_STAT', payload);},
    SET_FILTER: ({commit}, payload) => {commit('SET_FILTER', payload);},
    SET_HEADER: ({commit}, payload) => {commit('SET_HEADER', payload);},
    SET_FILTER_DATA: ({commit}, payload) => {
      commit('SET_FILTER', payload);
      let filtered = filter(prices, o => {
        return (payload.startDate ? o.date >= payload.startDate : true) &&
        (payload.endDate ? o.date <= payload.endDate : true) &&
        (payload.brandName ? (payload.brandName.length > 2 ? o.brand.includes(payload.brandName) : true) : true) &&
        (payload.highRating ? o.rating === "10" : true);});
      commit('SET_DATA', filtered);
    },
    AUTHENTICATE: async ({commit}, payload) => {
        commit('AUTH_REQUEST', {status: 'loading'});
        const {credentials} = payload;
        service
        .get_token({...credentials})
        .then(({data}) => {
          const {success, token, user} = data;
          if(success) {  
          localStorage.setItem('user-token', token);
          localStorage.setItem('user-id', user._id);
          commit('AUTH_SUCCESS', {status: 'success',token: token, user: {...user, authenticated: true}});
          payload.context.validLogin = true;        
          };
        
          if (payload.redirect) router.push(payload.redirect);
          }).catch(({response: {data}}) => {
        commit('AUTH_ERROR', {status:'error'});
        payload.context.snackbar = true;
        payload.context.message = data.message;
        });
    },
    LOGOUT: async ({commit}) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('user-token'); // clear your user's token from localstorage
        localStorage.removeItem('user-id'); // clear your user's identificator from localstorage
    },
    SET_CLIENTS: ({commit}, payload) => {commit('SET_CLIENTS', payload);},
    ADD_CLIENTS: ({commit}, payload) => {commit('ADD_CLIENTS', payload);}
  },
  modules: {}
});