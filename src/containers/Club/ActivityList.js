import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import {
	urlState,
	fetchPageActive
} from "../../actions/index";
import {
	fetchClubInfo,
	fetchActivityList
} from "../../actions/club";
import {
	fetchDelClubActivity
} from "../../actions/del";
import ClubHeader from '../../components/Club/ClubHeader.js';
import ClubActiveBox from '../../components/Club/ClubActiveBox.js';
import Loading from '../../components/Common/loading.js';

class ActivityList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.delActivity = this.delActivity.bind(this);
	}

	componentWillMount() {
		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "ActivityList"))
		} else {
			alert("URL错误")
		}

		if (this.props.params.page) {
			this.props.dispatch(fetchPageActive(Number(this.props.params.page), "ActivityList"))
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.clubId !== this.props.clubId) {
			this.props.dispatch(fetchClubInfo("clubInfo", nextProps.clubId))
		}
		if (nextProps.pageActive !== this.props.pageActive || nextProps.clubId !== this.props.clubId) {
			var json = {
				pageCount: nextProps.pageActive,
				clubId: nextProps.clubId
			}
			this.props.dispatch(fetchActivityList(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "ActivityList"))
	}
	delActivity(id) {
		var json = {
			"activityId": id
		}
		var r = confirm("确认要删除吗")
		if (r == true) {
			this.props.dispatch(fetchDelClubActivity(json, this.props.pageActive, this.props.clubId))
		}
	}
	render() {
		const {
			clubId,
			content,
			pageActive,
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;

		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/club"}>俱乐部管理</Link> > </span><span className="span2">俱乐部活动</span></p>
				<ClubHeader headtype = {"activity"} content={content}/>
				<div className="info_list">
					<ClubActiveBox 
					dataList={dataList}
					pageCount = {pageCount}
					isFetching = {isFetching}
					pageClick = {this.pageClick}
					delActivity={this.delActivity}
					total = {total}  location = {"club/activity"}/>
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const clubId = state.urlObj.ActivityList ? state.urlObj.ActivityList.id : "";
	const {
		content
	} = state.details.clubInfo[clubId] || {
		content: ""
	};


	const pageActive = state.pageActive.ActivityList || 1;

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.ClubActivityList[clubId] || {
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
		clubId,
		content,
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(ActivityList);