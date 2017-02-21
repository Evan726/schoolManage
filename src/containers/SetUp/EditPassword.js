import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import {
	editPassword
} from "../../actions/index";

import Tab from '../../components/SetUp/Tab';
class AddUserAdmin extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			"oldPassword": "",
			"newPassword": ""
		}
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentWillMount() {
		if (this.props.params.id) {
			//
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.msg !== this.props.msg) {
			if (nextProps.msg == "修改成功") {
				alert("修改成功,请重新登录");
				window.location.href = "/"
			} else {
				alert("修改失败")
			}
		}
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	submitHandler(e) {
		e.preventDefault();
		if (!this.state.oldPassword) {
			alert("原始密码不能为空");
			return false
		} else if (!this.state.newPassword) {
			alert("新密码不能为空");
			return false
		} else if (this.state.newPassword != this.state.newPassword1) {
			alert("两次密码不同")
			return false
		}
		this.props.dispatch(editPassword(this.state))
	}
	render() {
		return (
			<div className="student_center">
				<Tab active={1}/>
				<div className="onestudent_list">
					<div className="setperson_title">
						<div>
							<Link to={"/setup"}><span>取消</span></Link>
						</div>
					</div>
					<div className="user_list">
					<form onSubmit ={this.submitHandler}>
						<table>
							<colgroup>
								<col width = "180" />
								<col width = "＊"/>
							</colgroup>
							<tbody>
							    <tr>
							      <td className="onestudent_table1">原密码</td>
							      <td className="onestudent_table2">
							      	<input type="password" 
							      		id="oldPassword"
										ref="oldPassword"
										value={this.state.oldPassword}
										onChange ={this.handleChange.bind(this,'oldPassword')}
										placeholder="请输入原始密码"/>
							      </td>
							    </tr>
							    <tr>
							      <td className="onestudent_table1">新密码</td>
							      <td className="onestudent_table2">
									<input type="password" 
										id="newPassword"
										ref="newPassword"
										value={this.state.newPassword}
										onChange ={this.handleChange.bind(this,'newPassword')}
										placeholder="请输入新密码"/>
							      </td>
							    </tr>
							    <tr>
							      <td className="onestudent_table1">确认密码</td>
							      <td className="onestudent_table2">
							      	<input type="password" 
							      		id="newPassword1"
										ref="newPassword1"
										value={this.state.newPassword1}
										onChange ={this.handleChange.bind(this,'newPassword1')}
										placeholder="请再次输入新密码"/>
							      </td>
							    </tr>
						    </tbody>
						    <tfoot>
						    	<tr>
						    		<td colSpan="2" className="add_button">
						    			<button type="submit">发布</button>
						    		</td>
						    	</tr>
						    </tfoot>
						</table>	
					</form>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {

	const {
		isfacth,
		msg
	} = state.editPassword || {
		isfacth: false,
		msg: "",
	};
	return {
		isfacth,
		msg
	}
}

export default connect(mapStateToProps)(AddUserAdmin)