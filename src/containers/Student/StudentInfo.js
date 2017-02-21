import React from 'react';
import {
	Link
} from "react-router";
import {
	connect
} from "react-redux";
import {
	urlState
} from "../../actions/index";
import {
	fetchStudentInfo
} from "../../actions/student";
import img01 from '../../static/images/img01.png';
import Loading from '../../components/Common/loading.js';
class StudentInfo extends React.Component {

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
			}, "studentInfo"))
		} else {
			alert("URL错误")
		}
		//this.props.dispatch(fetchStudentInfo(this.props.params.id))
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.studentId !== this.props.studentId) {
			this.props.dispatch(fetchStudentInfo("studentInfo", nextProps.studentId))
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
	render() {
		const {
			content,
			isFetching
		} = this.props;
		var clubName = "";
		if (content.clubId) {
			clubName = content.clubId.name
		}
		var sexName = ""

		if (content.sex == 1) {
			sexName = "男"
		} else if (content.sex == 0) {
			sexName = "女"
		}
		return (
			<div className="student_center">

				<p>当前位置：<span><Link to={"/student"}>学生成绩</Link> ></span><span>基本信息</span></p>

				<div className="search">
					<div className="info_img">
						<img 
							src={this.state.headerImg}
							onError={this.handleImageErrored.bind(this)}
						/>
					</div>
					<div className="info_body">
						<p><span className="info_name">{content.nickName}</span><span>{clubName}</span></p>
						<p><span>学号:</span><span>{content.studentNo}</span></p>
					</div>
				</div>
				<div className="onestudent_list">
					<table>
						<colgroup>
							<col width = "180" />
							<col width = "＊"/>
						</colgroup>
						<tbody>
					    <tr>
					      <td className="onestudent_table1">手机</td>
					      <td className="onestudent_table2">{content.mobile}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">性别</td>
					      <td className="onestudent_table2">{sexName}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">身高</td>
					      <td className="onestudent_table2">{content.height}cm</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">体重</td>
					      <td className="onestudent_table2">{content.weight}kg</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">出生日期</td>
					      <td className="onestudent_table2">{content.birthday}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">所属俱乐部</td>
					      <td className="onestudent_table2">{clubName}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">入学日期</td>
					      <td className="onestudent_table2">{content.admission}</td>
					    </tr> 
					    </tbody> 
					</table>
					
				</div>
				{
						isFetching && <Loading />
					}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const studentId = state.urlObj.studentInfo ? state.urlObj.studentInfo.id : "";

	const {
		isFetch,
		content
	} = state.details.StudentInfo[studentId] || {
		isFetch: false,
		content: {}
	};
	return {
		studentId,
		isFetch,
		content
	}
}
export default connect(mapStateToProps)(StudentInfo);