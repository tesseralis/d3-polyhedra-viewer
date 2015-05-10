import json

with open('johnson.raw.json', 'r') as rawfile:
  raw_johnsons = json.load(rawfile)

johnsons = []
for raw_johnson in raw_johnsons:
  johnson = {
    "name": raw_johnson["name"].lower(),
    "type": "johnson",
    "vertices": int(raw_johnson["vertices"]),
    "edges": int(raw_johnson["edges"]),
    "faces": {int(n): int(raw_johnson["faces"][n]) for n in raw_johnson["faces"] if raw_johnson["faces"][n]}
  }
  johnsons.append(johnson)

with open('johnson.json', 'w') as cleanfile:
  json.dump({"polyhedra": johnsons}, cleanfile, indent=2, sort_keys=True)
