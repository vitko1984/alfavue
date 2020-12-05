<template>
  <div class="classNames({'Rating': true,'RatingReadonly': this.props.readonly,})">
    <v-rating 
    background-color="warning lighten-1" 
    color="warning lighten-1" 
    hover
    v-model="stars" 
    :length="max" 
    :readonly="readonly"
    @click="defaultValue(stars)"></v-rating>
  </div>
</template>

<script>

  export default {
    name: 'Rating',
    components: {},
    props: {
      defaultValue: Function,
      max: String,
      readonly: Boolean,
      id: String,
      Value: String
    },
    data: () => ({
        stars: this.props.Value
    }),
    computed: {

    },
    methods: {
      getValue() { // предоставляется всеми нашими полями ввода
        return this.state.rating;
      },
      setTemp(rating) { // при проходе над элементом указателя мыши
        this.tmpRating = rating;
      },
      setRating(rating) { // при щелчке
        this.tmpRating = rating;
        this.rating = rating;
      },
      reset() { // возвращение к реальному рейтингу при уводе указателя мыши
        this.setTemp(this.rating);
      },
      componentWillReceiveProps(nextProps) {// реагирование на внешние изменения
        this.setRating(nextProps.defaultValue);
      }                
    }    
  }
</script>

<style lang="scss"></style>