# MOL3022
A tool for predicting secondary structure of a protein

## Building

This project can be deployed as a docker image that serves both the frontend and the api.

Build the docker image with `docker build -t mol .`, this will build both the frontend and backend.

Run with `docker run --rm -p 5000:5000 mol`
