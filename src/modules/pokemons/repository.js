import { AppDataSource } from '../../database/data-source.js';
import { Pokemon } from './entity.js';

export class UserRepository {
  constructor() {
    this.UserRepository = AppDataSource.getRepository(Pokemon);
  }
  async findMany(order = 'asc', sortBy, filterBy) {
    return await this.repository.find();
  }
  // constructor() {
  //   this.repository = AppDataSource.getRepository(Pokemon);
  // }
  // async findMany(order, sortBy, filterBy) {
  //   return await this.repository.find();
  //   // let filteredData = data;
  //   // if (filterBy) {
  //   //   filteredData = data.filter((pokemon) => pokemon.type.includes(filterBy));
  //   // }
  //   // return filteredData.sort((a, b) => {
  //   //   if (sortBy) {
  //   //     if (a[sortBy] > b[sortBy]) {
  //   //       return order === 'desc' ? -1 : 1;
  //   //     }
  //   //     if (a[sortBy] < b[sortBy]) {
  //   //       return order === 'desc' ? 1 : -1;
  //   //     }
  //   //     return 0;
  //   //   }
  //   //   return order === 'desc' ? b.id - a.id : a.id - b.id;
  //   // });
}
