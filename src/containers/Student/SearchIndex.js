import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import StudentBox from "../../components/Student/StudentBox.js";
import StudentSearch from "../../components/Student/StudentSearch.js";
import {
	urlState,
	fetchPageActive
} from "../../actions/index";
import {
	fetchSearchStudent,
	studentSearchData
} from "../../actions/student";

class SearchIndex extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.searchHandel = this.searchHandel.bind(this);
	}

	componentWillMount() {
		if (this.props.params.studentNo) {
			this.props.dispatch(urlState({
				studentNo: this.props.params.studentNo
			}, "searchIndex"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "SearchIndex"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pageActive !== this.props.pageActive || nextProps.studentNo !== this.props.studentNo) {
			var json = {
				pageCount: nextProps.pageActive,
				studentNo: nextProps.studentNo
			}
			this.props.dispatch(fetchSearchStudent(json))
		}
	}

	pageClick(page) {
		this.props.dispatch(fetchPageActive(page))
	}

	searchHandel(studentNo) {
		if (!studentNo) {
			this.context.router.push('/student');
			return false
		}
		this.context.router.push('student/search/' + encodeURIComponent(studentNo));
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "clubSearchIndex"))
		this.props.dispatch(urlState({
			studentNo: studentNo
		}, "searchIndex"))
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
				<p>当前位置：<span className="span2">学生成绩搜索</span></p>
				<StudentSearch val={this.props.params.studentNo} searchHandel ={this.searchHandel}></StudentSearch>
				<StudentBox 
					dataList = {dataList} 	
					pageCount = {pageCount}
					pageClick = {this.pageClick}
					total = {total} location = {"student/search"}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const studentNo = state.urlObj.searchIndex ? state.urlObj.searchIndex.studentNo : "";
	//console.log("123", studentId)
	const pageActive = state.pageActive.SearchIndex;

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listSearchStudent[studentNo] || {
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
		studentNo,
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList
	}
};
export default connect(mapStateToProps)(SearchIndex);