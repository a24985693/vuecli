<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transport fixed-top nav-transition"
   :class="{ navAnimated: scrollNum || (fullPath != '/user/index')}">
    <div class="container">
      <router-link class="navbar-brand" to="/user/index">
        <img src="../assets/images/navLogo.png" alt="" width="30px">
        花花世界</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/productsList">
              產品列表
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/productsList">
              常見問題
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/productsList">
              訂單查詢
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative" href="#">
              <i class="fa-solid fa-heart fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold"
              style=" ">
                {{ favLength }}
              </span>
            </a>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link position-relative"
            to="/user/cart">
              <i class="fa-solid fa-cart-shopping fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold">
                {{ cartLength }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      scrollNum: '',
      fullPath: '',
      favLength: '',
      cartLength: '',
    };
  },
  inject: ['emitter'],
  methods: {
    animated() {
      this.scrollNum = window.scrollY;
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartLength = this.cart.carts.length;
          // console.log(this.cartNum);
        });
    },
    getFavNum() {
      // console.log(localStorage.getItem('favorite'));
      if (localStorage.getItem('favorite')) {
        const favObj = localStorage.getItem('favorite');
        this.favLength = JSON.parse(favObj).length;
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.animated);
    this.fullPath = this.$route.fullPath;
    this.emitter.on('get-path', (item) => {
      this.fullPath = item.fullPath;
    });
    this.emitter.on('get-like', (item) => {
      const { favorited } = item;
      this.favLength = favorited.length;
    });
    this.emitter.on('get-cart', (item) => {
      this.cartLength = item.cartLength;
    });
    this.getCart();
    this.getFavNum();
  },
};
</script>
