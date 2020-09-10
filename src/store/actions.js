export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid);
      //判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct);
        resolve('当前的商品数量+1')
      } else {
        payLoad.count =1;
        // context.state.cartList.push(payLoad)
        context.commit('addToCart', payLoad);
        resolve('添加了新的商品')
      }
    })
  }
}
