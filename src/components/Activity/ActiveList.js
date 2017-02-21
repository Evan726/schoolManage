import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
class ActiveListTr extends React.Component {

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
			jsonData
		} = this.props;

		var memberType = ""
		if (jsonData.memberType == 0) {
			memberType = "本俱乐部"
		} else if (jsonData.memberType == 1) {
			memberType = "学生"
		} else if (jsonData.memberType == 2) {
			memberType = "公开"
		}

		var activityType = ""
		if (jsonData.activityType == 0) {
			activityType = "跑步"
		} else if (jsonData.activityType == 1) {
			activityType = "其他活动"
		}
		var status = "报名中";
		if (jsonData.startDate < jsonData.newDate && jsonData.endDate > jsonData.newDate) {
			status = "进行中"
		} else if (jsonData.endDate < jsonData.newDate) {
			status = "已结束"
		}
		var startDate = "";
		if (jsonData.startDate == undefined) {
			startDate = "";
		} else {
			startDate = formatDate(new Date(jsonData.startDate));
			//startDate = formatDate(new Date(""));
		}
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
			      <td>{this.props.index}</td>
			      <td><Link to={"activity/details/"+jsonData.id} className="listcolor">{jsonData.title}</Link></td>
			      <td>{status}</td>
				  <td><Link to={"activity/member/"+jsonData.id} className="listcolor">{jsonData.enrollCount}</Link></td>
			      <td>{jsonData.signCount||0}</td>
			      <td>{startDate}</td>
			      <td>{memberType}</td>
			      <td>{activityType}</td>
			      <td>{jsonData.clubName}</td>
			      <td>{jsonData.publisher}</td>
			      <td>
						{
							jsonData.endDate < jsonData.newDate && <button onClick = {()=>this.props.delActivity(jsonData.id)} className="remove">删除</button>
						}
			      </td>
			</tr>
		);
	}
}

export default class ActiveList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			indexPage: 0
		};
	}
	componentWillMount() {
		const {
			pageCount,
			dataList
		} = this.props;
		if (pageCount == 1) {
			this.setState({
				indexPage: dataList.length || 0
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.dataList.length > 20) {
			this.setState({
				indexPage: nextProps.dataList.length
			});
		}
	}
	render() {
		var row = [];
		const {
			pageCount,
			dataList
		} = this.props;
		for (var i = 0; i < dataList.length; i++) {
			var index = i + 1;
			if (pageCount > 2) {
				index = i + 1 + (this.state.indexPage || 20) + (pageCount - 1) * 20;
			} else if (pageCount > 1) {
				index = i + 1 + (this.state.indexPage || 20);
			}
			row.push(<ActiveListTr bg = {i%2?"trBg":""} pageCount={this.props.pageCount} jsonData={dataList[i]} index={index} delActivity={this.props.delActivity} key={i} />)
		}
		return (
			<tbody>
				{row}
			</tbody>
		)
	}
}