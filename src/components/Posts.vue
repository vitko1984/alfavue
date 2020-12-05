<template>
  <div class="l-posts-page">
    <roof-post v-if="roofId && !editPage" slot="roof-post" :saveRoof="saveRoof"></roof-post>
    <karkas-post v-if="karkasId && !editPage" slot="karkas-post" :saveKarkas="saveKarkas"></karkas-post>
    <build-post v-if="buildId && !editPage" slot="build-post" :saveBuild="saveBuild"></build-post>

    <roof-edit v-else-if="roofId && editPage"
      slot="roof-post"
      :selectedRoof="roof"
      :updateRoof="updateRoof">
    </roof-edit>

    <karkas-edit v-else-if="karkasId && editPage"
      slot="karkas-post"
      :selectedKarkas="karkas"
      :updateClient="updateKarkas">
    </karkas-edit>

    <build-edit v-else-if="buildId && editPage"
      slot="build-post"
      :selectedBuild="build"
      :updateClient="updateBuild">
    </build-edit>    
  </div>
</template>

<script>
  //import KarkasPost from '@/components/PriceKarkasPost';
  import RoofPost from '@/components/PriceRoofPost';
  //import BuildPost from '@/components/PriceBuildPost';
  //import KarkasEdit from '@/components/PriceKarkasEdit';
  import RoofEdit from '@/components/PriceRoofEdit';
  //import BuildEdit from '@/components/PriceBuildEdit';

  export default {
    props: [
      'roofId', 'karkasId', 'buildId', 'saveRoof', 
      'saveBuild', 'saveKarkas', 'karkas', 
      'roof', 'build', 'updateRoof', 'updateKarkas', 
      'updateBuild', 'editPage'
    ],
    components: {
      //'karkas-post': KarkasPost,
      'roof-post': RoofPost,
      //'build-post': BuildPost,
      //'karkas-edit': KarkasEdit,
      'roof-edit': RoofEdit,
      //'build-edit': BuildEdit
    }
  }
</script>