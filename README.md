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

