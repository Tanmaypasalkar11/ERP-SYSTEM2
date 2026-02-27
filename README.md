# Streleam ERP (Manufacturing Workflow)

Workflow: **Customer Order → Purchase Order → Inward → Production → Sale/Outward → Reports**.

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL
- ORM: Prisma
- Auth: JWT

## Roles
- ADMIN
- PURCHASE_MANAGER
- PRODUCTION_MANAGER
- SALES_MANAGER

## Project Structure
- `client/` React + Tailwind UI
- `server/` Express API + Prisma schema
- `API.md` API documentation
- `DB_SCHEMA.md` database overview

## Local Setup

### Backend
```
cd /Users/tanmay/Desktop/streleam/server
cp .env.example .env
# update DATABASE_URL + JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

### Frontend
```
cd /Users/tanmay/Desktop/streleam/client
cp .env.example .env
npm install
npm run dev
```

## Seed Users
- Admin: `admin@erp.com`
- Purchase: `purchase@erp.com`
- Production: `production@erp.com`
- Sales: `sales@erp.com`
- Passwords: `admin123`, `purchase123`, `production123`, `sales123`
