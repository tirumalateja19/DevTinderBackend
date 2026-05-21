# DevTinder Backend 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

## 📌 Overview

DevTinder is a **MERN stack** web application that helps developers **connect and collaborate** — think Tinder, but built for the dev community. Users can create profiles, browse other developers, send connection requests, and manage their matches.

This repository contains the **backend**, built with **Node.js, Express, and MongoDB**, following a **modular MVC architecture** for scalability and maintainability.

> 🔗 **Frontend Repository:** [DevTinder Frontend](https://github.com/tirumalateja19/DevTinderFrontend.git)  
> ⚠️ **Note:** The backend is fully functional and ready for further scaling and optimizations.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) + Secure Cookies |
| Encryption | bcryptjs |
| API Testing | Postman |
| Config Management | dotenv |
| Package Manager | npm |

---

## 🔑 Features Implemented

### 1. Authentication System
- User Signup, Login, and Logout
- JWT-based authentication via secure HTTP-only cookies
- Password encryption using **bcryptjs**
- Auth middleware protecting all private routes

### 2. User Profile Management
- View logged-in user profile
- Edit profile details (restricted fields enforced for security)
- Update password with validation

### 3. Connection Request System
- Send connection requests with `Interested` or `Ignored` status
- Accept or reject received requests
- Duplicate request prevention via MongoDB schema validation
- Self-request prevention using Mongoose `.pre` middleware

### 4. Feed API & Pagination
- Fetches suggested developer profiles, automatically excluding:
  - The logged-in user
  - Existing connections
  - Ignored users
  - Users with pending requests
- Server-side pagination using `skip` & `limit`
- Optimized queries using MongoDB `$nin` and `$ne` operators

### 5. Database Design
- **User Schema** — sanitized input (`trim`, `lowercase`), unique constraints on email and username
- **ConnectionRequest Schema** — `fromUserId`, `toUserId`, `status` with enum validation; compound indexes to prevent duplicate requests

### 6. Advanced Query Optimization
- `index: true` on frequently queried fields
- Compound indexes on ConnectionRequest schema for fast lookups

### 7. Middleware Architecture
- **Auth Middleware** — protects all private routes
- **Error Handling Middleware** — centralized error response format
- **Mongoose `.pre` Middleware** — blocks self-connection requests

### 8. Modular Router Structure
- APIs split across 4 dedicated routers: `authRouter`, `profileRouter`, `connectionRequestRouter`, `userRouter`

---

## 🚀 API Endpoints

### `authRouter`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register a new user | ❌ |
| POST | `/auth/login` | Authenticate user & issue JWT cookie | ❌ |
| POST | `/auth/logout` | Logout & clear JWT cookie | ✅ |

---

### `profileRouter`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | View logged-in user's profile | ✅ |
| PATCH | `/profile/edit` | Update allowed profile fields | ✅ |
| PATCH | `/profile/password` | Update user password | ✅ |

---

### `connectionRequestRouter`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/request/send/interested/:userId` | Send an interested connection request | ✅ |
| POST | `/request/send/ignored/:userId` | Ignore a developer | ✅ |
| POST | `/request/review/accepted/:requestId` | Accept a connection request | ✅ |
| POST | `/request/review/rejected/:requestId` | Reject a connection request | ✅ |

---

### `userRouter`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user/requests/received` | Fetch all pending incoming requests | ✅ |
| GET | `/user/connections` | Fetch all accepted connections | ✅ |
| GET | `/user/feed?page=1&limit=10` | Get paginated developer feed | ✅ |

---

## 🏗️ Setup & Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/tirumalateja19/DevTinderBackend.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:
```ini
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder
PORT=3000
```

### 4. Start the Server
```bash
npm start
```

Server runs at: `http://localhost:3000/`

> Make sure the backend is running before launching the frontend.

---

## 📁 Project Structure

```
devTinder-backend/
├── src/
│   ├── config/         # DB connection
│   ├── middlewares/    # Auth & error handling middleware
│   ├── models/         # Mongoose schemas (User, ConnectionRequest)
│   ├── routes/         # authRouter, profileRouter, connectionRequestRouter, userRouter
│   └── utils/          # Helper functions & validation
├── .env
├── app.js
└── package.json
```

---

## 📌 Future Enhancements

- 🔹 Real-time notifications using WebSockets
- 🔹 In-app messaging system
- 🔹 Profile search & filtering
- 🔹 Unit & integration testing

---

## 📢 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

*Built with Node.js, Express, and MongoDB by [Tirumala Teja Jampani](https://www.linkedin.com/in/tirumalateja19/)*
