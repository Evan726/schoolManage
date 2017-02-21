import React from 'react';
import ClubPeopleList from './ClubPeopleList';
import Pages from '../Common/pages';
export default class ClubPeopleBox extends React.Component {
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
			location,
			delClubMember
		} = this.props;
		return (
			<div className="activeinfo_time">
				<table>
					<thead>
					    <tr className="table_first">
					      <th>序号1</th>
					      <th>学号</th>
					      <th>姓名</th>
					      <th>运动里程(km)</th>
					      <th>本次参与活动</th>
						  <th>报名时间</th>
						  <th>操作</th>
					    </tr>
				    </thead>
				    {
				    	dataList.length > 0 && <ClubPeopleList delClubMember={delClubMember}  dataList={dataList}/>
				    }
				</table>
				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
			</div>
		);
	}
}