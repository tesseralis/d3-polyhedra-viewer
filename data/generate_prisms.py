import json

prisms_n = [3,5,6,8,10] # disregard cube
antiprisms_n = [4,5,6,8,10] # disregard octahedron

# Names to prepend to the shapes
names = {3: 'triangular', 4: 'square', 5: 'pentagonal', 
    6: 'hexagonal', 8: 'octagonal', 10: 'decagonal'}

def generate_prism(n):
  return {
      "name": names[n] + ' prism',
      "type": "prism",
      "vertices": 2*n,
      "edges": 3*n,
      "faces": {
        4: n,
        n: 2
      }
  }

def generate_antiprism(n):
  return {
      "name": names[n] + ' antiprism',
      "type": "antiprism",
      "vertices": 2*n,
      "edges": 4*n,
      "faces": {
        3: 2*n,
        n: 2
      }
  }

if __name__ == "__main__":
  prisms = [generate_prism(n) for n in prisms_n]
  with open('prism.json', 'w') as f:
    json.dump({'polyhedra': prisms}, f, indent=2, sort_keys=True)

  antiprisms = [generate_antiprism(n) for n in antiprisms_n]
  with open('antiprism.json', 'w') as f:
    json.dump({'polyhedra': antiprisms}, f, indent=2, sort_keys=True)
