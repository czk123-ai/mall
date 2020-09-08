<template>
  <div class="goods" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad() { //图片加载完成发送到home
        if (this.$route.path.indexOf('/home') !==-1){
          this.$bus.$emit('homeItemImgLoad')
        } else if (this.$route.path.indexOf('/detail') !==-1){//在详情页也用到了该组件所以要判断
          this.$bus.$emit('detailItemImgLoad')
        }
        // this.$bus.$emit('itemImageLoad')
      },
      itemClick() { //传递点击商品的iid
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    height: 40vh;
  /*图片屏幕占比*/
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
