# Backend - Bug Tracker

This is the backend service for the Bug Tracker application. It is built using Node.js, Express, Prisma, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with role-based access control.
- **Bug Reporting**: Create detailed bug reports with title, description, and severity levels.
- **Bug Management**: Track bug status (Open → In Progress → Closed).
- **Role-based Access**:
  - **Reporter**: Submit bugs and view/update only their own bugs.
  - **Admin**: View and update all bugs in the system.

## 🛠 Tech Stack

- **Node.js** with **Express.js** - Server framework.
- **Prisma** - Database ORM.
- **PostgreSQL** - Database.
- **JWT** - Authentication.
- **bcryptjs** - Password hashing.

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd BugTrackerApp/backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env` and update the following variables:

- `DATABASE_URL`: Your PostgreSQL database connection string.
- `JWT_SECRET`: Secret key for JWT authentication.

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the Server

```bash
yarn dev
```

➡ Backend will run on: [http://localhost:5000](http://localhost:5000)

## ☁️ Deployment

- **Hosting**: vercel.
- **Environment Variables**: Ensure `DATABASE_URL` and `JWT_SECRET` are set in the hosting platform.

## 🤖 AI Usage Notes

- **Where**: For generating boilerplate code (auth routes, Prisma schema).
- **Why**: To save time and ensure best practices.
- **What I learned**: How to structure a backend with Prisma and implement role-based authentication with JWT.
