FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm@lastest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]