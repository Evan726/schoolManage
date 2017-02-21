import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import {
	addAdmin
} from "../../actions/release";
import {
	getAdmin
} from "../../actions/setup";
import {
	editAdmin,
} from "../../actions/edit";

import Tab from '../../components/SetUp/Tab';
class AddUserAdmin extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			"username": "",
			"nickName": "",
			"sex": "1",
			"mobile": "",
			"group": 2,
		}
		this.submitHandler = this.submitHandler.bind(this)
	}
	componentWillMount() {
		if (this.props.params.id) {
			this.props.dispatch(getAdmin({
				"adminId": this.props.params.id
			}))
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.addOk !== nextProps.addOk) {
			this.context.router.push('/setup/1')
		};
		if (this.props.editok !== nextProps.editok) {
			this.context.router.push('/setup')
		};

		if (this.props.addError !== nextProps.addError) {
			alert(nextProps.addError);
			return false
		}
		if (this.props.content !== nextProps.content) {
			this.setState({
				"adminId": nextProps.content.id,
				"username": nextProps.content.username,
				"nickName": nextProps.content.nickName,
				"sex": nextProps.content.sex,
				"mobile": nextProps.content.mobile,
				"group": nextProps.content.group
			})
		}
	}
	handleChange(name, event) {
		if (this.state.adminId && name == "username") {
			return false;
		}
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	submitHandler(e) {
		e.preventDefault();
		var a,b,c,d,e,f;
		// var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");　
		var reg = /^\w+$/;　
		var hanzi = /^[\u4E00-\u9FA5]{2,10}$/;　
		var preg = /^1(3|4|5|7|8)\d{9}$/;
		var str = /^[A-Za-z]+$/;
		// if (!str.test(this.state.username.substr(0, 1))) {
		// 	alert('用户名格式不正确');
		// 	return false
		// }
		// if (!this.state.username) {
		// 	alert("用户名不能为空");
		// 	return false
		// } else if (reg.test(this.state.username)) {
		// 	alert("不能输入汉字！");
		// 	return false
		// } else if (!this.state.nickName) {
		// 	alert("真实姓名不能为空");
		// 	return false
		// } else if (!preg.test(this.state.mobile)) {
		// 	alert("手机号码格式不正确")
		// 	return false
		// }
		// this.state.username = this.state.username.toLowerCase()
		if(!this.state.username){
			$(".username").eq(0).css("display","inline-block");
			a = false;
		}else{
			$(".username").eq(0).css("display","none");
			a = true;
			if(!reg.test(this.state.username)){
				$(".username").eq(1).css("display","inline-block");
				$(".username").eq(2).css("display","none");
				c = false;
			}else{
				$(".username").eq(1).css("display","none");
				c = true;
				if(this.state.username.length < 4 || this.state.username.length > 16) {
					$(".username").eq(2).css("display","inline-block");
					$(".username").eq(1).css("display","none");
					b = false;
				}else{
					$(".username").eq(2).css("display","none");
					b = true;
				}
			}
		}
		if(!this.state.nickName){
			$(".nickName").eq(0).css("display","inline-block");
			d = false;
		}else{
			$(".nickName").eq(0).css("display","none");
			d = true;
			if(!hanzi.test(this.state.nickName)){
				$(".nickName").eq(1).css("display","inline-block");
				f = false;
			}else{
				$(".nickName").eq(1).css("display","none");
				f = true;
			}
		}
		if(this.state.mobile){
			if(!preg.test(this.state.mobile)){
				$(".mobile").css("display","inline-block");
				e = false;
			}else{
				$(".mobile").css("display","none");
				e = true;
			}
		}else{
			$(".mobile").css("display","none");
			e = true;
		}
		if(!(a&&b&&c&&d&&e&&f)){
			return false;
		}
		if (!this.state.adminId) {
			// this.state.username = this.state.username.toLowerCase()
			this.props.dispatch(addAdmin(this.state))
		} else {
			// this.state.username = this.state.username.toLowerCase()
			this.props.dispatch(editAdmin(this.state))
		}
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
							<table className="table">
								<colgroup>
									<col width = "180"/>
									<col width = "＊"/>
								</colgroup>
								<tbody>
							    <tr>
							      <td className="createactive_table1"><i>*</i>用户名</td>
							      <td>
									<input type="text"	
										id="username"
										ref="username"
										disabled={!!this.state.adminId}
										value={this.state.username}
										onChange ={this.handleChange.bind(this,'username')}
										placeholder="请输入用户名"/>
										<strong className="username">用户名不能为空</strong>
										<strong className="username">用户名由字母、数字、下划线组成</strong>
										<strong className="username">账号由6-16位字符组成</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>姓名</td>
							      <td>
									<input type="text"	
										id="nickName"
										ref="nickName"
										value={this.state.nickName}
										onChange ={this.handleChange.bind(this,'nickName')}
										placeholder="请输入姓名"/>
										<strong className="nickName">姓名不能为空</strong>
										<strong className="nickName">姓名为2到10位汉字组合</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>性别</td>
							      <td>
									<input type="radio"
											ref="sex"
											value="1"
											checked={this.state.sex==1}
											onChange = {this.handleChange.bind(this,'sex')}/>男
									<input type="radio"
											ref="sex"
											value="0"
											checked={this.state.sex==0}
											onChange = {this.handleChange.bind(this,'sex')}/>女
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1">手机</td>
							      <td>
									<input type="text"	
										id="mobile"
										ref="mobile"
										value={this.state.mobile}
										onChange ={this.handleChange.bind(this,'mobile')}
										placeholder="请输入手机"/>
										<strong className="mobile">手机号码格式不正确</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>用户组</td>
							      <td>
									<select 
										ref="group"
										value={this.state.group} 
										onChange = {this.handleChange.bind(this,'group')}>
									    	<option value="2">普通管理员</option>
									</select>
							      </td>
							    </tr>
							    </tbody>
							    <tfoot>
							    	<tr>
							    		<td colSpan="2" className="add_button">
							    			<button type="submit">确定</button>
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
		content
	} = state.getAdminInfo;
	const {
		isFetching,
		addOk,
		editok,
		addError
	} = state.listpage.listAdmin.admin || {
		isFetching: false,
		addOk: false,
		editok: false,
		addError: "",
	};
	return {
		isFetching,
		addOk,
		editok,
		content,
		addError
	}
}

export default connect(mapStateToProps)(AddUserAdmin)