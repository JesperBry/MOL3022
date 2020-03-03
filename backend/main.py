import biotite
import biotite.application.dssp as dssp
import biotite.database.rcsb as rcsb
import biotite.structure as struc
import biotite.structure.io.mmtf as mmtf
import numpy as np
from flask import Flask, jsonify, request
from gevent.pywsgi import WSGIServer

dssp_to_abc = {
    "I": "c",
    "S": "c",
    "H": "a",
    "E": "b",
    "G": "c",
    "B": "b",
    "T": "c",
    "C": "c",
}

app = Flask(__name__)


@app.route("/")
def main_route():
    pdb_id = request.args.get("pdb_id", "1Q2W")
    file_format = request.args.get("format", "mmtf")
    file_name = rcsb.fetch(pdb_id, file_format, biotite.temp_dir())
    mmtf_file = mmtf.MMTFFile()
    mmtf_file.read(file_name)
    array = mmtf.get_structure(mmtf_file, model=1)
    tk_dimer = array[struc.filter_amino_acids(array)]
    tk_mono = tk_dimer[tk_dimer.chain_id == "A"]

    sse = dssp.DsspApp.annotate_sse(tk_mono)
    sse = np.array([dssp_to_abc[e] for e in sse], dtype="U1")
    return jsonify(secondary_structure=sse.tolist())


@app.after_request
def add_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    return response


if __name__ == "__main__":
    http_server = WSGIServer(("", 5000), app)
    http_server.serve_forever()
