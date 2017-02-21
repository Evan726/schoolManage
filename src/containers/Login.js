import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect
} from "react-redux";

import {
	fetchLoginUser
} from "../actions/index.js";
var logo1 = require('../static/images/login_logo.png');
var password = require('../static/images/password.png');
var id = require('../static/images/id.png');
var radio = require('../static/images/radio.png');
var login_ico_01 = require('../static/images/login_ico_01.png');
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isRemember: false,
			usernameinfo: "",
			passwordinfo: ""
		};
		this.formData = this.formData.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	componentWillMount() {
		const {
			status
		} = this.props;
		if (status) {
			window.location.href = "/index"
			return false
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.status) {
			window.location.href = "/index"
			return false
		}
		if (nextProps.msg == '无此用户!' && this.state.password) {
			$(".noThisUser").css("display","block")
		}else{
			$(".noThisUser").css("display","none")
		} 
		// else if (nextProps.msg && nextProps.msg != '无此用户!') {
		// 	alert("网络异常")
		// }
	}
	formData() { 
		// else if (!this.state.username) {
		// 	alert("不能为空")
		// 	return false
		// } else if (!this.state.password) {
		// 	alert("密码不能为空")
		// 	return false
		// } else {
		// 	return true
		// }
		if(!this.state.username){
			$(".noUsername").css("display","block");
		}else{
			$(".noUsername").css("display","none");
		}
		if(!this.state.password){
			$(".noPassword").css("display","block");
		}else{
			$(".noPassword").css("display","none");
		}
		return true;
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}

	submitHandler(e) {
		e.preventDefault();
		const {
			dispatch
		} = this.props
		if (this.formData()) {
			var _this = this
			require.ensure([], () => {
				const md5 = require('../libs/md5.js');
				var submitObj = {
					username: _this.state.username.toUpperCase(),
					password: md5(_this.state.password).toUpperCase(),
				}
				dispatch(fetchLoginUser(submitObj))
			});
		}
	}
	render() {
		const {
			isfacth
		} = this.props
		return (
			<div className="login_box">
				<div className="login_container">
					<div className="login_form">
						<form onSubmit ={this.submitHandler}>
							<h3 className="login_title">
								<img src={logo1} />
							</h3>
							<p className="noUsername">请输入您的用户名</p>
							<p className="noThisUser">您输入的用户名或者密码错误</p>
							<div className="login_user">
								<input type="username"
										className="input_text"
										id="username"
										ref="username"
										value={this.state.username}
										onChange ={this.handleChange.bind(this,'username')}
										placeholder="输入用户名" maxLength="16" />
								<span className="error">{this.state.usernameinfo}</span>	
								<img className="login_id" src={id} />
								<img className="login_icon" src={login_ico_01} />
							</div>
							<p className="noPassword">请输入您的密码</p>
							<div className="login_user">
								<input type="password" 
									className="input_text" 
									id="password"
									ref="password" 
									value={this.state.password}
									onChange ={this.handleChange.bind(this,'password')}
									placeholder="输入密码" maxLength="16" />
								<span className="error">{this.state.passwordinfo}</span>
								<img className="login_id" src={password} />
								<img className="login_icon" src={login_ico_01} />
							</div>
							<div className="login_button">
								<button
									type="submit"
									disabled={!isfacth ? '' : 'disabled'}>登录</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Login.PropTypes = {
	status: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	const {
		user,
		error,
		status,
		isfacth,
		msg
	} = state.userState
	return {
		user,
		error,
		status,
		msg,
		isfacth
	}
};
export default connect(
	mapStateToProps
)(Login)