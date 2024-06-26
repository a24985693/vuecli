<template>
  <UserNavbar></UserNavbar>
    <router-view>
    </router-view>
  <Footer></Footer>
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
