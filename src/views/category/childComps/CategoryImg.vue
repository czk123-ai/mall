<template>
  <div>
    <!--<div>{{currentIndex}}</div>-->
    <img :src="require('@/assets/img/category/'+currentIndex+'.jpg')">
  </div>

</template>

<script>
  export default {
    name: "CategoryImg",
    props:{
      currentIndex: {
        default(){
          return 0
        }
      }
    }
  }
</script>

<style scoped>

</style>
