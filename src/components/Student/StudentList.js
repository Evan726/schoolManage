import React from 'react';
import {
	Link
} from "react-router";

class StudentListTr extends React.Component {
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
			jsonData
		} = this.props;
		//保留小数点后两位
		jsonData.semesterKilometerCount = Math.round(jsonData.semesterKilometerCount * 100) / 100;
		jsonData.semesterAchievement = Math.round(jsonData.semesterAchievement * 100) / 100;
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
				<td width="150">{this.props.index}</td>
				<td><Link to={"student/studentinfo/"+jsonData.studentId} className="listcolor">{jsonData.studentNo}</Link></td>
				<td>{jsonData.nickName}</td>
				<td>{jsonData.clubName}</td>
				<td><Link to={"student/mileage/"+jsonData.studentId} className="listcolor">{jsonData.semesterKilometerCount}</Link></td>
				<td><Link to={"student/activity/"+jsonData.studentId} className="listcolor">{jsonData.semesterCount}</Link></td>
				<td>{jsonData.semesterAchievement}</td>
		    </tr>
		);
	}
}

export default class StudentList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		var row = [];
		var itemArr = this.props.dataList;
		for (var i = 0; i < itemArr.length; i++) {
			row.push(<StudentListTr jsonData={itemArr[i]} index={i+1} key={i}/>)
		}
		return (
			<tbody>
				{row}
			</tbody>
		);
	}
}