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
- bcryptjs
- jsonwebtoken
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
│   ├── booking.controllers.js
│   └── user.controllers.js
│
├── data/
│   └── services.json
│
├── middlewares/
│   ├── service.validation.js
│   ├── booking.validation.js
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── service.models.js
│   ├── booking.models.js
│   └── user.models.js
│
├── routes/
│   ├── service.routers.js
│   ├── booking.routes.js
│   └── user.router.js
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

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| GET    | `/service`     | Retrieve all services           |
| GET    | `/service/:id` | Retrieve a single service by ID |
| POST   | `/service`     | Create a new service            |
| PATCH  | `/service/:id` | Update an existing service      |
| DELETE | `/service/:id` | Delete a service                |

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

| Method | Endpoint       | Description                                                |
| ------ | -------------- | ---------------------------------------------------------- |
| POST   | `/booking`     | Create a new booking                                       |
| GET    | `/booking`     | Retrieve the logged-in user's bookings                     |
| GET    | `/booking/:id` | Retrieve an individual booking owned by the logged-in user |
| PATCH  | `/booking/:id` | Update a booking owned by the logged-in user               |
| DELETE | `/booking/:id` | Delete a booking owned by the logged-in user               |

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
- [x] Protected booking routes using JWT authentication.
- [x] Automatically assigned the authenticated user's ID when creating a booking.
- [x] Filtered booking list results using the authenticated user's ID.
- [x] Restricted individual booking retrieval to the booking owner.
- [x] Restricted booking updates to the booking owner.
- [x] Prevented users from changing the booking's `userId` during updates.
- [x] Restricted booking deletion to the booking owner.

## User Authentication & Authorization

### User Authentication Features

- [x] Created a separate user model.
- [x] Created user controllers.
- [x] Organized user routes using Express Router.
- [x] Implemented user registration.
- [x] Implemented user login.
- [x] Checked for existing users during registration.
- [x] Used `bcryptjs` to hash passwords.
- [x] Used `bcrypt.compare()` to verify passwords during login.
- [x] Configured JWT authentication using `jsonwebtoken`.
- [x] Stored JWT secret in environment variables.
- [x] Generated JWT tokens after successful login.
- [x] Created authentication middleware to verify JWT tokens.
- [x] Extracted authenticated user information from the JWT.
- [x] Protected booking routes using authentication middleware.

### User API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/users/register` | Register a new user     |
| POST   | `/users/login`    | Log in an existing user |

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

### Authentication Testing

- [x] Tested user registration.
- [x] Tested user login.
- [x] Tested password hashing.
- [x] Tested JWT token generation.
- [x] Tested protected routes without an Authorization header.
- [x] Tested protected routes with a valid Bearer token.
- [x] Verified that unauthenticated requests receive a 401 response.
- [ ] Tested booking ownership using two different users.
- [ ] Tested that one user cannot retrieve another user's booking.
- [ ] Tested that one user cannot update another user's booking.
- [ ] Tested that one user cannot delete another user's booking.

## Backend Development Roadmap

### Completed Implementation

- [x] Project setup and MongoDB connection.
- [x] Initial service data seeding.
- [x] Service CRUD API.
- [x] Service input validation.
- [x] Centralized error-handling middleware.
- [x] Booking CRUD API implementation.
- [x] Booking input validation.
- [x] Postman testing of all Service CRUD endpoints.
- [x] Postman testing of all Booking CRUD endpoints.
- [x] Invalid ID and missing-record testing.
- [x] Service and Booking validation testing.
- [x] User registration and login.
- [x] Password hashing using bcryptjs.
- [x] JWT token generation and verification.
- [x] Authentication middleware.
- [x] Protected booking routes.
- [x] Automatic user ID assignment during booking creation.
- [x] User-specific booking list retrieval.
- [x] Booking ownership checks for retrieving individual bookings.
- [x] Booking ownership checks for updating bookings.
- [x] Booking ownership checks for deleting bookings.
- [x] Prevented modification of booking ownership through update requests.

### Pending Tasks

- [ ] Complete booking ownership testing with two different users.
- [ ] Implement role-based authorization.
- [ ] Add search, filtering, and pagination.
- [ ] Complete comprehensive API testing.
- [ ] Review and improve error handling.
- [ ] Configure production environment.
- [ ] Deploy backend.
- [ ] Connect frontend.

## Current Progress

The project foundation, Service CRUD API, Booking CRUD API, and user authentication system have been implemented using Express.js and MongoDB.

Service and Booking input validation is implemented using `express-validator`. MongoDB ObjectId validation is also implemented for ID-based operations.

Centralized error-handling middleware is configured to handle errors passed through `next(error)`.

User registration and login are implemented with password hashing using `bcryptjs`. JWT authentication is configured using `jsonwebtoken`, and protected booking routes verify the user's token before allowing access.

New bookings are automatically associated with the authenticated user's ID. Users can retrieve their own bookings, and ownership checks are implemented for individual booking retrieval, updates, and deletion.

Users are also prevented from changing booking ownership through update requests.

**Next Development Phase:** Test booking ownership and authorization using two different users in Postman.
