# Car Wash Backend

## Project Overview

A Car Wash Booking Backend built with **Node.js, Express.js, and MongoDB**. The project follows a modular and organized folder structure to keep the code maintainable, reusable, and scalable.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JavaScript (CommonJS)
- dotenv
- CORS
- express-validator
- Postman

## Project Structure

```text
car-wash-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── service.controllers.js
│   └── booking.controllers.js
│
├── data/
│   └── services.json
│
├── middlewares/
│   ├── service.validation.js
│   ├── booking.validation.js
│   └── error.middleware.js
│
├── models/
│   ├── service.models.js
│   └── booking.models.js
│
├── routes/
│   ├── service.routers.js
│   └── booking.routes.js
│
├── utils/
│   └── seedServices.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Project Setup & Foundation

- [x] Set up an Express.js server.
- [x] Configured MongoDB connection using `config/db.js`.
- [x] Configured CORS and `express.json()` middleware.
- [x] Used `.env` for environment variables.
- [x] Configured `.gitignore` to exclude unnecessary and sensitive files.
- [x] Organized the backend using a modular folder structure.
- [x] Created `services.json` for initial service data.
- [x] Implemented database seeding using `seedServices.js`.
- [x] Used `app.locals.db` to share the database connection across the application.

## Service API Development

### Service CRUD Operations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/service` | Retrieve all services |
| GET | `/service/:id` | Retrieve a single service by ID |
| POST | `/service` | Create a new service |
| PATCH | `/service/:id` | Update an existing service |
| DELETE | `/service/:id` | Delete a service |

### Service API Features

- [x] Created a separate service model.
- [x] Implemented service controllers.
- [x] Organized service routes using Express Router.
- [x] Implemented all five CRUD operations.
- [x] Added MongoDB ObjectId validation for ID-based operations.
- [x] Implemented input validation using `express-validator`.
- [x] Added validation for service creation.
- [x] Added validation for service updates.
- [x] Added empty update request validation.
- [x] Created centralized error-handling middleware.
- [x] Connected Service CRUD controllers to centralized error handling using `next(error)`.
- [x] Registered the error handler after application routes.
- [x] Tested all five Service CRUD endpoints using Postman.

## Booking API Development

### Booking CRUD Operations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/booking` | Create a new booking |
| GET | `/booking` | Retrieve all bookings |
| GET | `/booking/:id` | Retrieve a single booking by ID |
| PATCH | `/booking/:id` | Update an existing booking |
| DELETE | `/booking/:id` | Delete a booking |

### Booking API Features

- [x] Created a separate booking model.
- [x] Created booking controllers.
- [x] Organized booking routes using Express Router.
- [x] Implemented all five CRUD operations.
- [x] Added MongoDB ObjectId validation for booking ID-based operations.
- [x] Connected Booking Router to the main Express application.
- [x] Used centralized error handling with `next(error)` in booking controllers.
- [x] Implemented booking input validation using `express-validator`.
- [x] Added validation for booking creation.
- [x] Added validation for booking updates.
- [x] Added validation error responses.
- [x] Prevented empty booking update requests.
- [x] Tested all five Booking CRUD endpoints using Postman.

## API Testing

### CRUD Testing

- [x] Tested GET all services.
- [x] Tested GET service by ID.
- [x] Tested POST service.
- [x] Tested PATCH service.
- [x] Tested DELETE service.
- [x] Tested GET all bookings.
- [x] Tested GET booking by ID.
- [x] Tested POST booking.
- [x] Tested PATCH booking.
- [x] Tested DELETE booking.

### Validation & Error Testing

- [x] Tested invalid IDs for Service endpoints.
- [x] Tested invalid IDs for Booking endpoints.
- [x] Tested missing-record responses.
- [x] Tested Booking creation validation errors.
- [x] Tested Booking update validation errors.
- [x] Tested empty Booking update requests.
- [x] Tested Service creation validation errors.
- [x] Tested Service update validation errors.
- [x] Tested empty Service update requests.
- [x] Tested centralized error-handling responses.

## Backend Development Roadmap

### Completed Implementation

- [x] Project setup and MongoDB connection.
- [x] Initial service data seeding.
- [x] Service CRUD API.
- [x] Service input validation.
- [x] Centralized error-handling middleware.
- [x] Connected Service CRUD controllers to centralized error handling.
- [x] Booking CRUD API implementation.
- [x] Booking input validation.
- [x] Booking creation and update validation.
- [x] Postman testing of all Service CRUD endpoints.
- [x] Postman testing of all Booking CRUD endpoints.
- [x] Invalid ID and missing-record testing.
- [x] Service and Booking validation testing.
- [x] Centralized error-handling testing.

### Pending Tasks

- [ ] Review and improve error handling.
- [ ] Implement user registration and login.
- [ ] Configure password hashing.
- [ ] Configure JWT authentication.
- [ ] Implement protected routes.
- [ ] Implement role-based authorization.
- [ ] Add search, filtering, and pagination.
- [ ] Implement booking history.
- [ ] Complete comprehensive API testing.
- [ ] Configure production environment.
- [ ] Deploy backend.
- [ ] Connect frontend.

## Current Progress

The project foundation, Service CRUD API, and Booking CRUD API have been implemented using Express.js and MongoDB.

Service and Booking input validation is implemented using `express-validator`. MongoDB ObjectId validation is also implemented for ID-based operations.

Centralized error-handling middleware is configured to handle errors passed through `next(error)`.

All ten CRUD endpoints have been successfully tested using Postman. Invalid ID and missing-record responses have also been tested. Service and Booking validation errors, empty update requests, and centralized error handling have been tested successfully.

**Next Development Phase:** Start implementing user registration and login, followed by password hashing and JWT authentication.