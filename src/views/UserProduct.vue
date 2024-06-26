<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav style="margin-top:120px;" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/index">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/user/productsList">產品</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
        <article class="col-8">
          <h2>{{ product.title }}</h2>
          <div>{{ product.content }}</div>
          <div>{{ product.description }}</div>
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
        </article>
        <div class="col-4">
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
          <hr>
          <div class="row mb-3">
            <div class="col-8">
              <div class="input-group">
                <button class="btn btn-secondary"
                  @click="quantity = quantity - 1"
                  :disabled="quantity === 1">
                  -
                </button>
                <input type="number" class="form-control" v-model="quantity"
                  min="1" max="100"
                  @change="quantity = quantity">
                <button class="btn btn-secondary"
                  @click="quantity = quantity + 1"
                  :disabled="quantity === 100">
                  +
                </button>
              </div>
            </div>
            <div class="col text-end">
              <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id)">加到購物車
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      quantity: 1,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getProduct() {
      this.isLoading = true;
      const id = this.$route.params.productId;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        });
    },
    addToCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: this.product.id,
        qty: this.quantity,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProduct();
    this.emitter.emit('get-path', {
      fullPath: this.$route.fullPath,
    });
  },
};
</script>
