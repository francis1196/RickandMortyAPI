<!--    This component shows the development of the footer. -->

<template>
  <v-footer
    color="grey darken-2"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >

    <router-link :to="{ name: 'homepage' }">
      <v-btn
          color="white"
          text
          rounded
          class="my-2"
        >
          Homepage
      </v-btn>
    </router-link>
      

      <router-link :to="{ name: 'randomizerpage' }">
      <v-btn
          color="white"
          text
          rounded
          class="my-2"
        >
          RandomizerPage
      </v-btn>
    </router-link>

      <router-link :to="{ name: 'about' }">
      <v-btn
          color="white"
          text
          rounded
          class="my-2"
        >
          About
      </v-btn>
    </router-link>

      <v-col
        class="grey darken-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Rick and Morty Api <small>by Francisco Reyes</small></strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {

   private drawer: boolean = false;

}
</script>