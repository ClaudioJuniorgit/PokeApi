import { AppDataSource } from '../../database/data-source.js';
import { Pokemon } from './entity.js';

export class PokemonRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(Pokemon);
  }

  async findMany(order, sortBy, filterBy) {
    let data = await this.repository.find();
    if (filterBy) {
      data = data.filter((pokemon) => pokemon.types.includes(filterBy));
    }
    data.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return order === 'desc' ? -1 : 1;
      if (a[sortBy] < b[sortBy]) return order === 'desc' ? 1 : -1;
      return 0;
    });
    return data;
  }

  async findOneBy(findOptionsWhere) {
    console.log('acionou');
    return await this.repository.findOneBy(findOptionsWhere);
  }

  async update(name, types, id) {
    await this.repository.update({ id }, { name, types, updatedAt: new Date() });
    return await this.repository.findOneBy({ id });
  }

  async create(name, types) {
    const newPokemon = this.repository.create({
      name,
      types,
    });
    return await this.repository.save(newPokemon);
  }

  async delete(id) {
    const pokemonDeleted = await this.repository.findOneBy({ id });
    await this.repository.delete(id);
    return pokemonDeleted;
  }
}
