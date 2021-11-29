<template>
  <ul class="list text--white bg--black">
    <p v-if="isSearching" class="list--message">Looking for the pokemon</p>
    <p v-else-if="searchHasError" class="lista--message">
      We couldn't find this pokemon
    </p>
    <ListItem v-else-if="isPokemonSearch" v-bind="pokemonsList[0]" />
    <Description v-else-if="pokemonId" :id="pokemonId" />
    <template v-else>
      <ListItem
        v-for="pokemon in pokemonsList"
        :key="pokemon.id"
        v-bind="pokemon"
      />
      <InfiniteLoading @infinite="infiniteHandler" />
    </template>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { pokemons } from '@/store'

export default Vue.extend({
  computed: {
    pokemonsList() {
      return pokemons.$pokemonsList
    },
    isSearching() {
      return pokemons.$isSearch
    },
    isPokemonSearch() {
      return pokemons.$isPokemonSearch
    },
    searchHasError() {
      return pokemons.$searchHasError
    },
    pokemonId() {
      return pokemons.$pokemonId
    },
  },
  methods: {
    async infiniteHandler($pokemons: any) {
      await pokemons.$pokemonsList
      if (pokemons.$hasNext) {
        $pokemons.loaded()
        return
      }
      if (pokemons.$hasCompleted) {
        $pokemons.complete()
        return
      }
      if (pokemons.$hasError) {
        $pokemons.error()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 10px solid color(white);
  border-radius: 8px;
  padding: 0 8px 8px 0;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: $viewport-medium) {
    max-height: 72%;
    border: 20px solid color(white);
  }
  &--message {
    text-align: center;
    margin-top: 8px;
  }
}
</style>
