# Car Wash Backend

## Project Overview

A Car Wash Booking Backend built with Node.js, Express.js, and MongoDB. The project follows a modular folder structure to keep the code organized, maintainable, and scalable.

## Project Setup & Foundation

- Set up an Express.js server.
- Configured MongoDB connection using `config/db.js`.
- Configured CORS and `express.json()` middleware.
- Used `.env` for environment variables and `.gitignore` for Git exclusions.
- Organized the project into `config`, `controllers`, `data`, `middlewares`, `models`, `routes`, and `utils` folders.
- Created `services.json` for initial service data.
- Implemented database seeding using `seedServices.js`.
- Used `app.locals.db` to share the database connection across the application.

## Service API Development

### Completed

| Method | Endpoint | Description |
|---|---|---|
| GET | `/service` | Get all services |
| GET | `/service/:id` | Get a single service by ID |
| POST | `/service` | Create a new service |

### Upcoming

| Method | Endpoint | Description |
|---|---|---|
| PATCH | `/service/:id` | Update an existing service |
| DELETE | `/service/:id` | Delete a service |

## Backend Development Roadmap

- [x] Project setup and MongoDB connection
- [x] Initial service data seeding
- [x] Get all services
- [x] Get service by ID
- [x] Create a new service
- [ ] Complete Service CRUD operations
- [ ] Implement input validation
- [ ] Implement error handling
- [ ] Develop Booking API
- [ ] Implement user registration and login
- [ ] Configure JWT authentication
- [ ] Implement protected routes and role-based authorization
- [ ] Add search, filtering, and pagination
- [ ] Implement booking history
- [ ] Test APIs using Postman
- [ ] Configure production environment
- [ ] Deploy backend
- [ ] Connect frontend

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JavaScript
- dotenv
- CORS