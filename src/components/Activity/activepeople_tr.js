var React = require('react');
var Route = require('react-router');
var Link = Route.Link;

var activepeople_tr = React.createClass({

	render: function() {
		return (
			<tr>
		      <td>1</td>
		      <td>20160101852963</td>
		      <td>张红</td>
		      <td>3</td>
		      <td>2016-01-10 10:30</td>
		      <td>10</td>
		      <td>欧亚操场</td>
		      <td>2016-01-10 10:30</td>
		    </tr>
		);
	}

});

module.exports = activepeople_tr;