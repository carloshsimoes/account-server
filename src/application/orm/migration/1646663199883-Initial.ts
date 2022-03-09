import {MigrationInterface, QueryRunner} from 'typeorm';

export class Initial1646663199883 implements MigrationInterface {
  name = 'Initial1646663199883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "mfa_entity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hash" character varying NOT NULL, "active" boolean NOT NULL, "userId" character varying, CONSTRAINT "UQ_946ede078bc37949471c9a3cb6e" UNIQUE ("hash"), CONSTRAINT "REL_76fa54eeb7e97f80dbe25342b4" UNIQUE ("userId"), CONSTRAINT "PK_a2a037c5b520e7ad4697355bef4" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TYPE "public"."user_entity_accesslevel_enum" AS ENUM(\'0\', \'1\')'
    );
    await queryRunner.query(
      'CREATE TABLE "user_entity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "accessLevel" "public"."user_entity_accesslevel_enum" NOT NULL, CONSTRAINT "UQ_acf4a7e63bea9fd1301174089c4" UNIQUE ("cpf"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "session_entity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deviceName" character varying NOT NULL, "userId" character varying, CONSTRAINT "PK_897bc09b92e1a7ef6b30cba4786" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "address_entity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "street" character varying NOT NULL, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipCode" character varying NOT NULL, "complement" character varying, "userId" character varying, CONSTRAINT "PK_9caf3f954ed5bc66e3fa35eb7e9" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'ALTER TABLE "mfa_entity" ADD CONSTRAINT "FK_76fa54eeb7e97f80dbe25342b4b" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "session_entity" ADD CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "address_entity" ADD CONSTRAINT "FK_9ab5f1a587a098fe9084ee4766e" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "address_entity" DROP CONSTRAINT "FK_9ab5f1a587a098fe9084ee4766e"'
    );
    await queryRunner.query(
      'ALTER TABLE "session_entity" DROP CONSTRAINT "FK_8118675718bebb455bba4caf129"'
    );
    await queryRunner.query(
      'ALTER TABLE "mfa_entity" DROP CONSTRAINT "FK_76fa54eeb7e97f80dbe25342b4b"'
    );
    await queryRunner.query('DROP TABLE "address_entity"');
    await queryRunner.query('DROP TABLE "session_entity"');
    await queryRunner.query('DROP TABLE "user_entity"');
    await queryRunner.query(
      'DROP TYPE "public"."user_entity_accesslevel_enum"'
    );
    await queryRunner.query('DROP TABLE "mfa_entity"');
  }
}
