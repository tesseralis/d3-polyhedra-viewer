var update = React.addons.update;

var GroupOption = React.createClass({
  render: function() {
    return (
      <label className="checkbox-inline">
        <input type="checkbox" value={this.props.value}/>
        {this.props.value}
      </label>
    );
  }
});

var GroupFilter = React.createClass({
  render: function() {
    var elements = [];
    this.props.options.forEach(function(option) {
      elements.push(<GroupOption key={option} value={option} />);
    });
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div>{elements}</div>
      </div>
    );
  }
});

var FilterBar = React.createClass({
  render: function() {
    return (
      <form>
        <GroupFilter title="Type" options={['platonic', 'archimedean', 'johnson', 'prism', 'antiprism']} />
        <GroupFilter title="Faces" options={[3, 4, 5, 6, 8, 10]} />
      </form>
    );
  }
});

var PolyhedronRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.polyhedron.name}</td>
        <td>{this.props.polyhedron.type}</td>
        <td>{this.props.polyhedron.vertices}</td>
        <td>{this.props.polyhedron.edges}</td>
        <td>{_.sum(_.values(this.props.polyhedron.faces))}</td>
      </tr>
    );
  }
});

var PolyhedronTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.polyhedra.forEach(function(polyhedron) {
      rows.push(<PolyhedronRow key={polyhedron.name} polyhedron={polyhedron} />);
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Vertices</th>
            <th>Edges</th>
            <th>Faces</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var FilterablePolyhedronTable = React.createClass({
  getInitialState: function() {
    return {
      polyhedra: [],
      filters: {
        type: [],
        faces: []
      }
    };
  },
  componentDidMount: function() {
    // TODO coordinate these functions...
    $.ajax({
      url: "/data/platonic.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState(update(this.state, {polyhedra: {$push: data.polyhedra}}));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: "/data/archimedean.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState(update(this.state, {polyhedra: {$push: data.polyhedra}}));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container-fluid">
        <FilterBar />
        <PolyhedronTable polyhedra={this.state.polyhedra}/>
      </div>
    );
  }
});

React.render(<FilterablePolyhedronTable/>, document.getElementById('example'));

