import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';

class ActivePeopListTr extends React.Component {
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
			signTime = formatDate(new Date(dataJson.signTime));
		}

		var enrollTime = "";
		if (dataJson.enrollTime == undefined) {
			enrollTime = "";
		} else {
			enrollTime = formatDate(new Date(dataJson.enrollTime));
		}

		//保留小数点后两位
		dataJson.kilometer = Math.round(dataJson.kilometer * 100) / 100;
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
		      <td>{this.props.index}</td>
		      <td>{dataJson.memberId.studentNo}</td>
		      <td>{dataJson.memberId.nickName}</td>
			  <td>{dataJson.kilometer||0}</td>
		      <td>{signTime}</td>
		      <td>{dataJson.signAddress||""}</td>
		      <td>{enrollTime}</td>
		    </tr>
		);
	}
}

export default class ActivePeopList extends React.Component {
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
			rows.push(<ActivePeopListTr index={i+1} dataJson = {arrItem[i]} key={i}/>)
		}
		return (
			<tbody>
				{rows}
		    </tbody>
		);
	}
}