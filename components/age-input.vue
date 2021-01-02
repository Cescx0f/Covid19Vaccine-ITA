<template>
  <div>
      <v-form>
        <v-text-field
            v-model="inputValue"
            label="Inserisci la tua età"
            solo
            :disabled="isUserPriority"
            @submit.prevent
            class="age-input-component"
                  color="success"
                  type="number"

          ></v-text-field>
          <!-- dummy hidden input to prevent submit event -->
          <input type="text" style="display: none;" /> 

          <v-switch v-if="SHOW_PRIORITY_INPUT" v-model="isUserPriority" 
          class="priority-input-switch"
          label="RSA/Medico/Infermiere"
            inset/>
      </v-form>
  </div>
</template>

<script>

export default {

    // props: {
    //     isPriority: {
    //         type: Boolean,
    //         required: true
    //     },
    // },

    data() {
        return {
            inputValue: null,
            isUserPriority: false,
            SHOW_PRIORITY_INPUT: false,
        }
    },

    methods: {
        },

    watch: {
        inputValue: function(newVal) {
            this.$emit('age', newVal)
        },
        isUserPriority: function(newVal) {
            console.log('inputchange', newVal)
            this.$emit('priorityChange', newVal);
        },
    }

}
</script>

<style lang="scss">
.age-input-component label {
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    max-width: 100% !important;

}
.age-input-component input{
    font-size: 1.5em;
    text-align: center;
  }

.age-input-component .v-text-field__details,
.priority-input-switch .v-messages{
    display: none;
  }
</style>