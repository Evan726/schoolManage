import React from 'react';
import {
	Link
} from "react-router";
import Pages from '../../components/Common/pages.js';
import ClubList from '../../components/Club/ClubList.js';
export default class ClubBox extends React.Component {
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
					      <th>编号</th>
					      <th>名称</th>
					      <th>负责人</th>
					      <th>创建时间</th>
					      <th>活动数</th>
					      <th>成员数</th>
					    </tr>
				    </thead>
				    {
						dataList.length > 0 && <ClubList dataList={dataList} />
					}				     
				</table>
				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
			</div>
		);
	}
}