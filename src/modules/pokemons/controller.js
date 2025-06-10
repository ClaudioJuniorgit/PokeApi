export class UserController {
  constructor(userService) {
    this.UserService = userService;
  }
  async handle(order, sortBy, filterBy) {
    const data = await this.pokemonRepository.findMany(order, sortBy, filterBy);
    return resizeBy.json(data);
  }
}
