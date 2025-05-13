
<!-- install required packages :  -->

npm install typeorm reflect-metadata mysql2 express
npm install -D typescript ts-node @types/node @types/express

 <!-- 11. Generate and Run Migration -->
npm install -D ts-node typeorm

================================

<!-- c. Generate migration -->
npx typeorm migration:generate src/migration/ProductInit -d src/ormconfig.ts
<!-- d. Run migration -->
npx typeorm migration:run -d ormconfig.ts

<!-- OR RUN THE SCRIPT THAT DECLARE IN PACKAGE JSON -->
migration:generate
migration:run

=================


dify an already-run migration file?
TypeORM will not re-run it, because the filename is already logged in the DB.

This is dangerous. You should:

Avoid editing already-run migration files.

If needed, revert the migration using:

bash
Copy
Edit
npm run migration:revert
Then make changes and regenerate a new migration file.