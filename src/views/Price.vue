<template>
  <div class="Price">
    <div class="Price-Body">
        <Table class="PriceList"/>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";

const TITLE = "Расценки";
//const USER = "Иванов Иван Иванович";

export default {
  name: 'Price',
  components: {Table},
  data() {
    return {

    }
  },
  created() {
    let header = {
    title: TITLE,
    //user: USER,
    iconName: "PriceIcon"
    } 
    this.$store.dispatch('SET_HEADER', header);
  }  
};
</script>

<style lang="scss">
.Price {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Price-HeaderBody {
  max-width: 1300px;
}

.Price-Body {
  flex: 1;
  max-width: 1300px;
  min-width: 700px;
}

.Price-FilterField {
  margin-left: 12px;
}
</style>