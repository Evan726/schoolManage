import React from 'react';
import {
	Link
} from "react-router"
export default class ActivitySearch extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.searchHandel = this.searchHandel.bind(this);
		this.state = {}

	}
	componentWillMount() {
		if (this.props.val) {
			this.setState(JSON.parse(this.props.val))
		}
	}
	searchHandel(e) {
		e.preventDefault()
		this.props.searchHandel(this.state)
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
				活动<input type="text"	
						id="title"
						ref="title"
						value={this.state.title}
						onChange ={this.handleChange.bind(this,'title')}
						placeholder="请输入活动名称"/>
				状态<select 
						ref="status"
						value={this.state.status} 
						onChange = {this.handleChange.bind(this,'status')}>
						<option>全部</option>
						<option value="0">报名中</option>
						<option value="1">进行中</option>
						<option value="2">已结束</option>
					</select>
				类型<select 
						ref="activityType"
						value={this.state.activityType} 
						onChange = {this.handleChange.bind(this,'activityType')}>
						<option>全部</option>
						<option value="0">跑步</option>
						<option value="1">其他活动</option>
					</select>
				参与条件<select 
						ref="memberType"
						value={this.state.memberType} 
						onChange = {this.handleChange.bind(this,'memberType')}>
						<option>全部</option>
						<option value="0">本俱乐部</option>
						<option value="1">限学生</option>
						<option value="2">公开</option>
					</select>
				<button className="span3" type="submit">查询</button>
				<span className="span4"><Link to={"activity/addactivity"}>发布</Link></span>
				</form>
			</div>
		);
	}
}