Of course\! Here is the `README.md` rewritten for a construction company in English, with the updated endpoints.

-----

# 🏗️ Construtora Express – Backend API

In this project, I’m building a **real estate/construction backend system** for managing visits using **Express.js**.
It’s a simple CRUD application for managing **admins, realtors, clients, property units, and scheduled visits**.

-----

## 🛠 Tech Stack

  * **Node.js** – Runtime environment
  * **Express.js** – Web framework
  * **PostgreSQL** – Database
  * **Prisma** - ORM
  * **Zod** - Validations
  * **Swagger** - Documentation

-----

## 📦 Installation

Clone this repository:

```bash
git clone https://github.com/MatCalixto/construtora-express.git
```

Go into the project folder:

```bash
cd construtora-express
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

-----

## ▶️ Usage

Once running, the server will be available at:

```
http://localhost:3333
```

The Swagger API documentation will be available at:

```
http://localhost:3333/api-docs
```

### API Endpoints

### Admins 👨‍💼👩‍💼

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/administradores` | Get all admins |
| `GET` | `/api/administradores/:id` | Get an admin by ID |
| `POST` | `/api/administradores` | Add a new admin |
| `PUT` | `/api/administradores/:id` | Update an admin's data |
| `DELETE` | `/api/administradores/:id` | Remove an admin |

### Realtors 🧑‍💼

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/corretores` | Get all realtors |
| `GET` | `/api/corretores/:id` | Get a realtor by ID |
| `POST` | `/api/corretores` | Add a new realtor |
| `PUT` | `/api/corretores/:id` | Update a realtor's data |
| `DELETE` | `/api/corretores/:id` | Remove a realtor |

### Clients 👤

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/clientes` | Get all clients |
| `GET` | `/api/clientes/:id` | Get a client by ID |
| `POST` | `/api/clientes` | Add a new client |
| `PUT` | `/api/clientes/:id` | Update a client's data |
| `DELETE` | `/api/clientes/:id` | Remove a client |

### Units 🏢

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/unidades` | Get all units |
| `GET` | `/api/unidades/:id` | Get a unit by ID |
| `POST` | `/api/unidades` | Add a new unit |
| `PUT` | `/api/unidades/:id` | Update a unit's data |
| `DELETE` | `/api/unidades/:id` | Remove a unit |

### Visits 📅

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/visitas` | Get all visits |
| `GET` | `/api/visitas/:id` | Get a visit by ID |
| `POST` | `/api/visitas` | Add a new visit |
| `PUT` | `/api/visitas/:id` | Update a visit's data |
| `DELETE` | `/api/visitas/:id` | Remove a visit |
