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
	fetchMemberList
} from "../../actions/club";
import {
	fetchDelClubMember
} from "../../actions/del";

import ClubHeader from '../../components/Club/ClubHeader.js';
import ClubPeopleBox from '../../components/Club/ClubPeopleBox.js';
import Loading from '../../components/Common/loading.js';

class MemberList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.delClubMember = this.delClubMember.bind(this);
	}

	componentWillMount() {
		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "memberList"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "memberList"))
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
			this.props.dispatch(fetchMemberList(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "memberList"))
	}
	delClubMember(id) {
		var json = {
			"userId": id
		}
		var r = confirm("确认要移除吗")
		if (r == true) {
			this.props.dispatch(fetchDelClubMember(json, this.props.pageActive, this.props.clubId))
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
				<p>当前位置：<span><Link to={"/club"}>俱乐部管理</Link> > </span><span className="span2">俱乐部成员</span></p>
				<ClubHeader headtype = {"member"} content={content}/>
				<div className="info_list">
					<ClubPeopleBox 
					dataList={dataList}
					pageCount = {pageCount}
					isFetching = {isFetching}
					pageClick = {this.pageClick}
					delClubMember={this.delClubMember}
					total = {total}  location = {"club/member"}/>
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const clubId = state.urlObj.memberList ? state.urlObj.memberList.id : "";
	const {
		content
	} = state.details.clubInfo[clubId] || {
		content: ""
	};

	const pageActive = state.pageActive.memberList;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.ClubMemberList[clubId] || {
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
export default connect(mapStateToProps)(MemberList);