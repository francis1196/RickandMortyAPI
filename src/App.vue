<template>
  <v-app>
    <Navbar />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    Navbar,
    Footer,
  },
});
</script>
