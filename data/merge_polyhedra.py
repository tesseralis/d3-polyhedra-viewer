#!/usr/bin/python
"""
Merge all of the Johnson solid polyhedron data into one consumable JSON file.
"""
import json

def merge_group(group_name):
  result = []
  with open('metadata/{0}.txt'.format(group_name)) as f:
    names = [l.strip('\n') for l in f.readlines()]
  for name in names:
    with open('polyhedra/{0}/{1}.json'.format(group_name, name.replace(' ', '_')), 'r') as f:
      result.append(json.load(f))
  return result

def merge_groups(*group_names):
  return [{"group_name": group_name, "polyhedra": merge_group(group_name)} for group_name in group_names]

if __name__ == "__main__":
  print json.dumps({"groups": merge_groups('platonic', 'archimedean', 'prisms', 'antiprisms', 'johnson')})
