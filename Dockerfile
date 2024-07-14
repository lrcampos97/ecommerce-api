FROM node:20.9.0-alpine

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 4000

# Run migrations and start the apollo 
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
