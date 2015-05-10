/*
 * Thisis the query I used on the Chrome developer console in order to get the
 * relevant info on Johnson solids from the Wikpedia page:
 *
 * http://en.wikipedia.org/wiki/List_of_Johnson_solids
 *
 */
var list = $('.wikitable > tbody > tr');

var process = function(tr) {
  var tds = $(tr).find('td');
    return {name: $($(tds[1]).find('a')[0]).text(), vertices: $(tds[4]).text(), edges: $(tds[5]).text(), faces: {
          3: $(tds[7]).text(), 4: $(tds[8]).text(), 5: $(tds[9]).text(), 6: $(tds[10]).text(), 8: $(tds[11]).text(), 10: $(tds[12]).text()
    }};
}

solids = [];
for (var i = 0; i < 91; i++) {
    solids.push(process(list[i]));
}
JSON.stringify(solids);
