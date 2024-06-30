<template>
  <div class="view-height">
    <UserNavbar></UserNavbar>
    <div class="user-view">
      <router-view>
      </router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import UserNavbar from '@/components/UserNavbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    UserNavbar,
    Footer,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
