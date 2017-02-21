import React from 'react';

export default class StudentSearch extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			studentNo: this.props.val
		}
		this.handleChange = this.handleChange.bind(this);
		this.searchHandel = this.searchHandel.bind(this);
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	searchHandel(e) {
		e.preventDefault();
		this.props.searchHandel(this.state.studentNo)
	}
	render() {
		return (
			<div className="search">
				<form onSubmit={this.searchHandel}>
					学号<input type="text" 
					id="studentNo"
					ref="studentNo"
					value={this.state.studentNo} 
					onChange ={this.handleChange.bind(this,'studentNo')}
					placeholder="输入学号"/>
					<button className="span3" type="submit">查询</button>
				</form>
			</div>
		);
	}
}