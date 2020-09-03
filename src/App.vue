<template>
  <div id="app">
    <keep-alive exclude="Detail"> <!--每次点击的详情页面都是新的-->
      <router-view/>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  export default{
    name:'app',
    components:{
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
