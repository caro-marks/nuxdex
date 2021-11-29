import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '@/utils/nuxt-instance'
import { CommonPattern, Pokemon, parsePokemonInfo } from '@/models'

@Module({ name: 'pokemons', stateFactory: true, namespaced: true })
export default class Pokemons extends VuexModule {
  private pokemonsList = [] as Pokemon[]
  private tempList = [] as Pokemon[]
  private isSearch = false as boolean
  private isPokemonSearch = false as boolean
  private hasError = false as boolean
  private hasNext = false as boolean
  private hasCompleted = false as boolean
  private searchHasError = false as boolean
  private pokemonId = null as unknown as number
  private limit = 50 as number
  private offset = 0 as number

  public get $pokemonsList() {
    return this.pokemonsList.map(parsePokemonInfo)
  }

  public get $isSearch() {
    return this.isSearch
  }

  public get $isPokemonSearch() {
    return this.isPokemonSearch
  }

  public get $searchHasError() {
    return this.searchHasError
  }

  public get $hasNext() {
    return this.hasNext
  }

  public get $hasCompleted() {
    return this.hasCompleted
  }

  public get $hasError() {
    return this.hasError
  }

  public get $pokemonId() {
    return this.pokemonId
  }

  @Mutation
  private SET_POKEMONS(pokemonsList: Pokemon[]) {
    this.pokemonsList.push(...pokemonsList)
    this.tempList.push(...pokemonsList)
  }

  @Mutation
  private SET_IS_SEARCH(flag: boolean) {
    this.isSearch = flag
  }

  @Mutation
  private SET_LIST_HAS_ERROR(flag: boolean) {
    this.hasError = flag
  }

  @Mutation
  private SET_LIST_HAS_NEXT(flag: boolean) {
    this.hasNext = flag
  }

  @Mutation
  private UPDATE_OFFSET() {
    this.offset += this.limit
  }

  @Mutation
  private SET_LIST_HAS_COMPLETED(flag: boolean) {
    this.hasCompleted = flag
  }

  @Mutation
  private SET_POKEMON_SEARCHED(pokemon: Pokemon) {
    this.pokemonsList = [pokemon]
  }

  @Mutation
  private RESET_LIST() {
    this.pokemonsList = [...this.tempList]
    this.isPokemonSearch = false
    this.hasError = false
    this.searchHasError = false
  }

  @Mutation
  private SET_IS_POKEMON_SEARCH(flag: boolean) {
    this.isPokemonSearch = flag
  }

  @Mutation
  private SET_SEARCH_HAS_ERROR(flag: boolean) {
    this.searchHasError = flag
  }

  @Mutation
  private SET_POKEMON_ID(id: number) {
    this.isPokemonSearch = false
    this.pokemonId = id
  }

  @Action
  public async index() {
    try {
      this.context.commit('SET_IS_SEARCH', false)
      this.context.commit('SET_LIST_HAS_ERROR', false)
      const results = await $axios.$get(
        `/pokemon?limit=${this.limit}&offset=${this.offset}`
      )
      if (results?.results?.length) {
        const prepareInfo = results.results.map((item: CommonPattern) =>
          $axios.$get(`/pokemon/${item.name}`)
        )
        const pokemonsList = await Promise.all(prepareInfo)
        this.context.commit('SET_POKEMONS', pokemonsList)
      }
      if (results?.next) {
        this.context.commit('SET_LIST_HAS_NEXT', true)
        this.context.commit('UPDATE_OFFSET')
      } else {
        this.context.commit('SET_LIST_HAS_NEXT', false)
        this.context.commit('SET_LIST_HAS_COMPLETED', true)
      }
    } catch (error) {
      this.context.commit('SET_LIST_HAS_ERROR', true)
    }
  }

  @Action
  public async getSinglePokemon(name: string) {
    const pokemon = await $axios.$get(`/pokemon/${name}`)
    if (pokemon) {
      this.context.commit('SET_POKEMON_SEARCHED', pokemon)
    }
  }

  @Action
  public async searchPokemon(name: string) {
    if (!name) {
      this.context.commit('RESET_LIST')
    }
    try {
      this.context.commit('SET_SEARCH_HAS_ERROR', false)
      this.context.commit('SET_IS_POKEMON_SEARCH', true)
      this.context.commit('SET_IS_SEARCH', true)
      const pokemon = this.tempList.find(
        (info) => info.name.toLowerCase() === name.toLowerCase()
      )
      if (pokemon) {
        this.context.commit('SET_POKEMON_SEARCHED', pokemon)
        return
      }
      await $axios.$get(`/pokemon/${name}`)
    } catch (error) {
      this.context.commit('SET_SEARCH_HAS_ERROR', true)
    } finally {
      this.context.commit('SET_IS_SEARCHING', false)
    }
  }

  @Action
  public resetList() {
    this.context.commit('RESET_LIST')
  }

  @Action
  public setPokemonId(id: number) {
    this.context.commit('SET_POKEMON_ID', id)
  }
}
