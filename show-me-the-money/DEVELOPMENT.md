# Developer Guide

This is a simple application that will query the Xero Balance Sheet API and display the data in a table.

It is developed using Next.js (v14 - Page Router), Typescript, and MUI/Joy.

## Prerequisites

- [Node.js](https://nodejs.org/en) (v20.x)
- [pnpm](https://pnpm.io/installation) (v9.x)
- Docker runtime and Docker Compose

## Running the app locally

### Start a mock Xero API and a backend server

#### With Docker

1. Run `docker compose up` (or `docker-compose up` if using `docker-compose` CLI) in the root directory
2. The mock Xero API will be available at `http://localhost:3000/api.xro/2.0/Reports/BalanceSheet`
3. The backend server will be available at `http://localhost:3001/api/balance-sheet`

#### Without Docker

1. Start a mock Xero API by running

```sh
docker run -d -p 3000:3000 jaypeng2015/show-me-the-money:latest
```

2. The mock Xero API will be available at `http://localhost:3000/api.xro/2.0/Reports/BalanceSheet`
3. Navigate to `smtm-backend` directory
4. Run `pnpm install` in the `smtm-backend` directory to install the dependencies
5. Run `pnpm run dev` in the `smtm-backend` directory to start the backend server
6. The backend server will be available at `http://localhost:3001/api/balance-sheet`

### Start the app

1. Navigate to the `smtm-app` directory
2. Run `pnpm install` to install the dependencies
3. Run `pnpm run dev` to start the development server
4. The app will be available at `http://localhost:8000`
