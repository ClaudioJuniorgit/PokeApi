/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class SeedPokemonTable1749362530249 {
  async up(queryRunner) {
    await queryRunner.query(`
            INSERT INTO "pokemon"."pokemons" ("name", "types") VALUES
            ('charmander', ARRAY['fire']),
            ('blastoise', ARRAY['water']),
            ('celebi', ARRAY['psychic', 'grass']),
            ('pikachu', ARRAY['electric']),
            ('cyndaquil', ARRAY['fire']),
            ('pidgeot', ARRAY['normal', 'flying']),
            ('lapras', ARRAY['water', 'ice']),
            ('geodude', ARRAY['rock', 'ground']),
            ('bulbasaur', ARRAY['grass', 'poison']),
            ('arcanine', ARRAY['fire'])
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DELETE FROM "pokemon"."pokemons"`);
  }
}
