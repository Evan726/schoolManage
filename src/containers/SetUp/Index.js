import React from 'react';
import {
	connect
} from "react-redux";
import {
	Link
} from "react-router";
import UserListBox from '../../components/SetUp/UserListBox.js';
import Tab from '../../components/SetUp/Tab';
import {
	fetchPageActive
} from "../../actions/index";
import {
	fetchAdminList,
	fetchResetPass
} from "../../actions/setup";
import {
	fetchDelAdmin
} from "../../actions/del";
import Loading from '../../components/Common/loading.js';

class Index extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.delAdmin = this.delAdmin.bind(this);
		this.resetPass = this.resetPass.bind(this);
		this.editAdmin = this.editAdmin.bind(this);
		this.editPassword = this.editPassword.bind(this);
		this.state = {
			group: null
		}
	}

	componentWillMount() {
		this.setState({
			group: Number(sessionStorage.getItem("group"))
		})
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "adminList"))
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.resetOk !== nextProps.resetOk && nextProps.resetOk) {
			alert("密码重置成功")
		}
		if (nextProps.pageActive !== this.props.pageActive) {
			var json = {
				pageCount: nextProps.pageActive
			}
			this.props.dispatch(fetchAdminList(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "adminList"))
	}

	delAdmin(adminId) {
		var json = {
			"adminId": adminId
		}
		var r = confirm("确认要删除吗")
		if (r == true) {
			this.props.dispatch(fetchDelAdmin(json, this.props.pageActive))
		}
	}

	resetPass(adminId) {
		var json = {
			"userId": adminId
		}
		var r = confirm("确认要重置吗")
		if (r == true) {
			this.props.dispatch(fetchResetPass(json))
		}
	}

	editAdmin(adminId) {
		this.context.router.push('/setup/edituseradmin/' + adminId)
	}
	editPassword(adminId) {
		this.context.router.push('/setup/editpassword/' + adminId)
	}
	render() {
		if (this.props.children) {
			return (
				<div>
					{this.props.children}
				</div>
			)
		}
		const {
			pageActive,
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;
		return (
			<div className="student_center">
				<Tab active={1}/>
				<div className="info_list">
					{
						this.state.group === 1 && 
						<div className="setperson_title">
							<div>
								<Link to={"setup/adduseradmin"}><span>添加</span></Link>
							</div>
						</div>
					}
					
					{dataList.length>0&&<UserListBox
				    	dataList = {dataList} 	
						pageCount = {pageCount} 
						pageClick = {this.pageClick}
						delAdmin={this.delAdmin}
						resetPass={this.resetPass}
						editAdmin={this.editAdmin}
						editPassword={this.editPassword}
						total = {total} location = {"setup"}/>}
					
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const pageActive = state.pageActive.adminList;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listAdmin.admin || {
		isFetching: false,
		pageCount: 1,
		total: 0,
		lists: {},
		ids: {}
	};
	var dataList = [];

	var page = 1;
	if (pageActive) {
		page = pageActive
	}
	var arr = ids[page]

	if (!!arr) {
		dataList = arr.map(id => lists[id])
	}

	const {
		isFetch,
		resetOk
	} = state.resetPass;

	return {
		pageActive,
		isFetching,
		pageCount,
		total,
		resetOk,
		dataList
	}
};
export default connect(mapStateToProps)(Index);