<template>
   <div> {{population}}</div>
</template>

<script>

import { population } from '~/business/demographic'
export default {

    data() {
        return {
            population,
        }
    },

}
</script>

<style>

</style>