import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import {
	fetchPageActive
} from "../../actions/index";
import {
	fetchActivity
} from "../../actions/activity";
import {
	fetchDelActivity
} from "../../actions/del";
import ActivitySearch from '../../components/Activity/ActivitySearch.js';
import ActivityBox from '../../components/Activity/ActivityBox.js';
import Loading from '../../components/Common/loading.js';

class Index extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.searchHandel = this.searchHandel.bind(this);
		this.delActivity = this.delActivity.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "activity"))
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.pageActive !== this.props.pageActive) {
			var json = {
				pageCount: nextProps.pageActive
			}
			this.props.dispatch(fetchActivity(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "activity"))
	}
	searchHandel(searchQuery) {
		if (!(searchQuery.memberType != undefined ||
				searchQuery.title ||
				searchQuery.activityType != undefined ||
				searchQuery.status != undefined)) {
			return false
		}
		this.context.router.push('activity/search/' + encodeURIComponent(JSON.stringify(searchQuery)));
	}

	delActivity(id) {
		var json = {
			"activityId": id
		}
		var r = confirm("确认要删除吗")
		if (r == true) {
			this.props.dispatch(fetchDelActivity(json, this.props.pageActive))
		}
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
				<p>当前位置：<span className="span2">活动管理</span></p>
				<ActivitySearch searchHandel ={this.searchHandel}/>
				<ActivityBox 
				dataList = {dataList} 	
				pageCount = {pageCount}
				pageClick = {this.pageClick}
				delActivity={this.delActivity}
				total = {total}  location = {"activity"}/>
				{
					isFetching && <Loading/>
				}
			</div>
		);
	}
}

//最新
function mapStateToProps(state) {

	const pageActive = state.pageActive.activity;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listActivity.activity || {
		isFetching: false,
		pageCount: 1,
		total: 0,
		lists: {},
		ids: {}
	};

	var dataList = [];
	var arr = ids[pageActive]
	if (!!arr) {
		dataList = arr.map(id => lists[id])
	}
	return {
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(Index);