<template>
  <div>
      <v-form>
        <v-text-field
            v-model="inputValue"
            label="Inserisci la tua età"
                  color="success"
                  type="number"

          ></v-text-field>
      </v-form>
  </div>
</template>

<script>

export default {

    data() {
        return {
            inputValue: null,
        }
    },

    watch: {
        inputValue: function(newVal) {
            this.$emit('age', newVal)
        }
    }

}
</script>

<style>

</style>