<template>
  <div>
    <md-field>
        <label>Inserisci la tua età</label>
        <md-input v-model="inputValue" type="number"></md-input>
    </md-field>
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