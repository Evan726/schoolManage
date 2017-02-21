import React from 'react';
import {
	connect
} from "react-redux";
import {
	Link
} from "react-router";

import SetclubListBox from '../../components/SetUp/SetclubListBox.js';

import Tab from '../../components/SetUp/Tab';

import {
	fetchPageActive
} from "../../actions/index";
import {
	fetchClubList,
} from "../../actions/setup";
import {
	fetchDelClub
} from "../../actions/del";
import Loading from '../../components/Common/loading.js';


class SetClub extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.editClub = this.editClub.bind(this);
		this.delClub = this.delClub.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "clubList"))
	}

	componentWillReceiveProps(nextProps) {
		//console.log("nextProps.pageActive:", nextProps.pageActive)
		//console.log("this.props.pageActive:", this.props.pageActive)
		if (nextProps.pageActive !== this.props.pageActive) {
			var json = {
				pageCount: nextProps.pageActive
			}
			this.props.dispatch(fetchClubList(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "clubList"))
	}

	delClub(clubId) {
		var json = {
			"clubId": clubId
		}
		var r = confirm("确认要删除吗")
		if (r == true) {
			this.props.dispatch(fetchDelClub(json, this.props.pageActive))
		}
	}

	editClub(adminId) {
		this.context.router.push('/setup/editclub/' + adminId)
			//this.props.dispatch(fetchResetPass(json))
	}

	render() {
		const {
			pageActive,
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;
		return (
			<div className="student_center">
				<Tab active={4}/>
				<div className="info_list">
					<div className="setperson_title">
						<div>
							<Link to={"setup/addclub"}><span>添加</span></Link>
						</div>
					</div>
					<div className="user_list">
						<SetclubListBox 
						dataList = {dataList} 	
						pageCount = {pageCount}
						pageClick = {this.pageClick}
						editClub={this.editClub}
						delClub={this.delClub}
						total = {total} location = {"setup/setclub"}/>
					</div>
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const pageActive = state.pageActive.clubList;

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listSetClub.clublist || {
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
	if (ids) {
		var arr = ids[page]
		if (!!arr) {
			dataList = arr.map(id => lists[id])
		}
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
export default connect(mapStateToProps)(SetClub);