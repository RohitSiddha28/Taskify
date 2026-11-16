# Taskify

Taskify is a simple task manager built as a React single-page application with an Express API and MongoDB. Users can create an account, sign in, and create, view, edit, and delete tasks. A visitor can try adding tasks without signing in, but those tasks only remain in the current page session and are not saved.

## Features

- React interface with Home, About, Tasks, Sign Up, and Log In pages.
- Account registration and login. Passwords are hashed with bcrypt before storage.
- Task creation, listing (newest first), editing, and deletion for a signed-in user.
- Redux state for the signed-in user and browser `localStorage` to remember the user ID between reloads.
- Express JSON API backed by MongoDB/Mongoose.
- Responsive styling with Tailwind CSS and Vite.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 8 requirement) and npm.
- A MongoDB database, either local or hosted (for example, MongoDB Atlas).
- Network access between the browser, API, and MongoDB.

## Project layout

```text
.
├── backend/            # Express API, Mongoose models, and database connection
│   ├── app.js
│   ├── connection/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── frontend/           # React, Redux, and Vite application
    └── src/
```

## Setup

### 1. Configure MongoDB and the API

Create `backend/.env` (this file is ignored by Git) with:

```dotenv
PORT=5000
URI=mongodb://127.0.0.1:27017
DB_name=taskify
```

For MongoDB Atlas, use your MongoDB connection URI as `URI` and set `DB_name` to the database name. Keep credentials private; do not commit `.env`.

The server connects to `${URI}/${DB_name}` and listens on `PORT`, defaulting to `5000`.

### 2. Install dependencies

In one terminal:

```bash
cd backend
npm install
```

In a second terminal:

```bash
cd frontend
npm install
```

### 3. Set the frontend API address

The API currently listens on port `5000`, but the frontend request URLs in `frontend/src/components` use `http://localhost:8000`. For local development, change those URLs to `http://localhost:5000` before running the app. If you configure the backend to use port `8000` instead, the frontend URLs can stay as they are. The frontend does not currently read an API base URL from an environment variable.

### 4. Run the app

Start the API (with MongoDB available):

```bash
cd backend
npm start
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The API health response is available at `http://localhost:5000/` when using the default API port.

## API reference

All endpoints accept and return JSON except `GET /`, which returns a short text health response. The backend enables CORS for development.

| Method | Endpoint | Purpose | Request body |
| --- | --- | --- | --- |
| `GET` | `/` | API health check | — |
| `POST` | `/api/v1/register` | Register an account | `{ "email": "...", "username": "...", "password": "..." }` |
| `POST` | `/api/v1/login` | Log in | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/v2/addTask` | Create a task for a user | `{ "title": "...", "body": "...", "id": "<userId>" }` |
| `GET` | `/api/v2/getTask/:id` | List that user's tasks, newest first | — |
| `PUT` | `/api/v2/updateTask/:id` | Update a task | `{ "title": "...", "body": "...", "userId": "<userId>" }` |
| `DELETE` | `/api/v2/deleteTask/:id` | Delete a task | `{ "userId": "<userId>" }` |

Successful registration returns `201`; login, task creation, update, and deletion return success responses. Errors include a JSON `message`. The current API identifies users by MongoDB ID and does not issue an authentication token.

## Available scripts

Run scripts from the relevant directory:

| Directory | Command | Description |
| --- | --- | --- |
| `backend` | `npm start` | Start the API with Nodemon |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Build frontend assets into `frontend/dist` |
| `frontend` | `npm run preview` | Serve the production build locally |
| `frontend` | `npm run lint` | Run ESLint |

## Notes

- Sign-up and login store the user ID in `localStorage`; logging out removes it.
- Tasks created while logged out are only held in frontend memory and disappear when the page is reloaded.
- Set the frontend API URLs to the address of the deployed backend before deploying. Configure production CORS and MongoDB access for the deployment environment.
- The About page currently contains placeholder text.
