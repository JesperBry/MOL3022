# MOL3022
A  web tool for predicting the secondary structure of a protein.

#### Project live hosting: [https://mol.jbakken.com/](https://mol.jbakken.com/) 


## Building with Docker

**Dependencies:**
- [Docker](https://www.docker.com/get-started)

This project can be deployed as a docker image that serves both the frontend and the api.

Build the docker image with `docker build -t mol .`, this will build both the frontend and backend.

Run with `docker run --rm -p 5000:5000 mol`

## Run without Docker

### Backend
**Dependencies:**
- Python 3
- Pip
- virtualenv

**Initial setup**
<br/>
The frontend has to be built first to be able to serve it as static files.
```
cd /backend
python -m venv venv
source venv/bin/activate
pip install -r req.txt
python main.py
```
Test it out with `curl localhost:5000/api`

### Frontend
**Dependencies:**
- node.js
- npm

**Initial setup**
```
cd /client
npm install
npm start
```
Available on http://localhost:3000/
