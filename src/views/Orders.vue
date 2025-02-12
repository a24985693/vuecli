<template>
  <Loading :active="isLoading"></Loading>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">訂單編號</th>
        <th scope="col">Email</th>
        <th scope="col">購買項目</th>
        <th scope="col">應付金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
        <td scope="row">{{ item.create_at }}</td>
        <td>{{ item.user.email }}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="(product, key) in item.products" :key="key">
              品名:{{ product.product.title }} 數量:{{ product.product.num }}
            </li>
          </ul>
        </td>
        <td>{{ $filters.currency(item.total) }}</td>
        <td>
          <span v-if="item.is_paid" class="text-success">已付款</span>
          <span v-else class="text-muted">未付款</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-gray btn-sm"
              @click="openModal(item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <OrderModal ref="OrderModal" :order="tempOrder"
    @update-order="updateOrder"></OrderModal>
  <DelOrderModal ref="DelOrderModal" :order="tempOrder"
    @delete-order="deleteOrder"></DelOrderModal>
  <Pagination :pagination="pagination"
    @update-page="getOrders"></Pagination>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    OrderModal,
    DelOrderModal,
    Pagination,
  },
  data() {
    return {
      orders: {},
      tempOrder: {},
      pagination: {},
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          console.log(res.data);
          console.log(res.data.orders);
        });
    },
    openModal(item) {
      console.log(item);
      this.tempOrder = { ...item };
      this.$refs.OrderModal.showModal();
    },
    updateOrder(item) {
      this.isLoading = true;
      this.tempOrder = item;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http.put(url, { data: this.tempOrder })
        .then((res) => {
          console.log(res.data);
          this.isLoading = false;
          this.$refs.OrderModal.hideModal();
          const messageTitle = '更新成功';
          if (res.data.success) {
            this.getOrders();
            this.emitter.emit('push-message', {
              style: 'success',
              title: messageTitle,
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: messageTitle,
              content: res.data.message.join('、'),
            });
          }
        });
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      console.log(this.tempOrder);
      this.$refs.DelOrderModal.showModal();
    },
    deleteOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.$refs.DelOrderModal.hideModal();
          this.getOrders();
          if (res.data.success) {
            this.emitter.emit('delete-message', {
              style: 'success',
              title: '刪除成功',
            });
          } else {
            this.emitter.emit('delete-message', {
              style: 'danger',
              title: '刪除失敗',
              content: res.data.message.join('、'),
            });
          }
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
