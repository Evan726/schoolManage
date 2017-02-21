import React from 'react';
import ActivePeopList from '../../components/Activity/ActivePeopList.js';
import Pages from '../../components/Common/pages.js';
export default class ActivePeopBox extends React.Component{
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render () {
		const {
			pageCount,
			total,
			dataList,
			location
		} = this.props;
		
		return (
			<div className="info_list">
					<div className="activeinfo_time">
						<table>
						<thead>
						    <tr className="table_first">
						      <th>序号</th>
						      <th>学号</th>
						      <th>姓名</th>
						      <th>运动里程(km)</th>
						      <th>打卡时间</th>
						      <th>打卡地址</th>
							  <th>报名时间</th>
						    </tr>
						</thead>
						{
							dataList.length > 0 && <ActivePeopList dataList={dataList}/>
						}
						</table>
						<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
					</div>
			</div>
		);
	}
}
