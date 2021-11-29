<template>
  <div class="home">
    <!-- <p>{{ results }}</p> -->
    <HomeTemplate />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { pokemons } from '@/store'

export default Vue.extend({
  async asyncData() {
    await pokemons.index()
  },
  // computed: {
  //   results() {
  //     return pokemons.$pokemonsList[51]
  //   },
  // },
})
</script>
