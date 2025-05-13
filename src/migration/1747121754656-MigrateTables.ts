import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateTables1747121754656 implements MigrationInterface {
    name = 'MigrateTables1747121754656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal(10,2) NOT NULL, \`method\` int NOT NULL, \`ref_no\` varchar(255) NOT NULL, \`payment_date\` datetime NOT NULL, \`note\` varchar(255) NULL, \`saleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sales\` (\`id\` int NOT NULL AUTO_INCREMENT, \`invoice_no\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`total_amount\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL, \`payment_type\` int NOT NULL, \`date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`sku\` varchar(255) NOT NULL, \`barcode\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`cost\` decimal(10,2) NOT NULL, \`stock\` int NOT NULL, \`unit\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`ref_no\` varchar(255) NOT NULL, \`saleId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`setting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`role_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stock_movement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` int NOT NULL, \`quantity\` int NOT NULL, \`reason\` varchar(255) NOT NULL, \`ref_id\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`product_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`contact\` varchar(50) NOT NULL, \`address\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_20e00028ffa954ae1ca85a8fad7\` FOREIGN KEY (\`saleId\`) REFERENCES \`sales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0dce9bc93c2d2c399982d04bef1\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_items\` ADD CONSTRAINT \`FK_c642be08de5235317d4cf3deb40\` FOREIGN KEY (\`saleId\`) REFERENCES \`sales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_items\` ADD CONSTRAINT \`FK_d675aea38a16313e844662c48f8\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_fb2e442d14add3cefbdf33c4561\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stock_movement\` ADD CONSTRAINT \`FK_c1bf5ff45511ecaad0b28440e30\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`stock_movement\` ADD CONSTRAINT \`FK_3b18e00b1037e39022647f09275\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`stock_movement\` DROP FOREIGN KEY \`FK_3b18e00b1037e39022647f09275\``);
        await queryRunner.query(`ALTER TABLE \`stock_movement\` DROP FOREIGN KEY \`FK_c1bf5ff45511ecaad0b28440e30\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_fb2e442d14add3cefbdf33c4561\``);
        await queryRunner.query(`ALTER TABLE \`sale_items\` DROP FOREIGN KEY \`FK_d675aea38a16313e844662c48f8\``);
        await queryRunner.query(`ALTER TABLE \`sale_items\` DROP FOREIGN KEY \`FK_c642be08de5235317d4cf3deb40\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0dce9bc93c2d2c399982d04bef1\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_20e00028ffa954ae1ca85a8fad7\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`stock_movement\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`setting\``);
        await queryRunner.query(`DROP TABLE \`sale_items\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`sales\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
    }

}
