import { AppDataSource } from '../../database/data-source.js';
import { Pokemon } from './entity.js';

export class PokemonRepository {
  constructor() {
    this.repository = AppDataSource.getRepository(Pokemon);
  }

  async findManyCount(findManyOptions) {
    const { page, limit, ...rest } = findManyOptions;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const [pokemons, count] = await this.repository.findAndCount({
      ...rest,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    return {
      metadata: {
        page: pageNum,
        limit: limitNum,
        totalItens: count,
        totalPages: Math.ceil(count / limitNum),
      },
      data: pokemons,
    };
  }

  async findMany(findManyOptions) {
    return await this.repository.find(findManyOptions);
  }

  async findOneBy(findOptionsWhere) {
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
