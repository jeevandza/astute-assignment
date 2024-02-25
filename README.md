# astute-assignment

Created using typescript, node and esbuild

How to initialize project

npm i - to install required dependencies

`npm run start`   to start the server this will be both production and development (can be modified on esbuild configuration)


You can find below scrips in package.json 


    "watch:server": "node build.mjs", - to build and watch 
    "watch:restart-server": "nodemon --config nodemon.json", - restart server as soon as any file changes
    "build:server": "node build.mjs", - build server ready code
    "start": "npm-run-all --parallel watch:server watch:restart-server" -- Run all on parallel



Technologies used
ESbuild - builder for the project 
Typescript 
PostgresSQL
nodemon
Neon - To control database with UI


**Usage**

Sample API's create a user 
User can create products - (Role based access control not added any user can create any products)
Products- CRUD
Customers- Customer table created as soon as a user places an order
Purchase order- Customer can book a product and tracking can be updated
Return order - Customer can return your order 
Auth- Login control token based 

