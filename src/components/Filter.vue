<template>
 <div class="Filter">
  <BFormGroup label = "С какой даты:" class="form-group" >
    <Datepicker
     v-model="startDate"
     name="startDate"
     :format="momentFormat"
     type="datetime"
     :change="onChangeFilterDateField" 
     class="datepicker" />
  </BFormGroup>
  <BFormGroup label = "По какую дату:" class="form-group" >  
    <Datepicker 
     v-model="endDate"
     name="endDate"
     :format="momentFormat" 
     type="datetime"
     :change="onChangeFilterDateField"
     class="datepicker" />
  </BFormGroup>
  <BFormGroup label = "Марка(брэнд):" class="form-group">    
    <BFormInput 
    v-model="brandName"
    name="brandName" 
    size = "sm"
    :change="onChangeFilterField"
    class="form-input" />
  </BFormGroup>
  <BFormGroup label = "Макс. рейтинг:" class="checkbox-group">  
    <BFormCheckbox 
     v-model="highRating"
     value="true"
      unchecked-value="false"
     name="hidhRating"
     :change="onChangeFilterField"
     class="checkbox" />
   </BFormGroup>
   <BButton
    class='Prices-SearchBtn'
    @click="onSearch">
    <SearchIcon width='20px' height='20px' class='Prices-SearchBtnIcon'/>
   </BButton>    
 </div>
</template>

<script>
 import { /*BCard,*/ BFormGroup, BFormInput, BFormCheckbox, BButton } from "bootstrap-vue";
 import Datepicker from "vue2-datepicker";
 import "vue2-datepicker/index.css";
 import moment from "moment";

 import SearchIcon from '@/images/search.svg';

 import service from '@/services/PriceService';

 let filter = {};

 export default {
  name: "FilterTable",
  components: {
    BFormGroup,
    Datepicker,
    BFormInput,
    BFormCheckbox,
    BButton,
    SearchIcon
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      brandName: "",
      highRating:false,
      momentFormat: {
        stringify: (date) => {return date ? moment(date * 1).format('LLL') : ""},
        parse: (value) => {return value ? moment(value, 'LLL').toDate() : null}
      }
  };    
 },
 computed: {
   onChangeFilterDateField() {
    return this.startDate? this.$store.dispatch('SET_FILTER_DATA', {...filter, ...{startDate: this.startDate && this.startDate.getTime(), endDate: this.endDate && this.endDate.getTime()}}):
    this.endDate? this.$store.dispatch('SET_FILTER_DATA', {...filter, ...{startDate: this.startDate && this.startDate.getTime(), endDate: this.endDate && this.endDate.getTime()}}): null;
   },
   onChangeFilterField() {
    let search = {};
    if(this.brandName !== "") search.brandName = this.brandName;
    if(this.highRating === 'true') search.highRating = this.highRating;
    return this.$store.dispatch('SET_FILTER_DATA', search); 
   }
 },
 methods: {
   onSearch() {
     this.load();
   },
   async load() {
    let stat = this.$store.getters.STAT;
    console.log(stat);
    this.$store.dispatch('SET_STAT', {...stat, isLoading: true });

    service
      .find({ filter: stat.filter, url: '/prices' })
      .then(({ success, data }) => {
        if (success) {
          this.$store.dispatch('SET_STAT', {
            ...stat, data, isLoading: false
          })
        }
      })
   }
 },
 created() {
   this.load();
 }
}
</script>
 
<style lang="scss">
.Filter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .form-group {
  font-size: 13px;
  font-weight: bold;
  color: white;
  font-family: "Open Sans Semibold", sans-serif;
    .datepicker {
      margin-left: 12px;
      width: 250px;
      height: 35px
    }
    .form-input {
      margin-left: 12px;
      width: 250px;
      font-size: 14px;
      border-radius: 3px;
      border: 1px solid #dddddd;
      height: 35px
    } 
  }                  
  .checkbox-group {
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  color: white;
  font-family: "Open Sans Semibold", sans-serif;  
  //font-weight: 400;
  vertical-align: middle;  
    .checkbox {
      vertical-align: middle;
      margin-right: 5px;
    } 
  }
  .Prices-SearchBtnIcon {
    fill: white;
  }
   .Prices-SearchBtn {
    height: 35px;
    margin-left: 12px;
    line-height: 1;
    //background-color: #039BE5;
    background-color: #6f001b;
   }
}
</style>