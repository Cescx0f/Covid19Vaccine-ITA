<template>
  <div>
      <input v-model="inputValue" placeholder="inserisci qui la tua età" type="number"/>
  </div>
</template>

<script>
export default {

    data() {
        return {
            inputValue: 0,
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