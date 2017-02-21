import React from 'react';
import Pages from "./../Common/Pages.js";
import StudentList from "./StudentList.js";
export default class StudentBox extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			pageCount,
			total,
			dataList,
			location
		} = this.props;
		return (
			<div className="list">
				<table>
				<thead>
				<tr className="table_first">
					<th>序号</th>
					<th>学号</th>
					<th>姓名</th>
					<th>所属俱乐部</th>
					<th>本期里程(km)</th>
					<th>本期参与活动(次)</th>
					<th>本期成绩</th>
				</tr>
				</thead>
					{
						dataList.length > 0 && <StudentList dataList={dataList} />
					}
				</table>
				<p className="explain">学生成绩由有运动里程和参与活动数根据规则比例计算而来，运动1KM获得<span>{this.props.creditKiometer}</span>学分，参与一次校内活动获得<span>{this.props.creditActivity}</span>学分</p>
				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
				 
			</div>
		);
	}
}