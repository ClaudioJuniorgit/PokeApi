import { Router } from 'express';
import { PokemonController } from './modules/pokemons/controller.js';
import { PokemonRepository } from './modules/pokemons/repository.js';
import { PokemonService } from './modules/pokemons/service.js';
import {
  idIsNumberMiddleware,
  bodyExistsMiddleware,
  inputDtoMiddleware,
  validateQueryMiddleware,
} from './middleware.js';

const router = Router();
const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const pokemonController = new PokemonController(pokemonService);

router.get('/pokemons', validateQueryMiddleware, pokemonController.handleFind.bind(pokemonController));
router.get('/pokemons/:id', idIsNumberMiddleware, pokemonController.handleFindOne.bind(pokemonController));
router.patch(
  '/pokemons/:id',
  idIsNumberMiddleware,
  bodyExistsMiddleware,
  inputDtoMiddleware,
  pokemonController.handleUpdate.bind(pokemonController)
);
router.post(
  '/pokemons',
  bodyExistsMiddleware,
  inputDtoMiddleware,
  pokemonController.handleCreate.bind(pokemonController)
);
router.delete('/pokemons/:id', idIsNumberMiddleware, pokemonController.handleDelete.bind(pokemonController));

export default router;
