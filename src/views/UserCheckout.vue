<template>
  <div class="row justify-content-center mt-5 mb-3">
    <div class="col-6">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">品名</th>
          <th scope="col">數量</th>
          <th scope="col">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td>{{ $filters.currency(item.final_total) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr v-if="couponCode">
          <td colspan="2" class="text-end text-success">已使用優惠券</td>
          <td class="text-success">{{ couponCode }}</td>
        </tr>
        <tr>
          <td colspan="2" class="text-end">總計</td>
          <td>{{ $filters.currency(order.total) }}</td>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-6">
      <table class="table">
        <tbody>
          <tr>
            <th>Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>收件人姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td v-if="!order.is_paid">尚未付款</td>
            <td v-else class="text-success">付款完成</td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="!order.is_paid">
        <button class="btn btn-danger" @click="payOrder">去付款</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
      },
      couponCode: '',
    };
  },
  methods: {
    getOrder() {
      const { orderId } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.$http.get(url)
        .then((res) => {
          console.log(res.data);
          this.order = res.data.order;
          const key = Object.keys(res.data.order.products)[0];
          const productKey = res.data.order.products[key];
          if (productKey.coupon) {
            this.couponCode = productKey.coupon.code;
          }
        });
    },
    payOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.$http.post(url)
        .then((res) => {
          console.log(res);
          this.getOrder();
        });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
