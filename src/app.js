var update = React.addons.update;

var GroupOption = React.createClass({
  handleChange: function() {
    this.props.onUserInput(this.refs.isSelected.getDOMNode().checked);
  },
  render: function() {
    return (
      <label className="checkbox-inline">
        <input
          type="checkbox"
          onChange={this.handleChange}
          ref="isSelected"
          checked={this.props.checked}
          value={this.props.value}/>
        {this.props.value}
      </label>
    );
  }
});

var GroupFilter = React.createClass({
  handleUserInput: function(option) {
      return function(isChecked) {
        var newSelectedOptions;
        if (isChecked) {
          newSelectedOptions = this.props.selectedOptions.concat([option]);
        } else {
          newSelectedOptions = _.remove(this.props.selectedOptions, function(e) {
            return e !== option;
          });
        }
        this.props.onUserInput(newSelectedOptions);
      }.bind(this);
  },
  render: function() {
    var elements = [];
    this.props.options.forEach(function(option) {
      elements.push(
        <GroupOption 
          onUserInput={this.handleUserInput(option)}
          checked={_.includes(this.props.selectedOptions, option)}
          key={option}
          value={option}
        />);
    }.bind(this));
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div>{elements}</div>
      </div>
    );
  }
});

var RangeFilter = React.createClass({
  handleUserInput: function() {
    this.props.onUserInput({
      min: parseInt(this.refs.min.getDOMNode().value),
      max: parseInt(this.refs.max.getDOMNode().value)
    });
  },
  render: function() {
    return (
      <div className="form-group">
        <h4>{this.props.title}</h4>
        <div className="input-group">
          <span className="input-group-addon">min</span>
          <input 
            type="text" 
            ref="min"
            className="form-control" 
            onChange={this.handleUserInput}
            value={this.props.values.min}
          />
          <span className="input-group-addon">max</span>
          <input
            type="text"
            ref="max"
            className="form-control" 
            onChange={this.handleUserInput}
            value={this.props.values.max}
          />
        </div>
      </div>
    );
  }
});

var FilterBar = React.createClass({
  handleUserInput: function(filter) {
    return function(value) {
      updater = {};
      updater[filter] = {$set: value};
      this.props.onUserInput(update(this.props.filters, updater));
    }.bind(this);
  },
  render: function() {
    return (
      <div>
      <form>
        <GroupFilter
          title="Type" 
          onUserInput={this.handleUserInput("type")} 
          options={['platonic', 'archimedean', 'johnson', 'prism', 'antiprism']}
          selectedOptions={this.props.filters.type}
        />
        <GroupFilter 
          title="Faces" 
          onUserInput={this.handleUserInput("faces")} 
          options={[3, 4, 5, 6, 8, 10]}
          selectedOptions={this.props.filters.faces}
        />
        <RangeFilter
          title="Edges"
          onUserInput={this.handleUserInput("edges")}
          values={this.props.filters.edges}
        />
        <RangeFilter 
          title="Vertices"
          onUserInput={this.handleUserInput("vertices")}
          values={this.props.filters.vertices}
        />
      </form>
      </div>
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
    var isType = function(polyhedron) {
      type = this.props.filters.type;
      return _.isEmpty(type) || _.includes(type, polyhedron.type);
    }.bind(this);
    var hasFaces = function(polyhedron) {
      var hasFace = function(face) {
        return _.get(polyhedron.faces, face, 0) > 0;
      };
      return _.every(this.props.filters.faces, hasFace);
    }.bind(this);
    var inRange = function(number, range) {
      if (range.min && number < range.min) {
        return false;
      }
      if (range.max && number > range.max) {
        return false;
      }
      return true;
    }
    this.props.polyhedra.forEach(function(polyhedron) {
      if (isType(polyhedron) && hasFaces(polyhedron)
          && inRange(polyhedron.edges, this.props.filters.edges)
          && inRange(polyhedron.vertices, this.props.filters.vertices)) { 
        rows.push(<PolyhedronRow key={polyhedron.name} polyhedron={polyhedron} />);
      }
    }.bind(this));
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
        faces: [],
        edges: {min: 10},
        vertices: {min: 5, max: 20}
      }
    };
  },
  componentDidMount: function() {
    ["platonic", "archimedean", "johnson", "prism", "antiprism"].forEach(function(type) {
      $.ajax({
        url: "/data/" + type + ".json",
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState(update(this.state, {polyhedra: {$push: data.polyhedra}}));
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }.bind(this));
  },
  handleUserInput: function(filters) {
    this.setState(update(this.state, {filters: {$set: filters}}));
  },
  render: function() {
    return (
      <div className="container-fluid">
        <FilterBar
          onUserInput={this.handleUserInput}
          filters={this.state.filters}
        />
        <PolyhedronTable
          polyhedra={this.state.polyhedra}
          filters={this.state.filters}
        />
      </div>
    );
  }
});

React.render(<FilterablePolyhedronTable/>, document.getElementById('example'));

