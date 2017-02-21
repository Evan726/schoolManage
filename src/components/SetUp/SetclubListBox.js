import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
import Pages from "./../Common/Pages.js";
class SetclubListTr extends React.Component {
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
			delClub,
			editClub
		} = this.props;

		var createTime = "";
		if (jsonData.createTime == undefined) {
			createTime = ""
		} else {
			createTime = formatDate(new Date(jsonData.createTime))
		}

		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
		      <td>{this.props.index}</td>
		      <td>{jsonData.clubNo}</td>
		      <td>{jsonData.name}</td>
		      <td>{jsonData.nickName}</td>
				<td>{createTime}</td>
		      <td className="remove">
				<span><button onClick = {()=>editClub(jsonData.id)}>编辑</button></span>
				<span><button onClick = {()=>delClub(jsonData.id)}>删除</button></span>
		      </td>
		    </tr>
		);
	}
};
class SetclubList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

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

		const {
			dataList,
			delClub,
			editClub,
			pageCount
		} = this.props;
		var row = [];
		var itemArr = dataList;
		for (var i = 0; i < itemArr.length; i++) {
			var index = i + 1;
			if (pageCount > 2) {
				index = i + 1 + (this.state.indexPage || 20) + (pageCount - 1) * 20;
			} else if (pageCount > 1) {
				index = i + 1 + (this.state.indexPage || 20);
			}
			row.push(<SetclubListTr editClub={editClub} index={index} delClub={delClub} jsonData={itemArr[i]} key={i}/>)
		}
		return (
			<tbody>
				{row}
			</tbody>
		);
	}
}
export default class SetclubListBox extends React.Component {
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
			editClub,
			delClub
		} = this.props;
		return (
			<div>
				<table>
					<thead>
						<tr className="table_first">
							<th>序号</th>
							<th>编号</th>
							<th>名称</th>
							<th>负责人</th>
							<th>创建时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<SetclubList dataList={dataList} pageCount={pageCount} editClub={editClub} delClub={delClub}/>
				</table>
				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
			</div>
		);
	}
}