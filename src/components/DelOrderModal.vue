<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel">刪除訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定要刪除 {{ tempOrder.create_at }} 嗎?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger"
            @click="$emit('delete-order')">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    order: {},
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      console.log(this.tempOrder.create_at);
    },
  },
  data() {
    return {
      tempOrder: {},
    };
  },
  mixins: [modalMixin],
};
</script>
