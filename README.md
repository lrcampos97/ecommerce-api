# E-commerce API

This project is a mini E-commerce API built with Node.js, TypeScript, Apollo Server, Prisma, PostgreSQL, Redis, and Elasticsearch. The architecture and design decisions focus on scalability, performance, and ease of development.

## Table of Contents

- [Architecture and Design Decisions](#architecture-and-design-decisions)
- [Setup and Usage](#setup-and-usage)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Docker Instructions](#docker-instructions)
- [Future Improvements](#future-improvements)

## Architecture and Design Decisions

### Using pnpm

I've chose pnpm for its superior performance of handling dependencies. It creates a single version of all packages in the node_modules directory, reducing disk space to improve speed.

- My reference: [pnpm vs npm](https://pnpm.io/pnpm-vs-npm)

### Using Prisma

Prisma is used for database access ORM. It provides a type-safe database client, it also helps in managing database migrations and schema changes seamlessly.

### Ioredis

Ioredis is used as the Redis client. It has a rich API that covers all Redis commands, making it easy to integrate Redis functionalities into the application.

### Type-GraphQL

Type-GraphQL is used for creating GraphQL schemas, types, and resolvers, avoiding the need to manually create types and interfaces.

### Class-validator

Class-validator is used for input validation. It provides a declarative way to validate data, ensuring the integrity and correctness of the input.

### Prettier + ESLint for Code Quality

Prettier and ESLint maintain code quality and consistency across the project. ESLint is a static code analysis tool that helps identify and fix problems in the code.

### Apollo Standalone Server

Apollo Server is used in standalone mode for quick server startup without the need for HTTP routes, simplifying setup and improving performance.

### Pino Log

Pino is used for logging. It is a fast, lightweight logging library providing a consistent and efficient way to log application events.

### ts-node-dev for Development

Ts-node-dev is used for running the application in development mode. It provides fast and efficient TypeScript transpilation and hot-reloading.

### Storing Only Name and Description in Elasticsearch

Store only the name and description fields in Elasticsearch for efficient search indexing, while the full product details are stored in PostgreSQL.

## Setup and Usage

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Environment Variables

Create a `.env` file based on the `.env.sample` provided in the project. Configure the necessary environment variables such as `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, and `ELASTICSEARCH_URL`.

### Docker Instructions

1. **Build the Docker Image:**

   ```bash
   docker-compose build
   ```

2. **Run the Application:**
   ```bash
   docker-compose up
   ```

This command will start the Apollo Server application, PostgreSQL, Redis, and Elasticsearch, ensuring they are all running together.

## Suggestion for future improvements

### Include Husky for Pre-commit Hooks

Add Husky to run linting and formatting checks before committing code. This ensures code quality and consistency.

### Use Redis Password in Production

Configure Redis to use a password in production for enhanced security.

### Manage Cache Timing

Implement proper cache timing management to ensure data is up-to-date while reducing the load on the database and Elasticsearch (currently is set up as 30 minutes)

### Add esbuild to the Project

Esbuild is one of the best JavaScript bundlers and minifiers. Adding it to the project can improve build times and optimize the output.

### Migrate to Apollo Server Express

Consider migrating to Apollo Server Express if there is a need to combine REST and GraphQL endpoints.

### Omit Stack Trace from Apollo in Production

Ensure that stack traces are omitted in production to avoid leaking sensitive information. This should be the default behavior, but it's worth double-checking.

### Enable Security and Use SSL Certificates in Elasticsearch

Enable security features in Elasticsearch and use SSL certificates to ensure secure communication and data integrity.

### Kubernetes for Orchestration

I strong suggest using ks8 for the container orchestration, that provides automated deployment, scaling and management of container applications, ensuring the scalability and high availability.

### Sentry

Implement sentry for api monitoring, metrics and stack traces management.
