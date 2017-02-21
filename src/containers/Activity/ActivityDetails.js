import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from "react-redux";
import {
	urlState
} from "../../actions/index";
import {
	fetchActivityDetails
} from "../../actions/activity";

import ActiveInfoHeader from '../../components/Activity/ActiveInfoHeader.js';
import ActiveInfoList from '../../components/Activity/ActiveInfoList.js';
import login_ico_01 from '../../static/images/login_ico_01.png';
import Loading from '../../components/Common/loading.js';

class ActivityDetails extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};
	componentWillMount() {
		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "activitydetails"))
		} else {
			alert("URL错误")
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.activityId !== this.props.activityId) {
			this.props.dispatch(fetchActivityDetails("activitydetails", nextProps.activityId))
		}
	}
	constructor(props) {
		super(props);
	}

	render() {
		const {
			clubId,
			isFetch,
			content
		} = this.props;
		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/activity"}>活动管理</Link> > </span><span className="span2">活动详情</span></p>
				<ActiveInfoHeader content={content}/>
				<ActiveInfoList content={content} isFetch = {isFetch}/>
				{
					isFetch && <Loading />
				}
			</div>
		);
	}
};
//星
function mapStateToProps(state) {
	const activityId = state.urlObj.activitydetails ? state.urlObj.activitydetails.id : "";
	const {
		isFetch,
		content
	} = state.details.ActivityDetails[activityId] || {
		isFetch: false,
		content: ""
	};
	return {
		activityId,
		isFetch,
		content
	}
}
export default connect(mapStateToProps)(ActivityDetails);