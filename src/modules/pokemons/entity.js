import { EntitySchema } from 'typeorm';

export const Pokemon = new EntitySchema({
  name: 'pokemons',
  tableName: 'pokemons',
  schema: 'pokemon',
  columns: {
    id: { type: 'integer', primary: true, generated: true },

    name: { type: 'varchar', length: 20 },

    types: { type: 'varchar', array: true, length: 50 },

    createdAt: { type: 'timestamp', name: 'created_at', default: () => 'NOW()' },

    updatedAt: { type: 'timestamp', name: 'updated_at', default: () => 'NOW()' },
  },
});
