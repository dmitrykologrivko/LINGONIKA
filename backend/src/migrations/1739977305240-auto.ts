import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1739977305240 implements MigrationInterface {
    name = 'auto1739977305240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "codename" character varying(100) NOT NULL, CONSTRAINT "UQ_71e7b1c3db2e49a5b74ebea8ded" UNIQUE ("codename"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(150) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(254) NOT NULL, "firstName" character varying(30) NOT NULL, "lastName" character varying(150) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdmin" boolean NOT NULL DEFAULT false, "isSuperuser" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "textFrom" character varying(250) NOT NULL, "textTo" character varying(250) NOT NULL, "languageFrom" character varying NOT NULL, "languageTo" character varying NOT NULL, "example" character varying(3000), "isLearned" boolean NOT NULL DEFAULT false, "groupId" integer, "userId" integer NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_group" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "languageFrom" character varying NOT NULL, "languageTo" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_75cacdb4444e072714badc82a25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d9b4ec30d48ed8515908f47f691" PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24022d7e409de3835f25603d35" ON "group_permissions_permission" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0777702b851f7662e2678b4568" ON "group_permissions_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `);
        await queryRunner.query(`CREATE TABLE "user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_fee8345e8e922fa564d033e214f" FOREIGN KEY ("groupId") REFERENCES "card_group"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_group" ADD CONSTRAINT "FK_c9ead78c98fab5e5b10b4b30bb9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_24022d7e409de3835f25603d35d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_0777702b851f7662e2678b45689" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_0777702b851f7662e2678b45689"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_24022d7e409de3835f25603d35d"`);
        await queryRunner.query(`ALTER TABLE "card_group" DROP CONSTRAINT "FK_c9ead78c98fab5e5b10b4b30bb9"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_fee8345e8e922fa564d033e214f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43a6a56e3ef281cbfba9a7745"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b72d197d92b8bafbe7906782e"`);
        await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8abdfe8f9d78a4f5e821dbf620"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84ff6a520aee2bf2512c01cf46"`);
        await queryRunner.query(`DROP TABLE "user_groups_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0777702b851f7662e2678b4568"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24022d7e409de3835f25603d35"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "card_group"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
