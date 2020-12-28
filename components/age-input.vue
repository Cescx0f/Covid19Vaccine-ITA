<template>
  <div>
      <v-form>
        <v-text-field
            v-model="inputValue"
            label="Inserisci la tua età"
            class="age-input-component"
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

<style lang="scss">
.age-input-component label {
    font-size: 1.2em;
}
.age-input-component input{
    font-size: 1.5em;
    text-align: center;;
  }
</style>