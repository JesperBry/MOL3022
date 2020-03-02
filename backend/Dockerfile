FROM python:3.7-slim-buster

WORKDIR /app

RUN apt-get update && apt-get install -y dssp

COPY req.txt .

RUN pip install -r req.txt

COPY . .

ENV PYTHONUNBUFFERED 1

CMD ["python", "main.py"]
