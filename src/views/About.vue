<template>
  <div class="about">
    <v-container class="my-5 text-justify">
      <h1 class="text-center">About</h1>
      <p>
        This website has been developed by Francisco Reyes as a test for dtt.
        This page gets information from an api about characters from the "Rick and Morty" series.
        Why was this api chosen? In order to do something different and visually attractive.
        Vuetify a Material Design Component Framework has been used to design the page,
        which has facilitated the development of the website and with a good result.
      </p>

      <h3>Functionality Explanation</h3>

      <h5>Homepage</h5>

      <p>
        This view shows 10 characters along with a button to order them
        Cards have been used to show the character.
        While the characters are read by http, the page is displayed loading.
        Each card shows the image of the character along with information, such as its name, status, location ...
        and a button that leads to the details page, where more information about the character is shown.
        A floating button has been designed that shows a window with the options to sort.
        With this design the page is much simpler.
        The characters can be sorted ascending and descending by id, name and species.
        Once filtered a message is displayed that has been filtered correctly.
      </p>

      <h5>Randomizerpage</h5>

      <p>
        This view shows a character randomly selected from the api.
        While the characters are read by http, the page is displayed loading.
        A card has been used to show the character. The card includes a picture of
        the character along with information about it, and a button that takes you to the details page.
        A floating button has been implemented which, when pressed, searches for a new random character
      </p>

      <h5>Detailpage</h5>

      <p>
        This view shows details of a character along with a recommendation of related characters.
        While the characters are read by http, the page is displayed loading.
        To show the character a card has been used that shows a picture of the character along
        with information and a button that shows a window with the chapters in which the character appears.
        While the episodes are read by http, the window is displayed loading.
        For recommendations, you get characters that live on the same planet as the main character.
        Cards are used to show these characters. The cards have a picture of the character and information.
        The cards also have a button that leads to the details page.
      </p>
    </v-container>
  </div>
</template>
