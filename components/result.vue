<template>
  <div>
      POP AHEAD:  {{popAhead}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { popAheadOfAge, isValidAge } from '~/business/utils';

export default Vue.extend({
    props: {
        age: {
            type: Number,
        }
    },

    computed: {

        computedAge: function(): number {
            if (!isValidAge(this.age)) {
                console.error('invalid age', this.age);
                return 0;
            }

            if (this.age >= 101) {
                return 101;
            }

            return this.age;
        },
        
        popAhead: function(): number {
            return popAheadOfAge(this.computedAge);
        }
    }

})
</script>

<style>

</style>