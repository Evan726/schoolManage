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
	fetchClubInfo
} from "../../actions/club";
import ClubInfoHeader from '../../components/Club/ClubInfoHeader.js';
import ClubInfoList from '../../components/Club/ClubInfoList.js';
import Loading from '../../components/Common/loading.js';


class ClubInfo extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};
	componentWillMount() {

		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "clubInfo"))
		} else {
			alert("URL错误")
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.clubId !== this.props.clubId) {
			this.props.dispatch(fetchClubInfo("clubInfo", nextProps.clubId))
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
				<p>当前位置：<span><Link to="/club">俱乐部管理</Link> > </span><span className="span2">详情</span></p>
				<ClubInfoHeader content={content}/>
				<div className="onestudent_list">
					<ClubInfoList content={content} isFetch = {isFetch}/>
				</div>
				{
					isFetch && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const clubId = state.urlObj.clubInfo ? state.urlObj.clubInfo.id : "";
	const {
		isFetch,
		content
	} = state.details.clubInfo[clubId] || {
		isFetch: false,
		content: ""
	};
	return {
		clubId,
		isFetch,
		content
	}
}
export default connect(mapStateToProps)(ClubInfo);