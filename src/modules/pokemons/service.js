export class UserService {
  constructor(userReposirtory) {
    this.userReposirtory = userReposirtory;
  }
  async findMany(order, sortBy, filterBy) {
    return await this.userReposirtory.findMany(order, sortBy, filterBy);
  }
}
