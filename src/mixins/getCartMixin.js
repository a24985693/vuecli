export default {
  data() {
    return {
      cart: {},
      cartLength: '',
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartLength = this.cart.carts.length;
          this.isLoading = false;
          this.emitter.emit('get-cart', {
            cartLength: this.cartLength,
          });
        });
    },
  },
  created() {
    this.getCart();
  },
};
