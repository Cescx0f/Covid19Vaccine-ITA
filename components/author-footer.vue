<template>
  <v-footer
    dark
    padless
    class="author-footer"
    
  >
    <v-card
      class="flex"
      flat
      tile
    >


      <v-card-text class="py-2 white--text text-center">
        <div class="footer-icon-wrap text-center">
            <v-btn
          v-for="icon in icons"
          :key="icon.image"
          class="footer-icon"
          @click="openUrl(icon.link)"
          small
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon.image }}
          </v-icon>
        </v-btn>
        </div>
        <div>{{ new Date().getFullYear() }} — <strong>Francesco Scarpa</strong> </div>

      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
    data: () => ({
      icons: [
          {
              image: 'mdi-git',
            link: 'https://github.com/Cescx0f/Covid19Vaccine-ITA',
            },
          {
              image: 'mdi-linkedin',
            link: 'https://www.linkedin.com/in/francesco-202020',
            },
          {
              image: 'mdi-twitter',
            link: 'https://twitter.com/FraCesc0',
            },
      ],
    }),

    methods: {
        openUrl: function(url) {
            window.open(url)
        }
    }

}
</script>

<style>
.author-footer{
    width: 100%;
}
.footer-icon-wrap {
    display: flex;
    justify-content: space-around;
    max-width: 400px;
    margin: auto;
}

</style>