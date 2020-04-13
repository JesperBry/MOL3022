import itertools
from difflib import Differ, SequenceMatcher

import biotite
import biotite.application.dssp as dssp
import biotite.database.rcsb as rcsb
import biotite.structure as struc
import biotite.structure.io.mmtf as mmtf
import numpy as np

sec_struct_codes = {0: "I", 1: "S", 2: "H", 3: "E", 4: "G", 5: "B", 6: "T", 7: "C"}

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


def diff(a, b):
    remap = {
        "a": "H",
        "b": "E",
        "c": "-",
    }
    d = []
    matches = 0
    last_matches = True
    for i in range(min(len(a), len(b))):
        if a[i] != b[i]:
            if not last_matches:
                d.append("...")
            d.append(f"#{i} {remap[a[i]]} != {remap[b[i]]}")
            last_matches = True
        else:
            matches += 1
            last_matches = False

    m = max(len(a), len(b))
    return {"diff": "\n".join(d), "percent": m and matches / m}


def diff_all(**kwargs):
    keys = kwargs.keys()
    diffs = {}
    for (a, b) in itertools.permutations(keys, 2):
        if a == b:
            continue
        d = diffs.get(a, {})
        d[b] = diff(kwargs[a], kwargs[b])
        diffs[a] = d
    return diffs


def mmtf_sec(file):
    array = mmtf.get_structure(file, model=1)
    tk_dimer = array[struc.filter_amino_acids(array)]
    tk_mono = tk_dimer[tk_dimer.chain_id == "A"]

    chain_id_per_res = array.chain_id[struc.get_residue_starts(tk_dimer)]
    sse = file["secStructList"]
    sse = sse[sse != -1]
    sse = sse[: len(chain_id_per_res)][chain_id_per_res == "A"]
    sse = np.array([sec_struct_codes[code] for code in sse if code != -1], dtype="U1")
    sse = np.array([dssp_to_abc[e] for e in sse], dtype="U1")

    return sse


def dssp_sec(file):
    array = mmtf.get_structure(file, model=1)
    tk_dimer = array[struc.filter_amino_acids(array)]
    tk_mono = tk_dimer[tk_dimer.chain_id == "A"]

    sse = dssp.DsspApp.annotate_sse(tk_mono)
    sse = np.array([dssp_to_abc[e] for e in sse], dtype="U1")
    return sse


def psea_sec(file):
    array = mmtf.get_structure(file, model=1)
    tk_dimer = array[struc.filter_amino_acids(array)]
    tk_mono = tk_dimer[tk_dimer.chain_id == "A"]

    sse = struc.annotate_sse(array, chain_id="A")
    return sse
