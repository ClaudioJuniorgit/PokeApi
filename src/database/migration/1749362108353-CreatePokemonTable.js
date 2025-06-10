/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export class CreatePokemonTable1749362108353 {
  name = 'CreatePokemonTable1749362108353';

  async up(queryRunner) {
    await queryRunner.query(`
        CREATE TABLE "pokemon"."pokemons" (
            "id" SERIAL NOT NULL,
            "name" character varying(20) NOT NULL,
            "types" character varying(50) array NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id")
        )
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
        DROP TABLE "pokemon"."pokemons"
    `);
  }
}
