import React from 'react';
import {
	formatDate
} from '../../libs/formatDate';
class ActivityListTr extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.MouseOut = this.MouseOut.bind(this);
	}
	handleMouseOver() {
		this.setState({
			active: true
		})
	}
	MouseOut() {
		this.setState({
			active: false
		})
	}
	render() {

		const {
			dataJson
		} = this.props;
		var signTime = "";
		if (dataJson.signTime == undefined) {
			signTime = "";
		} else {
			signTime = formatDate(new Date(dataJson.signTime))
		}
		var Effective = "否";
		if (dataJson.isEffective == "1") {
			Effective = "是"
		}

		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
		      <td>{this.props.index}</td>
		      <td>{dataJson.activityId.title||""}</td>
		      <td>{signTime}</td>
		      <td>{dataJson.signAddress||""}</td>
		      <td>{Effective}</td>
		    </tr>
		);
	}
}
class ActivityList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		var rows = [];
		var arrItem = this.props.dataList;
		for (var i = 0; i < arrItem.length; i++) {
			rows.push(<ActivityListTr index={i+1} dataJson = {arrItem[i]} key={i}/>)
		}
		return (
			<tbody>
				{rows}
		    </tbody>
		);
	}
}
export default class ActivityListBox extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<table>
					<thead>
						<tr className="table_first">
					      <th>序号</th>
					      <th>活动主题</th>
					      <th>打卡时间</th>
					      <th>打卡地址</th>
					      <th>是否完成</th>
					    </tr>
					</thead>
					<ActivityList dataList={this.props.dataList}/>
				</table>
			</div>
		);
	}
}