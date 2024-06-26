<template>
  <swiper :navigation="true" :modules="modules" class="mySwiper"
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }">
    <swiper-slide v-for="item in preferProducts" :key="item.id">
      <div class="card mx-auto h-100"
        @click.prevent="getProduct(item.id)" @keydown="getProduct(item.id)">
        <div class="overflow-hidden position-relative">
          <img :src="item.imageUrl" class="card-img-top w-100" alt="...">
          <span class="more-text text-white top-50 start-50 translate-middle">查看更多</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-truncate">{{ item.content }}</p>
        </div>
        <!-- <a class="btn btn-outline-blue"
          @click.prevent="getProduct(item.id)" @keydown="addtoCart(item.id)">查看更多
        </a> -->
        <div class="card-foot p-3 pt-0">
          <div class="btn-group btn-group-sm w-100">
            <button class="btn btn-outline-red"
              @click.stop="addtoCart(item.id)">加入購物車
            </button>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Pagination],
      preferProducts: [],
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url)
        .then((res) => {
          this.preferProducts = res.data.products;
          console.log(this.preferProducts);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
