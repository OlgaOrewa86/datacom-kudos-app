# Internal Web App – Kudos Feature

This repository contains a simple full-stack application demonstrating an internal "kudos" feature. Users can send appreciation messages to colleagues and view a public feed of recent kudos.

## Architecture

- **Backend**: Node.js with Express (in `/server`)
  - Endpoints:
    - `GET /api/users` – returns a list of users.
    - `GET /api/kudos` – returns recent kudos.
    - `POST /api/kudos` – submit a new kudo.
- **Frontend**: React app created with Create React App (in `/client`)
  - Displays form for sending kudos and a feed of recent messages.

## Getting Started

1. **Install dependencies**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. **Run the backend**
   ```bash
   cd server
   npm start
   # listens on port 5001
   ```
3. **Run the frontend**
   ```bash
   cd client
   npm start
   # opens http://localhost:3000
   ```

## User Stories

1. As a user, I can select a colleague from a list, write a short appreciation message, and submit a kudo.
2. As a user, I can view a public feed on the dashboard showing all recently submitted kudos.
3. **As an administrator, I can hide or delete inappropriate kudos messages from the public feed.**

## Notes

- This project uses in-memory arrays for users and kudos; restart the server to clear data.
- The `fromId` in the kudos form is hardcoded for demonstration purposes.
- Replace with real authentication and persistent storage in production.
