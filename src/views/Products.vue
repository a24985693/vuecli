<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button type="button" class="btn btn-secondary"
      @click="openModal(true)">
      新增產品
    </button>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td scope="row">{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ $filters.currency(item.origin_price) }}</td>
        <td>{{ $filters.currency(item.price) }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">不啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-gray btn-sm"
            @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pagination="pagination"
    @update-page="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct"
    @update-product="updateProduct"></ProductModal>
  <DeleteModal ref="deleteModal" :product="tempProduct"
    @delete-product="deleteProduct"></DeleteModal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DeleteModal from '../components/DeleteModal.vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (!isNew) {
        this.tempProduct = { ...item };
      } else {
        this.tempProduct = {};
      }
      this.$refs.productModal.showModal();
    },
    openDelModal(item) {
      this.tempProduct = item;
      this.$refs.deleteModal.showModal();
    },
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        method = 'put';
      }
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false;
          this.$refs.productModal.hideModal();
          let messageTitle = '新增成功';
          if (!this.isNew) {
            messageTitle = '更新成功';
          }
          if (res.data.success) {
            this.getProducts();
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
    deleteProduct(id) {
      console.log(id);
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http.delete(url)
        .then((res) => {
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
          this.isLoading = false;
          this.$refs.deleteModal.hideModal();
          this.getProducts();
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
