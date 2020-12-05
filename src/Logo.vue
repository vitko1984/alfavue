<template>
      <div class="Price-Filter">
        <FilterTable class="Price-FilterForm"/>
      </div>
</template>

<script>
import FilterTable from "@/components/Filter";

export default {
  name: 'Logo',
  components: {FilterTable},
}
</script>

<style lang="scss">
.Price-Filter {
  margin-top: 40px;
}

.Price-FilterForm {
  display: flex;
  //justify-content: row;
  justify-content: space-around;
}
</style>