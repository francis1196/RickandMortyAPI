<!--  This view shows details of a character along with a recommendation of related characters.
      While the characters are read by http, the page is displayed loading.
      To show the character a card has been used that shows a picture of the character along 
      with information and a button that shows a window with the chapters in which the character appears.
      While the episodes are read by http, the window is displayed loading.

      For recommendations, you get characters that live on the same planet as the main character.
      Cards are used to show these characters. The cards have a picture of the character and information. 
      The cards also have a button that leads to the details page. -->

<template>
  <div class="detailpage ma-5">
    <v-container>
      <!-- Main character card -->
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

              <v-divider></v-divider>

              <v-card-actions class="justify-end">
                <v-btn text @click="getEpisodes()">view list of episodes</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-divider></v-divider>

      <!-- relevant characters cards -->
      <v-row justify="center">
        <h3>Relevant Characters:</h3>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" v-for="c of relevantCharacters" :key="c.id">
          <v-card class="mx-auto" color="#F9F9F9">
            <v-img
              :src="c.image"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="align-end fill-height" v-text="c.name"></v-card-title>
            </v-img>

            <v-list-item>
              <v-list-item-title>STATUS</v-list-item-title>

              <v-list-item-subtitle class="text-right">{{ c.status }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>SPECIES</v-list-item-title>

              <v-list-item-subtitle class="text-right">{{ c.species }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>GENDER</v-list-item-title>

              <v-list-item-subtitle class="text-right">{{ c.gender }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>ORIGIN</v-list-item-title>

              <v-list-item-subtitle class="text-right">{{ c.origin.name }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>LOCATION</v-list-item-title>

              <v-list-item-subtitle class="text-right">{{ c.location.name }}</v-list-item-subtitle>
            </v-list-item>

            <v-divider></v-divider>

            <v-card-actions class="justify-end">
              <router-link :to="{ name: 'detailpage', params: { id: c.id } }">
                <v-btn text @click="reload( c.id )">view Details</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- window with the episodes -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field label="List of episodes"></v-text-field>
          <small class="grey--text">* Order by release date</small>
          <v-container v-if="!loaderEp">
            <v-list-item v-for="e of allEpisodes" :key="e.episode">
              <v-list-item-content>
                <v-list-item-title>
                  <small>{{e.episode}}:</small>
                  {{e.name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <small>release date:</small>
                  {{e.air_date}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-container>

          <v-container v-if="loaderEp">
            <v-list-item>
              <v-list-item-content>
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-list-item-content>
            </v-list-item>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
export default class Detailpage extends Vue {
  private character: Character[] = [];
  private characterNumber: number = 0;
  private urlLocation: string = '';
  private allRelevantCharacters = [];
  private relevantCharacters = [];
  private dialog: boolean = false;
  private loader: boolean = false;
  private loaderEp: boolean = false;
  private episodes = [];
  private allEpisodes = [];

  // A character is searched when starting the page
  private async created() {
    this.reload(this.$route.params.id);
  }

  // A character is searched when reloading the page
  private async reload(id: string) {
    this.loader = true;
    await this.getCharacter(id);
    await this.getRelevant();
    this.loader = false;
  }

  private getCharacter(id: string) {
    this.character = [];
    return characterService.getCharacter(id).then( (response) => {
      this.character = response.data;
      this.characterNumber = response.data.id;
      this.urlLocation = response.data.location.url;
      this.episodes = response.data.episode;
    });
  }

  // I get the planet from the main character and look for other characters that live on that planet
  private getRelevant() {
    return characterService.getRelevant(this.urlLocation).then( (response) => {
      this.allRelevantCharacters = response.data.residents;

      let characterId;
      let relevantCharactersString = '';

      if (this.allRelevantCharacters.length <= 3) {
        // if there are 3 or less characters I get all except the main character

        let element: string = '';
        for (const c in this.allRelevantCharacters) {
          if (this.allRelevantCharacters.hasOwnProperty(c)) {
            element = this.allRelevantCharacters[c];
            characterId = element.slice(42);

            if (characterId !== this.characterNumber.toString()) {
              relevantCharactersString = `${relevantCharactersString},${characterId}`;
            }
          }
        }
      } else {
        // if there is more than 3 I sort the array randomly and get the first 3 except the main character
        const shuffled = this.allRelevantCharacters.sort(
          () => 0.5 - Math.random(),
        );
        let found = 0;
        let i = 0;
        let shuffledString: string = '';

        while (found < 3) {
          shuffledString = shuffled[i];
          characterId = shuffledString.slice(42);

          if (characterId !== this.characterNumber.toString()) {
            relevantCharactersString = `${relevantCharactersString},${characterId}`;
            found++;
          }

          i++;
        }
      }

      characterService
        .getCharactersID(relevantCharactersString)
        .then( (res) => (this.relevantCharacters = res.data));
    });
  }

  // I get the list of episodes of the character
  private getEpisodes() {
    this.allEpisodes = [];
    this.dialog = true;

    let episodesString: string = '';
    let episode: string = '';

    for (const e in this.episodes) {
      if (this.episodes.hasOwnProperty(e)) {
        episode = this.episodes[e];
        episodesString = `${episodesString},${episode.slice(40)}`;
      }
    }

    characterService
      .getEpisode(episodesString)
      .then( (res) => (this.allEpisodes = res.data));
  }
}
</script>
