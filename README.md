# Employee App

This is a CRUD (Create, Read, Update, Delete) application built with [Next.js](https://nextjs.org), a React framework, for managing employee data. This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/api-reference/create-next-app).

## Features

- Create new employee records
- Read and view employee details
- Update existing employee information
- Delete employee records
- Responsive design with TailwindCSS
- API integration using Axios

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x) or pnpm (>= 5.x) or bun (>= 0.x)

### Installation

Clone the repository:

```bash
git clone https://github.com/Devp-sriram/frontend-for-coursera-crud-app.git
cd frontend-for-coursera-crud-app


npm install
# or
yarn install
# or
pnpm install
# or
bun install


First, run the development server:


npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

.
├── public              # Public assets such as images, fonts, etc.
├── src
│   ├── components      # React components
│   ├── pages           # Next.js pages
│   ├── styles          # Global styles
│   ├── utils           # Utility functions and helpers
│   └── ...             # Other directories and files
├── .env.local          # Environment variables (local)
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation


Environment Variables
Create a .env.local file in the root of the project and add your configurations:

```bash
NEXT_PUBLIC_API_URL=<your_api_url>
```

