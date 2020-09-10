<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'


  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "@/common/utils";
  import {backTopMixin} from "@/common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
    },
    mixins: [backTopMixin],
    data(){
      return{
        iid:null,
        topImages: [],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,

      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        //1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new  Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo);

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        if(data.rate.Crate !==0) {
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(() => { //渲染完成之后回调一次
        //   this.themeTopYs = [];
        //   //DOM渲染完成但是图片没有加载完
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })
      });

      getRecommend().then(res =>{
        this.recommends = res.data.list
      });

      this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
          this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        const positionY = -position.y;
        // console.log(positionY)
        let length = this.themeTopYs.length;
        for(let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //是否显示回到顶部

        this.listenIsBackTop(position)
      },
      addToCart() {
        //获取购物出需要显示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc =  this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品添加到购物车里
        // this.$store.commit('addCart', product)

        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
          console.log(this.$toast)
        }) //引入mapActions

        // this.$store.dispatch('addCart',product).then(res => { //actions.js
        //   console.log(res);
        //
        // })
      }
    },
    mounted() {
      // 1.图片加载完成的事件监听
      // 防抖将一页的图片多次请求变为1次在图片请求完成之后刷新（不刷新无法滚动）
      //$bus实在main.js里面重新创建了一个Vue实例完成父孙组件之间的事件传递
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('detailItemImgLoad', () => {
        refresh()
      })
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    overflow: hidden; /*使顶部和底部导航栏无法拖动*/

    /*等于*/
    height: calc(100% - 44px - 59px);
    /*position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;*/
  }
</style>
