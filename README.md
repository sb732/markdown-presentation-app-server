
# Markdown Slides Backend

Backend API server for the Markdown Slides application built with Node.js, Express.js, and SQLite.

## Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:3001

## API Endpoints

### Presentations
- `GET /api/presentations` - Get all presentations
- `GET /api/presentations/:id` - Get a specific presentation
- `POST /api/presentations` - Create a new presentation
- `PUT /api/presentations/:id` - Update a presentation
- `DELETE /api/presentations/:id` - Delete a presentation

### Health Check
- `GET /api/health` - Server health check

## Database

The application uses SQLite with Sequelize ORM. The database file will be created automatically at `server/database.sqlite` when you first run the server.

## Development

- `npm run dev` - Start with nodemon for auto-restart
- `npm start` - Start in production mode
- `npm test` - Run tests (when implemented)
