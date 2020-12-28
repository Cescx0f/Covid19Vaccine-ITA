<template>
  <div>
    <div>
        Ci sono {{popAhead}} persone davanti a te ({{popAheadPerc}}% della popolazione totale)
    </div>
    <div>
        Ti vaccinerai fra il {{startDate}} e il {{endDate}}
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { popAheadOfAge, isValidAge, computeVaccineDates, computeTotPop } from '~/business/utils';

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

        totPop: function(): number {
            return computeTotPop();
        },
        
        popAhead: function(): number {
            return popAheadOfAge(this.computedAge);
        },

        popAheadPerc: function(): number {
            const rawPerc = (100 * this.popAhead) / this.totPop;
            return Math.round(rawPerc * 100) / 100
        },

        vaccineDates: function(): VaccineExpected {
            return computeVaccineDates(this.computedAge);
        },

        startDate: function(): string {
            return new Date(this.vaccineDates.startDate).toLocaleDateString()
        },

        endDate: function(): string {
            return new Date(this.vaccineDates.endDate).toLocaleDateString()
        }
    }

})
</script>

<style>

</style>