# Node Church API

Backend API built with Node.js and Express for the church project. This project is very similar to the Laravel project counterpart and aims to reuse the same database schema, logic and endpoints where applicable.

## Tech Stack

-   Node.js 20 or later
-   Express 5
-   Knex query builder
-   Objection (lightweight ORM layer on top of Knex)
-   SQLite (development) via `sqlite3` (configurable for other SQL DBs)
-   Joi for input validation
-   JWT for authentication
-   bcryptjs for password hashing
-   dotenv for environment variables
-   Additional security and tooling: helmet, express-rate-limit, morgan

## Setup

### Prerequisites

-   Node.js 20+ (install from nodejs.org)
-   npm (bundled with Node)

### Installation Steps

1. Clone the repository and enter the folder:

    ```bash
    git clone https://github.com/LucasLeonte/node-church-api.git
    cd node-church-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Copy or create an `.env` file at project root with required variables:

    ```bash
    cp .env.example .env
    ```

    Example:

    ```env
    NODE_ENV=development
    PORT=3000
    DB_CLIENT=sqlite3
    DB_FILENAME=./dev.sqlite3
    JWT_SECRET=your-secret-key
    SALT_ROUNDS=10
    ```

4. Run migrations to create the database schema (Knex reads `knexfile.js`):

    ```bash
    npm run migrate
    ```

5. Run seeders (optional, populates sample data):

    ```bash
    npm run seed
    ```

6. Start the server:

    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:3000` (or the `PORT` you set).

Open `http://localhost:3000/` to view the endpoint list served by [public/index.html](public/index.html).

## Database and Migrations

-   This project uses Knex for query building and migrations. Migration files live in `src/db/migrations` and mostly match the schemas expected by the Laravel project.
-   Configuration is in `knexfile.js` and in `src/config/database.js`.
-   To run migrations: `npm run migrate`. To rollback: `npm run migrate:rollback`.

## Validation Techniques

Validation is performed at multiple layers to ensure data integrity and security:

-   Request-level validation using Joi schemas (see `validators/*.schema.js`) applied via `validation.middleware.js`.
    -   Ensures required fields are present (no blank values).
    -   Enforces types: numeric fields reject non-numeric input.
    -   String constraints: names are validated to contain only alphabetic characters and spaces.
    -   Email format validation using Joi's `email()`.
    -   Password rules (minimum length, can be extended to check complexity).
-   Business validation in services:
    -   Referential checks (e.g., referenced category IDs exist) before creating relations.
    -   Cross-field validation (e.g., `end_date` must be after `start_date` if both provided).
    -   Name and time format validation via regex.
-   Database-level constraints:
    -   Migrations include NOT NULL and foreign key constraints where appropriate.

All validation errors are returned with a standardized error payload by the centralized error handler.

## Authentication & Middleware

-   Authentication: JWT-based access tokens, login/register endpoints in `routes/auth.js` and logic in `services/auth.service.js`.
-   Passwords hashed with `bcryptjs` before storage.
-   Security middleware in place:
    -   `helmet` for HTTP header hardening.
    -   `express-rate-limit` protects endpoints against brute force.
    -   `morgan` for request logging in development.
-   Centralized error handling is implemented in `middleware/error.middleware.js` to normalize responses and status codes.

## NPM Modules and Docs

-   `express` — web framework for Node.js. https://expressjs.com/
-   `knex` — SQL query builder and migration tool. https://knexjs.org/
-   `sqlite3` — SQLite driver (used in development). https://www.npmjs.com/package/sqlite3
-   `objection` — ORM on top of Knex for model relations. https://vincit.github.io/objection.js/
-   `joi` — schema description and validation. https://joi.dev/api/?v=17.13.3
-   `bcryptjs` — bcrypt implementation for hashing passwords. https://www.npmjs.com/package/bcryptjs
-   `helmet` — sets secure HTTP headers. https://helmetjs.github.io/
-   `express-rate-limit` — basic rate-limiting middleware. https://www.npmjs.com/package/express-rate-limit
-   `morgan` — HTTP request logger. https://www.npmjs.com/package/morgan
-   `nodemon` (devDependency) — restarts server on file changes during development. https://nodemon.io/

## Additional Sources

**Canvas**: course materials.

## AI Usage

This project was developed with assistance from GitHub Copilot as follows:

-   Used during initial setup to translate migrations and seeder from Laravel to Knex syntax.
-   Used for development acceleration throughout the project.
-   All generated code has been carefully reviewed, analyzed, verified for correctness, and understood before acceptance.
-   The overall application architecture was designed and implemented by me, ensuring all generated snippets integrated correctly into the project.
-   Usage was distributed across the entire project as needed for various components and features.
