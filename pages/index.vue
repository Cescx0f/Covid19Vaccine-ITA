<template>
<v-app :class="{'desktop': !isMobile}">
  <app-bar  />
<v-banner @click.native="handleBarClick">
<div class="info-text">
    Questo sito ti fornisce una stima di quando sarà il tuo turno per ricevere il vaccino in Italia. 💉 <br/>
    Si basa su dati ISTAT di demografia  e le stime del governo pubblicate sul <a target="_blank" rel="noopener noreferrer" href="http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioContenutiNuovoCoronavirus.jsp?lingua=italiano&id=5452&area=nuovoCoronavirus&menu=vuoto">Ministero Della Salute</a>
  </div>            
</v-banner>
    <div class="component-wrap">
      <age-input class="age-wrapper" @age="userAge = parseInt($event)"/>
      <!-- <demographic/> -->
      <div class="result-wrapper">
        <result v-if="userAge && userAge >0" :age="userAge"/>
      </div>
    </div>
    <author-footer />
</v-app>
</template>

<script>
import AgeInput from '~/components/age-input.vue'
import Result from '~/components/result.vue'
import AppBar from '~/components/app-bar.vue'
import AuthorFooter from '~/components/author-footer.vue'
import Demographic from '~/components/demographic.vue'

  export default {
    components: {
      AgeInput,
      Demographic,
      Result,
      AppBar,
      AuthorFooter,
      },
      
      beforeMount: function() {
        const mediaQuery = '(prefers-color-scheme:dark)';
        const matched = window.matchMedia(mediaQuery).matches;
        
        this.$vuetify.theme.dark = matched;
      },

      data() {
        return {
          userAge: null,
          clicked: 0,
        }
      },

      computed: {
        isMobile: function() {
          return this.$vuetify.breakpoint.smAndDown;
        },
      },

      methods: {
        handleBarClick: function() {
          this.clicked += 1;
          if (this.clicked%5 === 0) {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            console.log('switched Theme', this.$vuetify.theme.dark)
          }
        }
      }
  }
</script>

<style>

body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}


.info-text {
  text-align: center;
  
}

.component-wrap{
    flex: 1;
    display: flex;
    flex-direction: column;;
}

  .age-wrapper {
    flex: 1;
    flex-basis: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20vw;
  }
  .result-wrapper {
    flex: 2;
    flex-basis: 0;
  }

.desktop .result-wrapper {
  flex: 1;
  flex-basis: 0;

}
</style>
