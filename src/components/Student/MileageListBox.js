import React from 'react';
import {
	formatDate
} from '../../libs/formatDate';
class MileageListTr extends React.Component {
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
			jsonData,
		} = this.props;
		var startDate = "";
		if (jsonData.startDate == undefined) {
			startDate = "";
		} else {
			startDate = formatDate(new Date(jsonData.startDate))
		}

		//保留小数点后两位

		jsonData.kilometerCount = Math.round(jsonData.kilometerCount * 100) / 100;
		jsonData.equallyPace = Math.round(jsonData.equallyPace * 100) / 100;


		//里程时间转换
		var time = "";
		var hour = "";
		var minute = "";
		var second = "";

		hour = parseInt(jsonData.durationCount / 3600);
		if (hour < 10) {
			hour = "0" + hour;
		}
		time = jsonData.durationCount % 3600;
		minute = parseInt(time / 60);
		if (minute < 10) {
			minute = "0" + minute;
		}
		time = time % 60;
		second = parseInt(time);
		if (second < 10) {
			second = "0" + second;
		}
		time = hour + ':' + minute + ':' + second;
		//里程时间转换结束

		// var arr = []
		// arr.length = 
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
		      <td>{this.props.index}</td>
		      <td>{startDate}</td>
		      <td>{jsonData.kilometerCount}</td>
		      <td>{time}</td>
		      <td>{jsonData.equallySpeed}</td>
		    </tr>
		);
	}
}
class MileageList extends React.Component {
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
			row.push(<MileageListTr index={i+1} jsonData={itemArr[i]} key={i}/>)
		}
		return (
			<tbody >
				{row}
			</tbody>
		);
	}
}
export default class MileageListBox extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			pageCount,
			total,
			dataList,
		} = this.props;
		return (
			<div>
				<table>
					<thead>
						<tr className="table_first">
							<th>序号</th>
							<th>开始时间</th>
							<th>里程(km)</th>
							<th>时长</th>
							<th>平均配速(min.km)</th>
						</tr>
					</thead>
					{dataList.length>0 && <MileageList dataList={dataList}/>}
				</table>
			</div>
		);
	}
}