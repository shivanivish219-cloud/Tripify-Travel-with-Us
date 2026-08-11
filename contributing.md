# Contributing to Tripify

## Setup Instructions

### Frontend

```bash
npm install
cp .env.example .env  # Update with local values
npm run dev
```

### Backend

```bash
cd Tripify-Backend
npm install
cp .env.example .env  # Update with local values
npm run dev
```

## Environment Variables

### Required for Development

- `VITE_API_URL=http://localhost:5000/api` (Frontend)
- `MONGO_URI=mongodb://...` (Backend)
- `JWT_SECRET=your-secret-key` (Backend)
- `PORT=5000` (Backend)

## Branch Naming

- `feature/feature-name` for new features
- `bugfix/bug-name` for bug fixes
- `hotfix/issue-name` for urgent fixes

## Commit Message Format
