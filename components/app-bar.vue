<template>
  <v-app-bar>
        <v-toolbar-title>Vaccino Covid19 - ITALIA</v-toolbar-title>

        <div class="bg-flag-fade"></div>
        <div class="bg-flag"></div>
  </v-app-bar>

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

        data(){
                return {
                        showInfoDialog: false
                }
        }
    
})
</script>

<style>
.bg-flag, .bg-flag-fade{
        position: absolute;
        left: 0;
        top:0%;
        width: 100%;
        height: 100%;
        overflow: hidden;
}

.bg-flag {
        z-index: -2;
                background-image: repeating-linear-gradient(
                135deg,
                #009246,
                #009246 33%,
                #ffffff 33%,
                #ffffff 66%,
                #ce2b37 66%,
                #ce2b37 100%
                );
}

.bg-flag-fade {
        z-index: -1;
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 74%, rgba(0,0,0,0) 100%);
}



</style>