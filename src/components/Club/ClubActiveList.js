import React from 'react';
import {
	formatDate
} from '../../libs/formatDate';
class ClubActiveListTr extends React.Component {
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
			dataJson,
			delActivity
		} = this.props;
		var memberType = ""
		if (dataJson.memberType == 0) {
			memberType = "学生"
		} else if (dataJson.memberType == 1) {
			memberType = "本俱乐部"
		} else if (dataJson.memberType == 2) {
			memberType = "公开"
		}

		var activityType = ""
		if (dataJson.activityType == 0) {
			activityType = "跑步"
		} else if (dataJson.activityType == 1) {
			activityType = "其他活动"
		}

		var startDate = "";
		if (dataJson.startDate == undefined) {
			startDate = "";
		} else {
			startDate = formatDate(new Date(dataJson.startDate))
		}


		var status = "报名中";
		if (dataJson.startDate < dataJson.newDate && dataJson.endDate > dataJson.newDate) {
			status = "进行中"
		} else if (dataJson.endDate < dataJson.newDate) {
			status = "已结束"
		}

		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
			      <td>{this.props.index}</td>
			      <td>{dataJson.title}</td>
			      <td>{status}</td>
			      <td>{dataJson.enrollCount}</td>
			      <td>{dataJson.signCount}</td>
			      <td>{startDate}</td>
			      <td>{dataJson.address}</td>
			      <td>{memberType}</td>
			      <td>{activityType}</td>
			      <td>{dataJson.publisher}</td>
			      <td>
						{
							dataJson.endDate < dataJson.newDate && <button onClick = {()=>delActivity(dataJson.id)} className="remove">删除</button>
						}
			      </td>
			    </tr>
		);
	}
}
export default class ClubActiveList extends React.Component {
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
			rows.push(<ClubActiveListTr delActivity={this.props.delActivity} index={i+1} dataJson = {arrItem[i]} key={i}/>)
		}
		return (
			<tbody>
				{rows}
		    </tbody>
		);
	}
}