import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from "react-redux";
import ActivityListBox from '../../components/Student/ActivityListBox.js';
import img01 from '../../static/images/img01.png';
import login_ico_01 from '../../static/images/login_ico_01.png';
import {
	urlState,
	fetchPageActive
} from "../../actions/index";
import {
	fetchStudentActivity,
	fetchStudentInfo
} from "../../actions/student";
import Loading from '../../components/Common/loading.js';

class ActivityList extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			headerImg: ""
		}
	}
	componentWillMount() {

		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "ActivityList"))
		} else {
			alert("URL错误")
		}
		this.props.dispatch(fetchPageActive(Number(this.props.params.page) || 1, "ActivityList"))
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
			this.props.dispatch(fetchStudentActivity(json))
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
	// componentWillMount() {
	// 	this.props.dispatch(fetchStudentInfo(this.props.params.id))
	// 	if (this.props.content.id) {
	// 		var json = {
	// 			studentId: this.props.content.id,
	// 		}
	// 		this.props.dispatch(fetchStudentActivity(json))
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.content.id !== this.props.content.id) {
	// 		var json = {
	// 			studentId: nextProps.content.id,
	// 		}
	// 		this.props.dispatch(fetchStudentActivity(json))
	// 	}
	// }
	render() {
		const {
			isFetching,
			pageCount,
			total,
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
		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/student"}>学生成绩 ></Link></span><span className="span2">Ta的活动</span></p>
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
						<span className="search_span"><Link to={"student/mileage/"+this.props.params.id} className="listcolor1">Ta的里程</Link></span>
						<span><img src={login_ico_01}/></span>
						<span className="search_span"><Link to={"student/activity/"+this.props.params.id} className="listcolor">Ta的活动</Link></span>
					</div>
				</div>
				<div className="info_list">
					<p>本学期共参加了{dataList.length}次活动</p>
					<ActivityListBox dataList={dataList} isFetching = {isFetching}/>
				</div>
				{
					isFetching && <Loading />
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const studentId = state.urlObj.ActivityList ? state.urlObj.ActivityList.id : "";
	//console.log("123", studentId)

	const {
		content
	} = state.details.StudentInfo[studentId] || {
		content: ""
	};

	const {
		isFetching,
		pageCount,
		total,
		lists,
		ids
	} = state.listpage.listStudentActivity[content.id] || {
		isFetching: false,
		pageCount: 1,
		total: 0,
		lists: {},
		ids: {}
	};

	var dataList = [];
	var arr = ids[1]
	if (!!arr) {
		dataList = arr.map(id => lists[id])
	}
	return {
		studentId,
		isFetching,
		pageCount,
		total,
		content,
		dataList
	}
};
export default connect(mapStateToProps)(ActivityList);