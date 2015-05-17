import json

with open('johnson.json') as f:
  johnson_data = json.load(f)['polyhedra']

johnson_solids = []
for i in xrange(1, 93):
  with open('johnson-json/j' + str(i) + '.json', 'r') as f:
    text = f.read()
    text = text.replace("'", '"') # whoops, I forgot to use the right quotes
    solid = json.loads(text)
    solid['name'] = johnson_data[i-1]['name']
    johnson_solids.append(solid)

print json.dumps(johnson_solids, indent=2)
