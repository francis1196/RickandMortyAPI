<!--    This component shows the development of the navigation bar
        I have developed the navigation bar so that it works responsively. 
        developing a bar that is modified depending on the size of the device.  -->

<template>
    <div id="navbar">

        <v-app-bar 
            app
            >

            <v-toolbar-title class="headline text-uppercase">
                <span>RICK AND MORTY</span>
                <span class="font-weight-light">API</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- if the device is small these buttons are hidden -->
            
            <v-toolbar-items class="hidden-sm-and-down text-rigth">

                <v-row>

                    <router-link :to="{name: 'homepage'}">
                        <v-list-item>
                            <v-list-item-title>Homepage</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{name: 'randomizerpage'}">
                        <v-list-item>
                            <v-list-item-title>Randomizerpage</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{name: 'about'}">
                        <v-list-item>
                            <v-list-item-title>About</v-list-item-title>
                        </v-list-item>
                    </router-link>

                </v-row>
            
            </v-toolbar-items>

            <!-- If the device is small, a button is displayed that allows you to display a sidebar -->

            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
            
            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                app
                >

                <v-list
                    nav
                    dense
                    class="ma-5"
                >
                    <v-list-item-group
                    active-class="text--accent-4"
                    >
                    
                    <router-link :to="{name: 'homepage'}">
                        <v-list-item>
                            <v-list-item-title>Homepage</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{name: 'randomizerpage'}">
                        <v-list-item>
                            <v-list-item-title>Randomizerpage</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link :to="{name: 'about'}">
                        <v-list-item>
                            <v-list-item-title>About</v-list-item-title>
                        </v-list-item>
                    </router-link>
                    
                  
                    </v-list-item-group>
                </v-list>

                
                </v-navigation-drawer>
        </v-app-bar>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {

// variable that indicates if the sidebar is open
   private drawer: boolean = false;

}
</script>
