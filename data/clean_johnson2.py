import json

johnson = []
for i in xrange(1, 93):
  with open('johnson-json/j' + str(i) + '.json', 'r') as f:
    text = f.read()
    text = text.replace("'", '"') # whoops, I forgot to use the right quotes
    johnson.append(json.loads(text))

print json.dumps(johnson, indent=2)
