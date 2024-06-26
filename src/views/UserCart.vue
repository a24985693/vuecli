<template>
  <Loading :active="isLoading"></Loading>
  <div class="row mt-5 mb-5">
    <div class="col">
      <div class="sticky-top">
        <table class="table">
          <thead>
            <tr>
              <th width="80px"></th>
              <th>品名</th>
              <th width="160px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id" class="align-middle">
              <td>
                <button class="btn btn-sm btn-outline-danger"
                  @click="deleteCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group">
                  <button class="btn btn-outline-gray"
                    @click="updateCart(item, item.qty-1)"
                    :disabled="item.qty === 1">
                    -
                  </button>
                  <input type="number" class="form-control" v-model="item.qty"
                    min="1" max="100"
                    @change="updateCart(item, item.qty)">
                  <button class="btn btn-outline-gray"
                    @click="updateCart(item, item.qty+1)"
                    :disabled="item.qty === 100">
                    +
                  </button>
                </div>
              </td>
              <td class="text-end">
                <small class="text-success" v-if="item.coupon">
                  折扣價:
                </small>
                {{ $filters.currency(item.total) }}
              </td>
            </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">已套用優惠券</td>
              <td class="text-end text-success">{{ cart.carts[0].coupon.code }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="請輸入優惠碼"
            v-model="couponCode">
          <button class="btn btn-outline-gray"
            @click="addCouponCode">套用優惠券</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          console.log(res.data.data);
          this.cart = res.data.data;
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
          this.getCart();
          this.isLoading = false;
        });
    },
    deleteCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          this.getCart();
          this.isLoading = false;
        });
    },
    addCouponCode() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const dataCode = { code: this.couponCode };
      this.$http.post(url, { data: dataCode })
        .then((res) => {
          console.log(res);
          this.getCart();
          this.couponCode = '';
          this.isLoading = false;
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.$router.push(`/user/checkout/${res.data.orderId}`);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
