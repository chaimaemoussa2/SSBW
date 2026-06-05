FROM node:24-alpine AS base

WORKDIR /build

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN npx prisma generate

ENV NODE_ENV=production
ENV LOG_LEVEL=production
ENV POSTGRES_PASSWORD=una_clave_muy_segura_123
ENV POSTGRES_USER=yo
ENV POSTGRES_DB=ssbw
ENV IN=production
ENV SECRET_KEY="clave_supersegura_12345"
ENV PORT=3000
ENV POSTGRES_HOST=db
ENV DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}?schema=public

EXPOSE 3000

CMD ["node", "index.ts"]