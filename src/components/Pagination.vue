<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(pagination.current_page-1)"
          :class="{ 'disabled': pagination.has_pre === false }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{ 'active': page === pagination.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(pagination.current_page+1)"
          :class="{ 'disabled': pagination.has_next === false }" >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {},
  },
  methods: {
    updatePage(page) {
      console.log(page);
      this.$emit('update-page', page);
    },
  },
};
</script>
