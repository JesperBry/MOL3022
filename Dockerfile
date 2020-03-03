FROM python:3.7-slim-buster AS build-backend

WORKDIR /app

RUN apt-get update && apt-get install -y dssp

COPY ./backend/req.txt .

RUN pip install -r req.txt

FROM node:13.8-buster-slim AS build-frontend

WORKDIR /build

COPY ./client/package.json ./client/package-lock.json ./

RUN npm install

COPY ./client .

RUN npm run build

FROM build-backend

COPY ./backend .
COPY --from=build-frontend /build/build ./static

ENV PYTHONUNBUFFERED 1
ENV STATIC_DIRECTORY /app/static

CMD ["python", "main.py"]
