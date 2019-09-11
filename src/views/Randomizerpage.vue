<!--  This view shows a character randomly selected from the api.
      While the characters are read by http, the page is displayed loading.
      A card has been used to show the character. The card includes a picture of 
      the character along with information about it, and a button that takes you to the details page.
      A floating button has been implemented which, when pressed, searches for a new random character -->

<template>
  <div class="randomizerpage ma-5">
    <v-container>
      <!-- Character card -->
      <v-card v-if="character.length !== 0">
        <v-container class="pa-4">
          <v-row justify="center">
            <h1>
              <small>{{character.id}}:</small>
              {{(character.name).toUpperCase()}}
            </h1>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-col>
              <v-img :src="character.image"></v-img>
            </v-col>

            <v-col>
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

              <v-card-actions class="justify-end">
                <router-link :to="{ name: 'detailpage', params: { id: character.id } }">
                  <v-btn text>view Details</v-btn>
                </router-link>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-row></v-row>

      <!-- Buttom for search a new random character. -->
      <v-btn color="#BDBDBD" fixed fab bottom right @click="newRandom">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-container>

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
export default class Randomizerpage extends Vue {
  private character: Character[] = [];
  private loader: boolean = false;

  // A character is searched when starting the page
  private created() {
    this.getCharacter();
  }

  private async getCharacter() {
    this.loader = true;
    this.character = [];
    await characterService
      .getRandomCharacter()
      .then( (response) => (this.character = response.data));
    this.loader = false;
  }

  // A character is searched when the buttom is pressed
  private newRandom() {
    this.getCharacter();
  }
}
</script>
