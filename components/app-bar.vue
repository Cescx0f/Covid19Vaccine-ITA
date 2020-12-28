<template>
  <v-app-bar class="app-bar-main">
        <v-toolbar-title>Vaccino COVID19</v-toolbar-title>

        <div class="bg-flag-fade" :style="gradient"></div>
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
        },
        computed: {
                gradient: function() {
                        const lightGradient = `background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255,255,255,0.6) 74%, rgba(0,0,0,0) 100%);`;
                        const darkGradient = `background: linear-gradient(0deg, rgba(18, 18, 18, 1) 0%, rgba(18,18,18,0.5) 74%, rgba(0,0,0,0) 100%);`;
                        return this.$vuetify.theme.dark ? darkGradient : lightGradient;
                          

                }
        }
    
})
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';


.app-bar-main {
        flex: 0 !important;
}

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
}



</style>