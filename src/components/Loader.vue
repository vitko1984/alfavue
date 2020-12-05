<template>
  <LoaderIcon width='50px' height='50px' class='Loader' />
</template>

<script>
import LoaderIcon from '@/images/loader.svg';

export default {
  name: "Loader",
  components: {
    LoaderIcon
  }
}
</script>

<style lang="scss">
  .Loader{
  //display: flex;
  //justify-content: center;
  margin: 10px;
}
</style>