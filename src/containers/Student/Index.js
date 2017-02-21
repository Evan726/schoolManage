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
	fetchGetRule,
	fetchPageActive
} from "../../actions/index";
import {
	fetchStudent
} from "../../actions/student";
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

		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "studentIndex"))
		this.props.dispatch(fetchGetRule(Number(this.props.params.page) || 1, "studentIndex"))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pageActive !== this.props.pageActive) {
			var json = {
				pageCount: nextProps.pageActive
			}
			this.props.dispatch(fetchStudent(json))
		}
	}
	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "studentIndex"))
	}
	searchHandel(studentNo) {
		if (!studentNo) {
			alert("搜索条件不能为空")
			return false
		}
		this.context.router.push('student/search/' + encodeURIComponent(studentNo));
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
			dataList,
			creditKiometer,
			creditActivity
		} = this.props;
		return (
			<div className="student_center">
				<p>当前位置：<span className="span2">学生成绩</span></p>
				<StudentSearch searchHandel ={this.searchHandel}></StudentSearch>
				<StudentBox 
					dataList = {dataList} 
					creditKiometer={creditKiometer}
					creditActivity={creditActivity}	
					pageCount = {pageCount}
					isFetching = {isFetching}
					pageClick = {this.pageClick}
					total = {total}  location = {"student"}/>
					{
						 isFetching && <Loading />
					}
			</div>
		);
	}
}

function mapStateToProps(state) {

	const pageActive = state.pageActive.studentIndex;
	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listStudent.student || {
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

	const {
		creditKiometer,
		creditActivity
	} = state.getRule.content || {
		creditKiometer: 0,
		creditActivity: 0
	}

	return {
		pageActive,
		isFetching,
		pageCount,
		total,
		dataList,
		creditKiometer,
		creditActivity
	}
};
export default connect(mapStateToProps)(Index);