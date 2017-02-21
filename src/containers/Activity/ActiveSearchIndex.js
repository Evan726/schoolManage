import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import ActivitySearch from '../../components/Activity/ActivitySearch.js';
import ActivityBox from '../../components/Activity/ActivityBox.js';
import Loading from '../../components/Common/loading.js';
import {
	urlState,
	fetchPageActive
} from "../../actions/index";
import {
	studentSearchData
} from "../../actions/student";
import {
	fetchSearchActivity
} from "../../actions/activity";
class ActiveSearchIndex extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.searchHandel = this.searchHandel.bind(this);
	}
	componentWillMount() {
		if (this.props.params.searchQuery) {

			var reqQuery = JSON.parse(this.props.params.searchQuery);
			var queryStr = "";
			for (var key in reqQuery) {
				queryStr += reqQuery[key]
			};
			this.props.dispatch(urlState({
				queryStr: queryStr,
				reqQuery: reqQuery
			}, "activitysearch"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "activitysearch"))
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.pageActive !== this.props.pageActive || nextProps.reqQuery !== this.props.reqQuery) {

			if (!(nextProps.reqQuery.memberType != undefined ||
					nextProps.reqQuery.title ||
					nextProps.reqQuery.activityType != undefined ||
					nextProps.reqQuery.status != undefined)) {
				alert("请选择搜索条件");
				return false
			}

			var json = {
				pageCount: nextProps.pageActive,
			}
			if (nextProps.reqQuery.memberType >= 0) {
				json.memberType = nextProps.reqQuery.memberType
			}
			if (nextProps.reqQuery.title) {
				json.title = nextProps.reqQuery.title
			}
			if (nextProps.reqQuery.activityType >= 0) {
				json.activityType = nextProps.reqQuery.activityType
			}
			if (nextProps.reqQuery.status >= 0) {
				json.status = nextProps.reqQuery.status
			}

			this.props.dispatch(fetchSearchActivity(json, nextProps.queryStr))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page))
	}
	searchHandel(reqQuery) {
		if (!(reqQuery.memberType != undefined ||
				reqQuery.title ||
				reqQuery.activityType != undefined ||
				reqQuery.status != undefined)) {
			this.context.router.push('/activity');
			return false
		}

		this.context.router.push('activity/search/' + encodeURIComponent(JSON.stringify(reqQuery)));
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "activitysearch"))
		var queryStr = "";
		for (var key in reqQuery) {
			queryStr += reqQuery[key]
		};
		this.props.dispatch(urlState({
			queryStr: queryStr,
			reqQuery: reqQuery
		}, "activitysearch"))
	}
	render() {
		const {
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;
		return (
			<div className="student_center">
				<p>当前位置：<span className="span2">活动搜索页</span></p>
				<ActivitySearch  val = {this.props.params.searchQuery} searchHandel ={this.searchHandel}/>
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

function mapStateToProps(state) {
	const {
		queryStr,
		reqQuery
	} = state.urlObj.activitysearch || {
		queryStr: "",
		reqQuery: {}
	};

	const pageActive = state.pageActive.activitysearch;

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listSearchActivity[queryStr] || {
		isFetching: false,
		nextPageUrl: "",
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
		queryStr,
		reqQuery,
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(ActiveSearchIndex);