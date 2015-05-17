#!/usr/bin/python
"""
Merge all of the Johnson solid polyhedron data into one consumable JSON file.
"""
import json

johnson_solids = []
for i in xrange(1, 93):
  with open('johnson-json/j' + str(i) + '.json', 'r') as f:
    johnson_solids.append(json.load(f))
    

print json.dumps(johnson_solids)
