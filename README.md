# Node.js Backend Boilerplate

A production-ready Node.js + TypeScript backend boilerplate featuring JWT authentication, PostgreSQL integration, centralized error handling, and auto-generated Swagger API documentation.

## Features

- 🔐 JWT-based authentication (Register, Login, Protected routes)
- 🗄️ PostgreSQL database integration
- ✅ Request validation with Zod
- 🛡️ Security best practices (Helmet, CORS, bcrypt password hashing)
- 📄 Auto-generated Swagger API docs
- 🐳 Docker + Docker Compose support
- 🧹 Clean, modular architecture (feature-based folder structure)
- ⚡ Centralized error handling

## Tech Stack

Node.js, Express, TypeScript, PostgreSQL, JWT, Zod, Swagger, Docker

## Project Structure

src/
├── config/ # Environment, database, Swagger config
├── middleware/ # Auth, error handling, 404 handler
├── modules/
│ ├── auth/ # Auth routes, controller, service, validator
│ ├── health/ # Health check route
│ └── user/ # User repository
├── routes/ # Central route aggregator
├── types/ # Custom TypeScript types
├── utils/ # ApiError, ApiResponse, catchAsync
├── app.ts
└── server.ts

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/paras-goyal/nodejs-backend-boilerplate.git
cd nodejs-backend-boilerplate
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in your database credentials and JWT secret:

```dotenv
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/boilerplate_db
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Set up the database

Run the SQL in `src/database/schema.sql` against your PostgreSQL instance.

### 4. Run the server

```bash
npm run dev
```

API docs available at: `http://localhost:5000/api-docs`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/health | Health check | No |

## Example Requests

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

**Response** `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "token": "<jwt_token>"
  }
}
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

**Response** `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com" },
    "token": "<jwt_token>"
  }
}
```

### Get current user (protected route)

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```

**Response** `200 OK`

```json
{
  "success": true,
  "message": "Current user fetched",
  "data": { "id": 1, "email": "jane@example.com" }
}
```

## Running with Docker

```bash
docker-compose up
```

This spins up both the app and a PostgreSQL container together.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## License

MIT © Paras Goyal