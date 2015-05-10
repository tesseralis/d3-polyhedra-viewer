import csv
import json

with open('archimedean.csv', 'r') as csvfile:
  reader = csv.reader(csvfile, delimiter=',')
  polyhedra = []
  for row in reader:
    f  = {}
    name, f[3], f[4], f[5], f[6], f[8], f[10], e, v = row
    entry = {
      "name": name,
      "type": "archimedean",
      "vertices": int(v),
      "edges": int(e),
      "faces": {n: int(f[n]) for n in f if int(f[n]) > 0}
    }
    if "snub" in name:
      entry["chiral"] = True
    polyhedra.append(entry)
  data = {"polyhedra": polyhedra}
  print(json.dumps(data, indent=2, sort_keys=True))
