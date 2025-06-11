## 📦 BookMyFlight Backend
This is the backend project for BookMyFlight, built with Node.js, Express, and MySQL. It is designed to power the backend APIs for a flight booking platform. The project follows a clean and scalable folder structure, making it easy for frontend developers or other teams to integrate with.

## 🚀 Features
- RESTful API endpoints for flight operations
- User authentication and authorization
- Booking management system
- Database integration with MySQL
- Logging and error handling


## 🔧 config/
    - This folder contains all configuration-related code, such as:
    - dotenv setup for environment variables
    - Logger configuration (e.g., Winston or custom logger)
    - Server configurations such as port, DB credentials, or other constants

✅ Example files:
    - logger.config.js
    - dotenv.config.js
    - server.config.js

## 🎯 controller/
    - All the API logic lives here. Controllers handle the incoming requests, call appropriate services, and return responses.

✅ Example:

    - flightController.js – handles routes related to flights
    - userController.js – manages user-related operations

## 🗃️ models/
    - Contains the MySQL-based schema definitions using an ORM like Sequelize or direct SQL models. This folder defines the structure of your database tables.

✅ Example:
    - User.js
    - Flight.js
    - Booking.js

## 🛡️ middlewares/
    - Reusable middleware functions such as:
    - Authentication (JWT or token-based)
    - Error handling
    - Request validation

✅ Example:
    - authMiddleware.js
    - errorHandler.js

## 🧭 routes/
    - This folder defines all the application routes and maps them to the appropriate controller functions.

✅ Example:
    - flightRoutes.js
    - userRoutes.js
    - index.js – combines all routes under /api

## ⚙️ services/
    - Contains the business logic of the application. Controllers delegate complex operations to services to keep things modular and maintainable.

✅ Example:
    - flightService.js – handles fare calculation, availability, etc.
    - bookingService.js

## 🧰 utils/
    - Utility functions and helper modules used across the app. These might include:
    - Date formatting
    - Email or SMS utilities
    - Common validators

✅ Example:
    - dateFormatter.js
    - emailHelper.js


#### Setup the project
    - git clone https://github.com/GovindaEkabote/BookMyFlight
    - cd BookMyFlight
    - npm install
    - npm run dev

### go inside the `src` folder and execute the following command -- `npx sequelize init`
    

-- Inside the `src/config/config.json` file write the following code:



`````
{
  "development": {
    "username": "root",
    "password": "password",                 // write your database password
    "database": "bookMyFlight",             //  database name
    "host": "127.0.0.1",                    // database host cd 
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
``````
- This project uses MySQL as the database and is configured using Sequelize ORM. The database settings are environment-specific and are defined in config/config.json.



### some sequelize command :- 

````
Sequelize CLI [Node: 10.21.0, CLI: 6.0.0, ORM: 6.1.0]
Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
  sequelize model:generate                    Generates a model and its migration [aliases: model:create]
  sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]

Options:
  --version  Show version number                                                  [boolean]
  --help     Show help                                                            [boolean]

Please specify a command

````