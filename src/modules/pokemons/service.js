export class PokemonService {
  constructor(pokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async findMany(order, sortBy, filterBy) {
    return await this.pokemonRepository.findMany(order, sortBy, filterBy);
  }

  async findOneById(id) {
    const pokemonFound = await this.pokemonRepository.findOneBy({ id });
    if (!pokemonFound) {
      throw new Error('Pokemon not found');
    }
    return pokemonFound;
  }

  async update(name, types, id) {
    const pokemonFound = await this.pokemonRepository.findOneBy({ id });
    if (!pokemonFound) {
      throw new Error('Pokemon not found');
    }
    if (name) {
      const pokemonNameExist = await this.pokemonRepository.findOneBy({ name });
      if (pokemonNameExist && pokemonFound.name != name) {
        throw new Error('Pokemon name already exists');
      }
    }
    return await this.pokemonRepository.update(name, types, id);
  }

  async create(name, types) {
    const pokemonNameExist = await this.pokemonRepository.findOneBy({ name });
    if (pokemonNameExist) {
      throw new Error('Pokemon name already exists');
    }
    return await this.pokemonRepository.create(name, types);
  }

  async delete(id) {
    const pokemonFound = await this.pokemonRepository.findOneBy({ id });
    if (!pokemonFound) {
      throw new Error('Pokemon not found');
    }
    return await this.pokemonRepository.delete(id);
  }
}
