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

| Method | Endpoint | Description |
|---|---|---|
| GET | `/service` | Retrieve services with search, filtering, and pagination |
| GET | `/service/:id` | Retrieve a single service by ID |
| POST | `/service` | Create a new service (Admin only) |
| PATCH | `/service/:id` | Update an existing service (Admin only) |
| DELETE | `/service/:id` | Delete a service (Admin only) |

### Service API Features

- [x] Created a separate service model.
- [x] Implemented service controllers.
- [x] Organized service routes using Express Router.
- [x] Implemented all five CRUD operations.
- [x] Added MongoDB ObjectId validation for ID-based operations.
- [x] Implemented input validation using `express-validator`.
- [x] Added validation for service creation and updates.
- [x] Added empty update request validation.
- [x] Created centralized error-handling middleware.
- [x] Connected Service CRUD controllers to centralized error handling using `next(error)`.
- [x] Registered the error handler after application routes.
- [x] Implemented public access to service retrieval.
- [x] Restricted service creation, updates, and deletion to admins.
- [x] Implemented service search by name using MongoDB `$regex`.
- [x] Implemented case-insensitive search.
- [x] Implemented minimum price filtering using `$gte`.
- [x] Implemented maximum price filtering using `$lte`.
- [x] Supported combining search and price filters.
- [x] Implemented pagination using `page` and `limit`.
- [x] Added pagination metadata: `currentPage`, `totalPages`, and `totalServices`.
- [ ] Tested search, price filtering, and pagination using Postman.
- [ ] Tested admin-only service operations using Postman.

### Service Search, Filtering & Pagination Examples

```text
GET /service?search=wash
GET /service?minPrice=100
GET /service?maxPrice=500
GET /service?minPrice=100&maxPrice=500
GET /service?page=1&limit=5
GET /service?search=wash&minPrice=100&maxPrice=500&page=1&limit=5
```

The service list response includes:

- `currentPage`: Current page number.
- `totalPages`: Total number of available pages.
- `totalServices`: Total number of services matching the filters.
- `data`: Services returned for the requested page.

## Booking API Development

### Booking CRUD Operations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/booking` | Create a booking for the logged-in user |
| GET | `/booking` | Retrieve the user's bookings or all bookings for admins |
| GET | `/booking/:id` | Retrieve an individual booking (Owner or Admin) |
| PATCH | `/booking/:id` | Update a booking (Owner or Admin) |
| DELETE | `/booking/:id` | Delete a booking (Owner or Admin) |
| GET | `/booking/stats` | Retrieve booking statistics |
| GET | `/booking/service-stats` | Retrieve booking statistics grouped by service |

### Booking API Features

- [x] Created a separate booking model.
- [x] Created booking controllers.
- [x] Organized booking routes using Express Router.
- [x] Implemented all five CRUD operations.
- [x] Added MongoDB ObjectId validation for booking ID-based operations.
- [x] Connected Booking Router to the main Express application.
- [x] Used centralized error handling with `next(error)` in booking controllers.
- [x] Implemented booking input validation using `express-validator`.
- [x] Added validation for booking creation and updates.
- [x] Added validation error responses.
- [x] Prevented empty booking update requests.
- [x] Protected booking routes using JWT authentication.
- [x] Automatically assigned the authenticated user's ID when creating a booking.
- [x] Filtered regular users' booking list results by their user ID.
- [x] Allowed admins to retrieve all bookings.
- [x] Restricted individual booking retrieval to the booking owner for regular users.
- [x] Allowed admins to retrieve any individual booking.
- [x] Restricted booking updates to the booking owner for regular users.
- [x] Allowed admins to update any booking.
- [x] Prevented users from changing the booking's `userId` during updates.
- [x] Restricted booking deletion to the booking owner for regular users.
- [x] Allowed admins to delete any booking.
- [x] Implemented booking search by service name.
- [x] Implemented booking search by customer name.
- [x] Implemented case-insensitive booking search.
- [x] Implemented booking status filtering.
- [x] Implemented booking date-range filtering.
- [x] Implemented booking pagination using `page` and `limit`.
- [x] Added pagination metadata: `currentPage`, `totalPages`, `totalBookings`, `hasPreviousPage`, and `hasNextPage`.
- [x] Implemented sorting by creation date.
- [x] Implemented sorting by price, customer name, and service name.
- [x] Added secondary sorting by creation date.
- [x] Implemented overall booking statistics.
- [x] Calculated total, pending, completed, and cancelled bookings.
- [x] Calculated total revenue from completed bookings.
- [x] Calculated average booking value.
- [x] Implemented service-wise booking statistics.
- [x] Applied user-specific booking filters to statistics.
- [x] Allowed admins to retrieve statistics for all bookings.
- [ ] Tested booking search, filtering, pagination, and sorting using Postman.
- [ ] Tested booking statistics endpoints using Postman.

### Booking Search, Filtering, Pagination & Sorting Examples

```text
GET /booking?page=1&limit=10

GET /booking?search=wash

GET /booking?status=pending

GET /booking?startDate=2026-11-01&endDate=2026-11-30

GET /booking?sort=oldest

GET /booking?sortBy=price

GET /booking?sortBy=price&sort=oldest

GET /booking?sortBy=customerName

GET /booking?sortBy=serviceName

GET /booking?search=wash&status=completed&page=1&limit=5

GET /booking?search=wash&startDate=2026-11-01&endDate=2026-11-30&page=1&limit=5
```

### Booking Statistics Examples

```text
GET /booking/stats

GET /booking/service-stats
```

The booking statistics endpoint provides:

- `totalBookings`: Total number of bookings.
- `pendingBookings`: Number of pending bookings.
- `completedBookings`: Number of completed bookings.
- `cancelledBookings`: Number of cancelled bookings.
- `totalRevenue`: Revenue from completed bookings.
- `averageBookingValue`: Average value of completed bookings.

The service-wise statistics endpoint groups bookings by service name and returns:

- `totalBookings`: Number of bookings for that service.
- `totalRevenue`: Total revenue generated by that service.

Regular users receive statistics for their own bookings, while admins receive statistics for all bookings.

## User Authentication & Authorization

### User Authentication Features

- [x] Created a separate user model.
- [x] Created user controllers.
- [x] Organized user routes using Express Router.
- [x] Implemented user registration and login.
- [x] Checked for existing users during registration.
- [x] Used `bcryptjs` to hash passwords.
- [x] Used `bcrypt.compare()` to verify passwords during login.
- [x] Configured JWT authentication using `jsonwebtoken`.
- [x] Stored JWT secret in environment variables.
- [x] Generated JWT tokens after successful login.
- [x] Included user ID, email, and role in JWT payload.
- [x] Created authentication middleware to verify JWT tokens.
- [x] Extracted authenticated user information from the JWT.
- [x] Protected booking routes using authentication middleware.

### Role-Based Authorization Features

- [x] Assigned the default `user` role during registration.
- [x] Implemented `verifyRole` authorization middleware.
- [x] Supported `user` and `admin` roles.
- [x] Restricted service creation, updates, and deletion to admins.
- [x] Allowed admins to manage all bookings.
- [x] Preserved booking ownership protection for regular users.
- [ ] Tested role-based authorization using Postman.

### User API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Log in an existing user |

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

### Authentication & Authorization Testing

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
- [ ] Tested admin access to all bookings.
- [ ] Tested admin access to service creation, update, and deletion.
- [ ] Tested that regular users cannot perform admin-only service operations.
- [ ] Tested that users with invalid or expired tokens are rejected.

### Search, Filtering, Pagination & Statistics Testing

- [ ] Tested service search and price filtering.
- [ ] Tested service pagination.
- [ ] Tested booking search by service name and customer name.
- [ ] Tested booking status filtering.
- [ ] Tested booking date-range filtering.
- [ ] Tested booking pagination and metadata.
- [ ] Tested booking sorting options.
- [ ] Tested overall booking statistics.
- [ ] Tested service-wise booking statistics.

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
- [x] Service and Booking validation implementation.
- [x] User registration and login.
- [x] Password hashing using bcryptjs.
- [x] JWT token generation and verification.
- [x] Authentication middleware.
- [x] Protected booking routes.
- [x] Automatic user ID assignment during booking creation.
- [x] User-specific booking list retrieval.
- [x] Booking ownership checks for retrieving, updating, and deleting bookings.
- [x] Prevented modification of booking ownership through update requests.
- [x] Role-based authorization middleware.
- [x] Default user role assignment.
- [x] Admin-only service creation, update, and deletion.
- [x] Admin access to all bookings.
- [x] Preserved regular user booking ownership restrictions.
- [x] Service search by name.
- [x] Service price filtering.
- [x] Service pagination and pagination metadata.
- [x] Booking search and filtering.
- [x] Booking pagination and pagination metadata.
- [x] Booking sorting.
- [x] Overall booking statistics.
- [x] Service-wise booking statistics.

### Pending Tasks

- [ ] Complete booking ownership testing with two different users.
- [ ] Complete role-based authorization testing.
- [ ] Test service search, price filtering, and pagination.
- [ ] Test booking search, filtering, pagination, and sorting.
- [ ] Test booking statistics endpoints.
- [ ] Complete comprehensive API testing.
- [ ] Review and improve error handling.
- [ ] Configure production environment.
- [ ] Deploy backend.
- [ ] Connect frontend.

## Current Progress

The project foundation, Service CRUD API, Booking CRUD API, authentication system, and role-based authorization have been implemented using Express.js and MongoDB.

Service and Booking input validation is implemented using `express-validator`. MongoDB ObjectId validation is also implemented for ID-based operations.

Centralized error-handling middleware is configured to handle errors passed through `next(error)`.

User registration and login are implemented with password hashing using `bcryptjs`. JWT authentication is configured using `jsonwebtoken`. The JWT payload includes the user's ID, email, and role.

The `verifyToken` middleware authenticates users, while the `verifyRole` middleware checks their authorization level.

Regular users can access and manage only their own bookings. Admins can retrieve, update, and delete all bookings. Service retrieval remains public, while service creation, updates, and deletion are restricted to admins.

The Service API supports searching by service name, filtering by minimum and maximum price, and pagination.

The Booking API supports searching by service name and customer name, filtering by status and date range, pagination, and sorting by multiple fields.

The Booking API also provides overall booking statistics and service-wise booking statistics. Regular users receive statistics for their own bookings, while admins receive statistics for all bookings.

**Next Development Phase:** Complete Postman testing for the new Booking API features, statistics, and role-based access control. Then review error handling and prepare the backend for deployment.