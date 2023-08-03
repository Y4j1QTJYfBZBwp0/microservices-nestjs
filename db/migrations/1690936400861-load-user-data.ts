import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoadUserData1690936400861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users"(name, email, password) VALUES ('User1', 'user1@domain.com', 'hard_password');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
