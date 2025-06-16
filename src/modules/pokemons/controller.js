export class PokemonController {
  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async handleFind(req, res) {
    const { page, limit, order, sortBy, filterBy } = req.query;
    const data = await this.pokemonService.findMany(page, limit, order, sortBy, filterBy);
    return res.json(data);
  }

  async handleFindOne(req, res) {
    try {
      const data = await this.pokemonService.findOneById(+req.params.id);
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ code: 404, message: error.message });
    }
  }

  async handleUpdate(req, res) {
    try {
      const { name, types } = req.body;
      const data = await this.pokemonService.update(name, types, +req.params.id);
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ code: 404, message: error.message });
    }
  }

  async handleCreate(req, res) {
    try {
      const { name, types } = req.body;
      const data = await this.pokemonService.create(name, types);
      return res.json(data);
    } catch (error) {
      return res.status(409).json({ code: 409, message: error.message });
    }
  }

  async handleDelete(req, res) {
    try {
      const data = await this.pokemonService.delete(+req.params.id);
      return res.json(data);
    } catch (error) {
      return res.status(404).json({ code: 404, message: error.message });
    }
  }
}
