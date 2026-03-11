# Design Overview

This document outlines the basic schema and architecture for the kudos feature.

## Database Schema (conceptual)

Although the current implementation uses in-memory storage, a real deployment
would use a relational database. Below is the proposed table structure:

### Users

- `id` (int, primary key)
- `name` (varchar)
- other profile fields as needed

### Kudos

- `id` (int, primary key)
- `from_id` (int, foreign key → Users.id)
- `to_id` (int, foreign key → Users.id)
- `message` (text)
- `timestamp` (datetime)
- `is_visible` (boolean, default true) <!-- new field for moderation -->

The `is_visible` flag allows administrators to hide or delete inappropriate
messages while preserving them for audit purposes.

## API Endpoints

- `GET /api/users` - list all users
- `GET /api/kudos` - return kudos where `is_visible` = true, ordered by
  timestamp desc
- `POST /api/kudos` - create a new kudo (visible by default)
- (future) `PATCH /api/kudos/:id` - update `is_visible` for moderation
- (future) `DELETE /api/kudos/:id` - remove a kudo permanently

## Frontend Considerations

- Public feed displays only kudos with `is_visible` true.
- An admin panel could provide controls to toggle visibility or delete entries.

## Notes

The in-memory implementation will be extended later to persist data in a
database; the schema above guides that migration.
