<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content">
        <div>
          <category-img :currentIndex="currentIndex"></category-img>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import CategoryImg from './childComps/CategoryImg'
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      CategoryImg,
      Scroll
    },
    data(){
      return {
        // categories: [],
        currentIndex: -1
      }
    },
    methods:{
      selectItem(index) {
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
