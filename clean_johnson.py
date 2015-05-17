import json

with open('data/johnson-metadata.json') as f:
  johnson_data = json.load(f)['polyhedra']

johnson_solids = []
for i in xrange(1, 93):
  with open('data/johnson-json/j' + str(i) + '.json', 'rw') as f:
    text = f.read()
    text = text.replace("'", '"') # whoops, I forgot to use the right quotes
    solid = json.loads(text)
    solid['name'] = johnson_data[i-1]['name']
    #print json.dumps(solid)
    johnson_solids.append(solid)

print json.dumps(johnson_solids, indent=2)
