<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/user/index">花花世界</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link mx-1" href="#" to="/dashboard/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-1" href="#" to="/dashboard/orders">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-1" href="#" to="/dashboard/coupon">優惠券</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-1" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http.post(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$router.push('/login');
          }
        });
    },
  },
};
</script>
