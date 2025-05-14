<!-- install dependencies  -->
npm install 

<!-- Create a MySQL database with the following name:  -->
db name: inventory_pos

<!-- Generate TypeORM migration (if needed) -->
npm run migration:generate

<!-- run migrations -->
npm run migration:run

<!-- Seed the database with default data -->
npm run seed

<!-- Start the application-->
npm run start

<!-- Use this link to access the Postman collection and test the API endpoints:    -->
postman collection link: 
https://documenter.getpostman.com/view/33766121/2sB2qUmjeW