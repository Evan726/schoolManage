import React from 'react';
import {
	Link
} from "react-router";
import Pages from "./../Common/Pages.js";
class UserListTr extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false,
			group: null
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.MouseOut = this.MouseOut.bind(this);
	}
	componentWillMount() {
		this.setState({
			group: Number(sessionStorage.getItem("group"))
		})
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
			delAdmin,
			resetPass,
			editAdmin,
			editPassword
		} = this.props;
		return (
			<tr className={this.state.active?"trActive":this.props.bg} onMouseOver ={this.handleMouseOver} onMouseOut  ={this.MouseOut}>
		      <td>{this.props.index}</td>
		      <td>{jsonData.username}</td>
		      <td>{jsonData.nickName}</td>
		      <td>{jsonData.sex==1?"男":"女"}</td>
		      <td>{jsonData.mobile}</td>
		      <td>{jsonData.group==1?"超级管理员":"普通管理员"}</td>
		      <td className="remove">
		     	{this.state.group==1&&jsonData.group==1&&<span><button onClick = {()=>editPassword(jsonData.id)}>修改密码</button></span>}
		     	{this.state.group==1&&jsonData.group==2&&<span><button onClick = {()=>resetPass(jsonData.id)}>重置密码</button></span>}
				{this.state.group==2&&<span><button onClick = {()=>editPassword(jsonData.id)}>修改密码</button></span>}
		     	<span><button onClick = {()=>editAdmin(jsonData.id)}>编辑</button></span>
		     	{jsonData.group==2&&<span><button onClick = {()=>delAdmin(jsonData.id)}>删除</button></span>} 
		      </td>
		    </tr>
		);
	}
}

class UserList extends React.Component {
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
			delAdmin,
			resetPass,
			editAdmin,
			pageCount,
			editPassword
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
			row.push(<UserListTr delAdmin={delAdmin} index={index} editPassword = {editPassword} resetPass={resetPass} editAdmin={editAdmin} jsonData={itemArr[i]} key={i}/>)
		}
		return (
			<tbody>
				{row}
			</tbody>
		);
	}
}

export default class UserListBox extends React.Component {
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
			delAdmin,
			editAdmin,
			resetPass,
			editPassword
		} = this.props;
		return (
			<div className="user_list">
				<table>
					<colgroup>
						<col width = "50" />
						<col width = "100" />
						<col width = "120" />
						<col width = "70" />
						<col width = "80" />
						<col width = "120" />
						<col width = "120" />
						<col width = "140" />
					</colgroup>
					<thead>
					    <tr className="table_first">
					      <th>序号</th>
					      <th>账号</th>
					      <th>姓名</th>
					      <th>性别</th>
					      <th>手机</th>
					      <th>分组</th>
					      <th>操作</th>
					    </tr>
				    </thead>
				    <UserList dataList={dataList}  pageCount={pageCount} editPassword={editPassword} resetPass={resetPass} delAdmin={delAdmin} editAdmin={editAdmin}></UserList>	    
				</table>
				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
			</div>
		);
	}
}