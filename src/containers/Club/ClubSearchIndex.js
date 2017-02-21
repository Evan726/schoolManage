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
	fetchSearchClub
} from "../../actions/club";
import ClubSearch from '../../components/Club/ClubSearch.js';
import ClubBox from '../../components/Club/ClubBox.js';
import Loading from '../../components/Common/loading.js';
class ClubSearchIndex extends React.Component {
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
			this.props.dispatch(urlState({
				queryStr: this.props.params.searchQuery
			}, "clubsearch"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "clubSearchIndex"))
	}

	componentWillReceiveProps(nextProps) {
		// console.log(1, nextProps.pageActive)
		// console.log(2, this.props.pageActive)
		if (nextProps.pageActive !== this.props.pageActive || nextProps.queryStr !== this.props.queryStr) {
			var json = {
				pageCount: nextProps.pageActive,
				queryName: nextProps.queryStr
			}
			this.props.dispatch(fetchSearchClub(json, nextProps.queryStr))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "clubSearchIndex"))
	}
	searchHandel(clubVal) {
		if (!clubVal) {
			this.context.router.push('/club');
			return false;
		}
		this.context.router.push('club/search/' + encodeURIComponent(clubVal));
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "clubSearchIndex"))
		this.props.dispatch(urlState({
			queryStr: clubVal
		}, "clubsearch"))
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
				 <ClubSearch val = {this.props.params.searchQuery} searchHandel ={this.searchHandel}/>
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
	const {
		queryStr
	} = state.urlObj.clubsearch || {
		queryStr: ""
	};
	const pageActive = state.pageActive.clubSearchIndex;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listSearchClub[queryStr] || {
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
		queryStr,
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(ClubSearchIndex);