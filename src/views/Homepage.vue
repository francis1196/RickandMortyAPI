<!--  This view shows 10 characters along with a button to order them
      Cards have been used to show the character.
      While the characters are read by http, the page is displayed loading.
      Each card shows the image of the character along with information, such as its name, status, location ... 
      and a button that leads to the details page, where more information about the character is shown. 
      A floating button has been designed that shows a window with the options to sort. 
      With this design the page is much simpler.
      The characters can be sorted ascending and descending by id, name and species.
      Once filtered a message is displayed that has been filtered correctly.-->

<template>
  <div class="homepage ma-5">
    <!--Character card -->
    <b-row>
      <b-col cols="12" md="4" v-for="character of characters" :key="character.id">
        <v-card class="mx-auto" color="#F9F9F9">
          <v-img
            :src="character.image"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="align-end fill-height" v-text="character.name"></v-card-title>
          </v-img>

          <v-list-item>
            <v-list-item-title>STATUS</v-list-item-title>

            <v-list-item-subtitle class="text-right">{{ character.status }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>SPECIES</v-list-item-title>

            <v-list-item-subtitle class="text-right">{{ character.species }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>GENDER</v-list-item-title>

            <v-list-item-subtitle class="text-right">{{ character.gender }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>ORIGIN</v-list-item-title>

            <v-list-item-subtitle class="text-right">{{ character.origin.name }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>LOCATION</v-list-item-title>

            <v-list-item-subtitle class="text-right">{{ character.location.name }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions class="justify-end">
            <router-link :to="{ name: 'detailpage', params: { id: character.id } }">
              <v-btn text>view Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </b-col>
    </b-row>

    <!-- Order button -->
    <v-btn color="#BDBDBD" fixed fab bottom right @click="dialog = !dialog">
      <v-icon>filter_list</v-icon>
    </v-btn>

    <!-- Window with filters, which opens when the button is pressed -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="Order by:"></v-text-field>
          <small class="grey--text">* Choose the option to order</small>
          <v-list-item @click="orderByIdAsc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_up</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by id</v-list-item-title>
              <v-list-item-subtitle>asc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="orderByIdDesc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_down</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by id</v-list-item-title>
              <v-list-item-subtitle>desc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="orderByNameAsc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_up</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by name</v-list-item-title>
              <v-list-item-subtitle>asc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="orderByNameDesc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_down</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by name</v-list-item-title>
              <v-list-item-subtitle>desc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="orderBySpeciesAsc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_up</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by species</v-list-item-title>
              <v-list-item-subtitle>asc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="orderBySpeciesDesc">
            <v-list-item-avatar>
              <v-icon>arrow_drop_down</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Order by species</v-list-item-title>
              <v-list-item-subtitle>desc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- message shown when ordered -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      The results have been ordered
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- loader screen -->
    <v-overlay :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { characterService } from '../service/character.service';
import { Character } from '../interface/character';

@Component({
  components: {},
})
export default class Homepage extends Vue {
  private characters: Character[] = [];
  private dialog: boolean = false;
  private loader: boolean = false;
  private snackbar: boolean = false;
  private timeout: number = 1700;

  // characters are searched when opening the page
  private created() {
    this.getCharacters();
  }

  private async getCharacters() {
    this.loader = true;
    this.characters = [];
    await characterService
      .getRandomCharacters()
      .then( (response) => (this.characters = response.data));
    this.loader = false;
  }

  // functions to order
  private orderByNameAsc() {
    this.characters.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    this.snackbar = true;
  }

  private orderByNameDesc() {
    this.characters.sort((a, b) => {
      if (b.name < a.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
      return 0;
    });

    this.snackbar = true;
  }

  private orderByIdAsc() {
    this.characters.sort((a, b) => a.id - b.id);

    this.snackbar = true;
  }

  private orderByIdDesc() {
    this.characters.sort((a, b) => b.id - a.id);

    this.snackbar = true;
  }

  private orderBySpeciesAsc() {
    this.characters.sort((a, b) => {
      if (a.species < b.species) {
        return -1;
      }
      if (a.species > b.species) {
        return 1;
      }
      return 0;
    });

    this.snackbar = true;
  }

  private orderBySpeciesDesc() {
    this.characters.sort((a, b) => {
      if (b.species < a.species) {
        return -1;
      }
      if (b.species > a.species) {
        return 1;
      }
      return 0;
    });

    this.snackbar = true;
  }
}
</script>

<style scoped>
</style>