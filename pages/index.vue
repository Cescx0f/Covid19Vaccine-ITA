<template>
<v-app>
  <app-bar class="app-bar"/>
<v-banner>
                Questo sito fornisce una stima basilare, mostrandoti quando sarà il tuo turno per ricevere il vaccino in Italia. 💉 <br/>
                É basato sulla popolazione italiana (dati ISTAT) e una quata costante di vaccinazioni alla settimana.
                
</v-banner>
    <div class="component-wrap">
      <age-input @age="userAge = parseInt($event)"/>
      <!-- <demographic/> -->
      <result v-if="userAge" :age="userAge"/>
    </div>
</v-app>
</template>

<script>
import AgeInput from '~/components/age-input.vue'
import Result from '~/components/result.vue'
import AppBar from '~/components/app-bar.vue'
import Demographic from '~/components/demographic.vue'

  export default {
    components: {
      AgeInput,
      Demographic,
      Result,
      AppBar,
      },

      data() {
        return {
          userAge: null,
        }
      }
  }
</script>

<style>
.app-bar {
  flex: 0;
}
.component-wrap{
    width: 80vw;
    flex: 1;
    display: flex;
    flex-direction: column;;
    justify-content: center;
}

  .info-card {
    margin-top: 50px;
  }
</style>
