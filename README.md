# Prisma ORM Tutorial

This is a simple tutorial demonstrating how to use **Prisma ORM** with **Express.js** to manage a database. This project showcases common CRUD operations (Create, Read, Update, Delete) and how to work with **Prisma Client** for interacting with the database.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 16.x or higher)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/installation-prisma)
- [PostgreSQL](https://www.postgresql.org/) or any supported database (MySQL, SQLite, etc.)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/trianandafajar/prisma-orm-tutorial.git
cd prisma-orm-tutorial
```

### 2. Install Dependencies

Install the required Node.js dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

### 4. Initialize Prisma

Generate Prisma Client and migrate the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Server

Start your Express server:

```bash
npm run dev
```

The server will be running on [http://localhost:3000](http://localhost:3000)

## API Endpoints

### User Endpoints
- `POST /user` - Create a new user
- `PUT /update` - Update a user (example with ID=1)
- `DELETE /delete` - Delete a user (example with ID=2)
- `GET /get-user` - Get all users

### Profile Endpoints
- `POST /profile` - Create a profile
- `GET /get-profile` - Get a profile (example with ID=1)

### Post Endpoints
- `POST /insert-post` - Create a post and assign a category
- `GET /post/:id` - Get a single post by ID

### Category Endpoints
- `POST /category` - Create a category

## Technologies Used
- Express.js
- Prisma ORM
- PostgreSQL
- bcrypt
- express-validator

## License

This project is open-source and available under the MIT License.

---

Feel free to fork and enhance this tutorial to suit your learning or project needs!
