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
            <a class="nav-link position-relative" href="#">
              <i class="fa-solid fa-heart fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold"
              style=" ">
                {{ favoritedNum }}
              </span>
            </a>
          </li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative" href="#">
              <i class="fa-solid fa-cart-shopping fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold">
                4
              </span>
            </a>
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
      favoritedNum: '',
    };
  },
  inject: ['emitter'],
  methods: {
    animated() {
      this.scrollNum = window.scrollY;
    },
  },
  created() {
    window.addEventListener('scroll', this.animated);
    this.fullPath = this.$route.fullPath;
    this.emitter.on('get-path', (item) => {
      this.fullPath = item.fullPath;
      console.log(this.fullPath);
    });
    this.emitter.on('get-like', (item) => {
      const { favorited } = item;
      this.favoritedNum = favorited.length;
      console.log(this.favoritedNum);
    });
  },
};
</script>
