School Management Backend

A Node.js and Express.js-based backend for managing school data, including user authentication and school information with geolocation-based sorting. This application uses Sequelize with MySQL for database operations and JWT for secure authentication.

Features





User Authentication: Register and login users with secure password hashing using bcrypt.



School Management: Add, list, and delete schools with geolocation data (latitude and longitude).



Distance Calculation: Sort schools by distance from a user-provided location using the Haversine formula.



Protected Routes: Secure API endpoints with JWT-based authentication.



MySQL Database: Persistent storage using Sequelize ORM with MySQL.

Technologies Used





Node.js: JavaScript runtime for the backend.



Express.js: Web framework for building RESTful APIs.



Sequelize: ORM for MySQL database operations.



MySQL: Relational database for storing user and school data.



JWT: JSON Web Tokens for secure authentication.



Bcrypt: Password hashing for secure user registration.



dotenv: Environment variable management.

Prerequisites





Node.js (v16 or higher)



MySQL (v8 or higher)



npm (v8 or higher)

Clone the Repository:

git clone <repository-url>

cd school-management-backend

Set Up Environment Variables  Create a .env file in the root directory and configure the following variables:

PORT=3000

DB_HOST=localhost

DB_USER=your_mysql_user

DB_PASSWORD=your_mysql_password

DB_NAME=school_management

JWT_SECRET=your_jwt_secret

API Endpoints

Authentication





POST /api/auth/register





Registers a new user.



Body: { "userName": "string", "email": "string", "password": "string", "address": "string" }



Response: { success: true, message: "user successfully created", user: {...} }



POST /api/auth/login





Authenticates a user and returns a JWT token.



Body: { "email": "string", "password": "string" }



Response: { success: true, message: "Login successful", token: "string" }

Schools (Protected Routes)

All school-related endpoints require an Authorization header with a Bearer token (Bearer <token>).





POST /api/schools/addSchool





Adds a new school with geolocation data.



Body: { "name": "string", "address": "string", "latitude": number, "longitude": number }



Response: { success: true, message: "School added successfully", school: {...} }



GET /api/schools/listSchools?latitude=&longitude=





Lists all schools, sorted by distance from the provided coordinates.



Query Params: latitude (number), longitude (number)



Response: { success: true, schools: [{ ..., distance: number }, ...] }



DELETE /api/schools/deleteSchool/:id





Deletes a school by ID.



Params: id (school ID)



Response: { success: true, message: "School deleted successfully" }
