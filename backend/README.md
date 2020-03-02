# Backend

## Development

Create a [`venv`](https://docs.python.org/3/library/venv.html) with `python -m venv venv`, and enter it with `source venv/bin/activate`

Install packages with `pip install -r req.txt`

Run the backend with `python main.py`

Test it out with `curl localhost:5000`

## Docker

Build the docker image with `docker build -t mol .`

Run with `docker run --rm -p 5000:5000 mol`
