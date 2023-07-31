const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true
    }
  },
  methods: {
    addToCart(id){
      this.cart.push(id);
      console.log(this.cart)
    },
    removeFromCart(){
      this.cart.pop();
    }
  }

})