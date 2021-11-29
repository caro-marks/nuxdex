export interface ResultsLists {
  name: string
  url: string
}

interface Type {
  name: string
  url: string
}

interface PokemonType {
  slot: number
  type: Type
}

interface PokemonStripes {
  front_default: string
}

export interface Pokemon {
  id: number
  name: string
  sprites: PokemonStripes
  types: PokemonType[]
}
