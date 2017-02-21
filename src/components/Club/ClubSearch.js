import React from 'react';

export default class ClubSearch extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.searchHandel = this.searchHandel.bind(this);
		this.state = {
			queryName: this.props.val
		}
	}
	searchHandel(e) {
		e.preventDefault()
		this.props.searchHandel(this.state.queryName)
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	render() {
		return (
			<div className="search">
				<form onSubmit={this.searchHandel}>
				俱乐部<input type="text"	
						id="queryName"
						ref="queryName"
						value={this.state.queryName}
						onChange ={this.handleChange.bind(this,'queryName')}
						placeholder="俱乐部编号/名称"/>
				<button className="span3" type="submit">查询</button>
				</form>
			</div>
		);
	}
}