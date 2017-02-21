import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
class ClubPeopleListTr extends React.Component {
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
			delClubMember
		} = this.props;

		var enrollTime = "";
		if (dataJson.enrollTime == undefined) {
			enrollTime = ""
		} else {
			enrollTime = formatDate(new Date(dataJson.enrollTime))
		}

		//保留小数点后两位
		dataJson.kilometerCount = Math.round(dataJson.kilometerCount * 100) / 100;
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
			      <td>{this.props.index}</td>
			      <td>{dataJson.studentNo}</td>
			      <td>{dataJson.nickName}</td>
			      <td>{dataJson.kilometerCount}</td>
			      <td>{dataJson.activityCount}</td>
			      <td>{enrollTime}</td>	
			      <td><button onClick = {()=>delClubMember(dataJson.id)}>移出俱乐部</button></td>
			    </tr>
		);
	}
}
export default class ClubPeopleList extends React.Component {
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
			rows.push(<ClubPeopleListTr delClubMember={this.props.delClubMember} index={i+1} dataJson = {arrItem[i]} key={i}/>)
		}
		return (
			<tbody>
				{rows}
		    </tbody>
		);
	}
}