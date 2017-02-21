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
	fetchActivityDetails,
	fetchActivityMember
} from "../../actions/activity";


import ActiveHeader from '../../components/Activity/ActiveHeader.js';
import ActivePeopBox from '../../components/Activity/ActivePeopBox.js';
import Loading from '../../components/Common/loading.js';

class ActiveMember extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
	}

	componentWillMount() {
		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "activityMember"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "activityMember"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activityId !== this.props.activityId) {
			this.props.dispatch(fetchActivityDetails("activitydetails", nextProps.activityId))
		}
		if (nextProps.pageActive !== this.props.pageActive || nextProps.activityId !== this.props.activityId) {
			var json = {
				pageCount: nextProps.pageActive,
				activityId: nextProps.activityId
			}
			this.props.dispatch(fetchActivityMember(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "activityMember"))
	}

	render() {
		const {
			activityId,
			content,
			pageActive,
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;
		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/activity"}>活动管理</Link> > </span><span className="span2">活动成员</span></p>
				<ActiveHeader content={content}/>
				<ActivePeopBox
			    dataList={dataList}
			    pageCount = {pageCount}
			    isFetching = {isFetching}
				pageClick = {this.pageClick}
				total = {total}  location = {"club/member"}/>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const activityId = state.urlObj.activityMember ? state.urlObj.activityMember.id : "";

	const {
		content
	} = state.details.ActivityDetails[activityId] || {
		content: ""
	};

	const pageActive = state.pageActive.activityMember || 1;

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listActivityMember[activityId] || {
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
		activityId,
		content,
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(ActiveMember);