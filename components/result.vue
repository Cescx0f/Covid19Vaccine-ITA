<template>
  <div class="result-card-wrap">
      <v-card
  elevation="3"
  outlined>
    <v-card-text class="">
        Ti vaccinerai fra il <span class="font-weight-bold">{{startDate}}</span> e il <span class="font-weight-bold">{{endDate}}</span>
    </v-card-text>
    <v-card-text>
        Ci sono <span class="font-weight-bold">{{popAheadStr}}</span> persone davanti a te (<span class="font-weight-bold">{{popAheadPerc}}</span>% della popolazione totale)
    </v-card-text>
  
  </v-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { popPriority } from '~/business/demographic';

import { popAheadOfAge, isValidAge, computeVaccineDatesV2, computeTotPop, VaccineExpected } from '~/business/utils';

export default Vue.extend({
    props: {
        age: {
            type: Number,
        },
        isUserPriority: {
            type: Boolean,
        },
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
            return  popPriority + (this.isUserPriority ? 0 : popAheadOfAge(this.computedAge));
        },

        popAheadStr: function(): string {
            return this.popAhead.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");;
        },

        popAheadPerc: function(): number {
            const rawPerc = (100 * this.popAhead) / this.totPop;
            return Math.round(rawPerc * 100) / 100
        },

        vaccineDates: function(): VaccineExpected {
            return computeVaccineDatesV2(this.computedAge, {isUserPriority: this.isUserPriority});
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
.bold {

}
.result-card-wrap {
    flex: 0;
    display: flex;
    justify-content: center;
    padding: 0 20px;
}

.v-card__text {
    font-size: 1.1em;
}
</style>