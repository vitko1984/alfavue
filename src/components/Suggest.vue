<template>
  <div>
    <input :list="randomid"
           defaultValue="defaultValue"
           ref="lowlevelinput"
           id="id" />
    <datalist :id="randomid">
      <option v-for="item in options"  :value="item" :key="item.id" />
    </datalist>
  </div>
</template>

<script>
  const randomid = Math.random().toString(16).substring(2);  
  export default {
    name: 'Suggest',
    props: {
      options: Array,  
      defaulValue: String,
      id: String
    },
    data() {
      return {
        randomid: randomid 
      }
    },
    methods: {
      getValue: () => this.refs.lowlevelinput.value,
      
    }      
  }
</script>

<style lang="scss"></style>