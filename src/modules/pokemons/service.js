import { Raw } from 'typeorm';

export class PokemonService {
  constructor(pokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async findMany(page, limit, orderBy, sortBy, filterBy) {
    const order = sortBy ? { [sortBy]: orderBy } : { id: 'ASC' };
    const where = filterBy && {
      types: Raw((alias) => `${alias} && ARRAY[:...types]::varchar[]`, { types: [filterBy] }),
    };
    return await this.pokemonRepository.findManyCount({ page, limit, order, where });
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
