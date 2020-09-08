export default {
  addCart(context, payLoad) {
    //payLoadx新添加商品
    // let oldProduct =null;
    // for (let item of state.cartList){
    //   if (item.iid === payLoad.iid){
    //     oldProduct =item;
    //   }
    // }
    let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid);
    //判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit('addCounter', oldProduct)
    } else {
      payLoad.count =1;
      // context.state.cartList.push(payLoad)
      context.commit('addToCart', payLoad)
    }
  }
}
