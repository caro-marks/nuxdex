<template>
  <div class="pokemon">
    <ListItem v-bind="mainInfo" />
    <ul class="stats">
      <li v-for="(stat, index) in stats" :key="index">
        {{ stat.stat.name }}: {{ stat.base_stat }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { pokemons } from '@/store'
import { parsePokemonInfo, Pokemon, PokemonStats } from '@/models'

/* const statsNames = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
} */

interface MainInfo {
  id: Pokemon['id']
  name: Pokemon['name']
  types: string[]
  sprites: string
}

export default Vue.extend({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      mainInfo: null as unknown as MainInfo,
      stats: [] as PokemonStats[],
    }
  },
  created() {
    const pokemonInfo = pokemons.$pokemonsList.find(
      (pokemon) => pokemon.id === this.id
    )
    if (pokemonInfo) {
      // @ts-ignore
      const infoParsed = parsePokemonInfo(pokemonInfo)
      const { stats, ...rest } = infoParsed
      this.mainInfo = rest
      this.stats = stats
    }
  },
  /* methods: {
    parseStatName(name: string) {
      return statsNames[name] || name
    },
  }, */
})
</script>

<style lang="scss" scoped>
.stats {
  padding: 0 24px;
}
</style>
