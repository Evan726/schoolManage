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
	fetchClub
} from "../../actions/club";
import ClubSearch from '../../components/Club/ClubSearch.js';
import ClubBox from '../../components/Club/ClubBox.js';
import Loading from '../../components/Common/loading.js';
class Index extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.searchHandel = this.searchHandel.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "clubIndex"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pageActive !== this.props.pageActive) {
			var json = {
				pageCount: nextProps.pageActive
			}
			this.props.dispatch(fetchClub(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "clubIndex"))
	}
	searchHandel(clubVal) {
		if (!clubVal) {
			alert("搜素条件不能为空");
			return false;
		}
		this.context.router.push('club/search/' + encodeURIComponent(clubVal));
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
			isFetching,
			pageCount,
			total,
			dataList
		} = this.props;
		return (
			<div className="student_center">
				 <ClubSearch searchHandel ={this.searchHandel}/>
				 <ClubBox 
					dataList = {dataList} 	
					pageCount = {pageCount}
					isFetching = {isFetching}
					pageClick = {this.pageClick}
					total = {total}  location = {"club"}/>
					{
						isFetching && <Loading />
					}
			</div>
		);
	}
}

function mapStateToProps(state) {

	const pageActive = state.pageActive.clubIndex;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.ClubList.club || {
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