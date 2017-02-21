import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';


class ClubListTr extends React.Component {
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

		var createTime = "";
		if (jsonData.createTime == undefined) {
			createTime = "";
		} else {
			createTime = formatDate(new Date(jsonData.createTime))
		}

		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
			      <td>{this.props.index}</td>
			      <td className="clubindex_id"><Link to={"club/clubInfo/"+jsonData.id} className="listcolor">{jsonData.clubNo}</Link></td>
			      <td>{jsonData.name}</td>
			      <td>{jsonData.adminName}</td>
			      <td>{createTime}</td>
			      <td><Link to={"club/activity/"+jsonData.id} className="listcolor">{jsonData.activityCount}</Link></td>
			      <td><Link to={"club/member/"+jsonData.id} className="listcolor">{jsonData.memberCount}</Link></td>
			</tr>
		);
	}
}

export default class ClubList extends React.Component {
	render() {
		var row = [];
		var itemArr = this.props.dataList;
		for (var i = 0; i < itemArr.length; i++) {
			row.push(<ClubListTr index={i+1} jsonData={itemArr[i]} key={i}/>)
		}
		return (
			<tbody>
				{row}
			</tbody>
		);
	}
}