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
	fetchMileage,
	fetchStudentInfo
} from "../../actions/student";

import MileageListBox from '../../components/Student/MileageListBox.js';
import img01 from '../../static/images/img01.png';
import login_ico_01 from '../../static/images/login_ico_01.png';
import Loading from '../../components/Common/loading.js';
class MileageList extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.pageClick = this.pageClick.bind(this);
		this.state = {
			headerImg: ""
		}
	}

	componentWillMount() {

		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "mileageList"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "MileageList"))
	}

	componentWillReceiveProps(nextProps) {
		// console.log("1-----", nextProps.pageActive)
		// console.log("2-----", this.props.pageActive)
		//console.log("3-----", this.props.studentId)
		//console.log("4-----", nextProps.studentId)
		if (nextProps.studentId !== this.props.studentId) {
			this.props.dispatch(fetchStudentInfo("studentInfo", nextProps.studentId))
		}
		if (nextProps.pageActive !== this.props.pageActive || nextProps.studentId !== this.props.studentId) {
			var json = {
				pageCount: nextProps.pageActive,
				studentId: nextProps.studentId,
			}
			this.props.dispatch(fetchMileage(json))
		}
		if (nextProps.content.headImg !== this.props.content.headImg) {
			this.setState({
				headerImg: "http://ojp3gtlnw.bkt.clouddn.com/" + nextProps.content.headImg
			})
		}
	}

	handleImageErrored() {
		this.setState({
			headerImg: img01,
		});
	}

	pageClick(page) {
		this.props.dispatch(fetchPageActive(page, "MileageList"))
	}
	render() {
		const {
			isFetching,
			pageCount,
			total,
			durationCount,
			kilometerCount,
			dataList,
			content
		} = this.props;


		var clubName = "";
		if (content.clubId) {
			clubName = content.clubId.name
		}
		var sexName = ""

		if (content.sex == 1) {
			sexName = "男"
		} else if (content.sex == 1) {
			sexName = "女"
		}

		//保留小数点后两位
		var kilometer = Math.round(kilometerCount * 100) / 100;


		var _html = "";
		if (durationCount >= 60) {
			var hour = durationCount / 3600;
			hour = Math.round(hour * 100) / 100;
			_html = hour + "小时"
		} else {
			var minute = durationCount / 60;
			minute = Math.round(minute * 100) / 100;
			_html = minute + "分钟"
		}

		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/student"}>学生成绩 ></Link></span><span className="span2">Ta的里程</span></p>
				<div className="search">
					<Link to={"student/studentInfo/"+content.id}>
						<img 
							className="info_img"
							src={this.state.headerImg}
							onError={this.handleImageErrored.bind(this)}
						/>
					</Link>
					<div className="info_body">
						<p><Link to={"student/studentInfo/"+content.id}><span className="info_name">{content.nickName}</span></Link><span>{clubName}</span></p>
						<p><span>学号:</span><span>{content.studentNo}</span></p>
					</div>
					<div className="search_right">
						<span className="search_span"><Link to={"student/mileage/"+this.props.params.id}  className="listcolor">Ta的里程</Link></span>
						<span><img src={login_ico_01}/></span>
						<span><Link to={"student/activity/"+this.props.params.id} className="listcolor1">Ta的活动</Link></span>
					</div>
				</div>
				<div className="info_list">
					<p>本学期运动了{_html}，{kilometer||0}km</p>
					<MileageListBox 					
						dataList = {dataList} 	
						pageCount = {pageCount}
						isFetching = {isFetching}
						pageClick = {this.pageClick}
						total = {total} location = {this.props.location}/>
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		)
	}
}

function mapStateToProps(state) {

	const studentId = state.urlObj.mileageList ? state.urlObj.mileageList.id : "";
	//console.log("123", studentId)

	const {
		content
	} = state.details.StudentInfo[studentId] || {
		content: ""
	};

	const pageActive = state.pageActive.MileageList;

	const {
		isFetching,
		pageCount,
		durationCount,
		kilometerCount,
		total,
		lists,
		ids
	} = state.listpage.listMileageStudent[studentId] || {
		isFetching: false,
		pageCount: 1,
		durationCount: 0,
		kilometerCount: 0,
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
		studentId,
		pageActive,
		isFetching,
		pageCount,
		durationCount,
		kilometerCount,
		total,
		content,
		dataList
	}
};
export default connect(mapStateToProps)(MileageList);