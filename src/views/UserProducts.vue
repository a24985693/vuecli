<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="productsList row mb-5 g-5" style="margin-top:100px">
      <div class="col-3">
        <div class="sticky-md-top" style="top:120px">
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/user/index">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">
                產品
              </li>
            </ol>
          </nav>
          <div class="list-group list-group-flush" ref="list"
          @click="updateLink"
          @keydown="updateLink">
            <button class="list-group-item list-group-item-action"
            :class="{ active: isActive === '全部' }">全部
            </button>
            <button class="list-group-item list-group-item-action"
              :class="{ active: isActive === '花束' }">花束
            </button>
            <button class="list-group-item list-group-item-action"
              :class="{ active: isActive === '花瓶' }">花瓶
            </button>
            <button class="list-group-item list-group-item-action"
              :class="{ active: isActive === '花圈' }">花圈
            </button>
            <button class="list-group-item list-group-item-action"
              :class="{ active: isActive === '乾燥花' }">乾燥花
            </button>
          </div>
        </div>
      </div>
      <div class="col">
          <div class="row row-cols-3 mb-5 g-5 justify-content-bewtween">
            <template v-if="isActive === '全部'">
              <div class="col-4" v-for="item in products" :key="item.id">
                  <div class="card mx-auto h-100"
                    @click.prevent="getProduct(item.id)" @keydown="getProduct(item.id)">
                    <div class="overflow-hidden position-relative">
                      <div class="more-text text-dark text-center bg-secondary py-1
                        position-absolute bottom-0">
                        查看更多
                      </div>
                      <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
                        alt="..." height="180px">
                    </div>
                    <div class="card-body">
                      <span
                      @click.stop="setFav(item.id)"
                      @keypress.stop="setFav(item.id)">
                        <i :class="favState(item.id)">
                        </i>
                      </span>
                      <p class="fs-14 mb-1">#{{ item.category }}</p>
                      <!-- <div v-for="(item,i) in favlist" :key="i">{{ item.title }}</div> -->
                      <div class="d-none">
                        {{ favlist }}
                      </div>
                      <h5 class="card-title">{{ item.title }}</h5>
                      <div class="d-flex justify-content-between align-items-center">
                        <p class="fs-5 fw-semibold mb-0 text-pink" v-if="item.price">
                          NT${{ item.price }}
                        </p>
                        <p class="fs-5 fw-semibold mb-0 text-pink" v-else>
                          NT${{ item.origin_price }}
                        </p>
                        <del v-if="item.origin_price != item.price">
                          NT${{ item.origin_price }}
                        </del>
                      </div>
                    </div>
                    <div class="card-foot p-0">
                      <div class="btn-group btn-group-sm w-100">
                        <button class="btn btn-info rounded-0 py-2"
                          @click.stop="addtoCart(item.id)">
                          <i class="fa-solid fa-cart-shopping me-1"></i>
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </template>
            <template v-else>
              <div class="col-4" v-for="item in renderProducts" :key="item.id">
                <div class="card mx-auto h-100"
                  @click.prevent="getProduct(item.id)" @keydown="getProduct(item.id)">
                  <div class="overflow-hidden position-relative">
                    <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
                    alt="..." height="180px">
                    <span class="more-text fs-5 fw-bold text-white
                      top-50 start-50 translate-middle">
                      查看更多
                    </span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text text-truncate">{{ item.content }}</p>
                  </div>
                  <div class="card-foot p-3 pt-0">
                    <div class="btn-group btn-group-sm w-100">
                      <button class="btn btn-outline-red"
                        @click.stop="addtoCart(item.id)">加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        <Pagination :pagination="pagination"
          @update-page="getProducts"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  watch: {
    isActive() {
      this.renderProducts = this.products.filter((item) => item.category === this.isActive);
      console.log(this.renderProducts);
    },
  },
  inject: ['emitter'],
  data() {
    return {
      products: [],
      pagination: {},
      cart: {},
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
      isActive: '全部',
      renderProducts: [],
      favorited: JSON.parse(localStorage.getItem('favorite')) || [],
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
          console.log(this.products);
        });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
      console.log('getProduct');
    },
    addtoCart(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      console.log(id);
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res, 'addtoCart');
          this.isLoading = false;
        });
    },
    updateCart(item, quantity) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: quantity,
      };
      console.log(item);
      this.$http.put(url, { data: cart })
        .then((res) => {
          console.log(res);
          this.isLoading = false;
        });
    },
    updateLink(e) {
      this.isActive = e.target.textContent.trim();
      console.log(this.isActive);
    },
    setFav(id) {
      if (this.favorited.includes(id)) {
        this.favorited.splice(this.favorited.indexOf(id), 1);
      } else {
        this.favorited.push(id);
      }
      localStorage.setItem('favorite', JSON.stringify(this.favorited));
      console.log(localStorage);
      this.emitter.emit('get-like', {
        favorited: this.favorited,
      });
    },
  },
  created() {
    this.getProducts();
    this.emitter.emit('get-path', {
      fullPath: this.$route.fullPath,
    });
    this.emitter.emit('get-like', {
      favorited: this.favorited,
    });
    // localStorage.clear();
  },
  computed: {
    favState() { // 閉包傳送參數 https://segmentfault.com/q/1010000009648670
      return function (id) {
        if (this.favorited.includes(id)) {
          return 'fa-solid fa-heart';
        }
        return 'fa-regular fa-heart';
      };
    },
    favlist() {
      return this.products.filter((item) => this.favorited.includes(item.id));
    },
  },
};
</script>
