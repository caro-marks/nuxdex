export interface CommonPattern {
  name: string
  url: string
}

export interface PokemonStats {
  base_stat: number
  effort: 0
  stat: CommonPattern
}

interface PokemonType {
  slot: number
  type: CommonPattern
}

interface PokemonStripes {
  front_default: string
}

export interface Pokemon {
  id: number
  name: string
  sprites: PokemonStripes
  types: PokemonType[]
  stats: PokemonStats[]
}

export const parsePokemonInfo = (info: Pokemon) => ({
  id: info.id,
  name: info.name,
  types: info.types.map(({ type }) => type.name),
  sprites:
    info.sprites.front_default ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
  stats: info.stats,
})
