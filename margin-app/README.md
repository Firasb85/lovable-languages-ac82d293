# Margin (ربح) - AI Business Diagnostic Tool

AI-powered business diagnostic tool for SMEs in Iraq and the Arab region.

## Features

- 12-15 question diagnostic survey across 5 axes
- Dynamic scoring algorithm with weighted axes (Revenue: 25%, Customers: 20%, Competition: 20%, Internal: 20%, Marketing: 15%)
- Customized diagnosis with sector-specific comparisons
- 3 immediate actionable decisions
- 90-day strategic plan
- Downloadable PDF reports in Arabic (RTL support)
- Freemium subscription model
- Local payment gateways (ZainCash, AsiaHawala)
- Optimized for low-end devices and slow connections

## Quick Start

1. Download this repository as ZIP from GitHub
2. Navigate to the margin-app directory
3. Follow the instructions below

## Setup

```bash
cd margin-app

# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

cd backend && npm install
npx prisma generate
npx prisma migrate dev

# Frontend
cd ../frontend
npm install

# Run with Docker (Recommended)
cd ..
docker-compose up -d
```

## Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure
```
margin-app/
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── reportController.js
│   │   │   └── paymentController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── reportRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── paymentRoutes.js
│   │   └── utils/
│   │       ├── diagnosis.js
│   │       └── pdfGenerator.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── frontend/         # Next.js application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.js
│   │   │   ├── Layout.js
│   │   │   ├── LoadingScreen.js
│   │   │   ├── MobileNav.js
│   │   │   ├── Navbar.js
│   │   │   ├── SideMenu.js
│   │   │   └── ToastContainer.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── _app.js
│   │   │   ├── about.js
│   │   │   ├── dashboard.js
│   │   │   ├── index.js
│   │   │   ├── login.js
│   │   │   ├── pricing.js
│   │   │   ├── register.js
│   │   │   ├── report/
│   │   │   │   └── [id].js
│   │   │   └── survey.js
│   │   └── styles/
│   │       └── globals.css
│   ├── .env.example
│   ├── Dockerfile
│   ├── next.config.js
│   ├── package.json
│   └── tailwind.config.js
│
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Tech Stack
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Frontend**: Next.js, React, Tailwind CSS
- **Infrastructure**: Docker, Docker Compose, Nginx

## License
Private - All rights reserved
