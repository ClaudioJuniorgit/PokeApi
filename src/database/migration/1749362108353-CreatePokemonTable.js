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
            "types" character varying(20) array NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
            CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
      ALTER TABLE "pokemon"."pokemons"
      ADD CONSTRAINT "UQ_85819bdbadf35bf662fc6694332" UNIQUE ("name")
  `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
      ALTER TABLE "pokemon"."pokemons" DROP CONSTRAINT "UQ_85819bdbadf35bf662fc6694332"
  `);
    await queryRunner.query(`
        DROP TABLE "pokemon"."pokemons"
    `);
  }
}
