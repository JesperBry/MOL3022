import os

import biotite
import biotite.application.dssp as dssp
import biotite.database.rcsb as rcsb
import biotite.structure as struc
import biotite.structure.io.mmtf as mmtf
import numpy as np
import requests
from flask import Flask, jsonify, request
from gevent.pywsgi import WSGIServer

from sse import dssp_sec, mmtf_sec, psea_sec

static_file_directory = os.environ.get("STATIC_DIRECTORY", "../client/build/")

app = Flask(__name__, static_folder=static_file_directory, static_url_path="")


@app.route("/")
def index_route():
    return app.send_static_file("index.html")


@app.route("/api")
def api_route():
    pdb_id = request.args.get("pdb_id", "1Q2W")
    file_format = request.args.get("format", "mmtf")
    file_name = rcsb.fetch(pdb_id, file_format, biotite.temp_dir())
    mmtf_file = mmtf.MMTFFile()
    mmtf_file.read(file_name)

    try:
        mmtf_s = mmtf_sec(mmtf_file)
    except:
        mmtf_s = []
    try:
        dssp_s = dssp_sec(mmtf_file)
    except:
        dssp_s = []
    try:
        psea_s = psea_sec(mmtf_file)
    except:
        dssp_s = []

    return jsonify(mmtf=mmtf_s.tolist(), dssp=dssp_s.tolist(), psea=psea_s.tolist())


@app.route("/search")
def search_route():
    keywords = request.args.get("keywords", "")
    if keywords == "":
        return jsonify(results=[])
    data = f"<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><keywords>{keywords}</keywords></orgPdbQuery>"
    r = requests.post(
        "https://www.rcsb.org/pdb/rest/search",
        data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    if not r.ok:
        return jsonify(error=r.text), 400
    return jsonify(results=r.text.splitlines())


@app.after_request
def add_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    return response


if __name__ == "__main__":
    http_server = WSGIServer(("", 5000), app)
    http_server.serve_forever()
