import React from 'react';
import Pages from '../../components/Common/pages.js'
import ActiveList from '../../components/Activity/ActiveList.js'

export default class ActivityBox extends React.Component {
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
			delActivity,
			location
		} = this.props;
		return (
			<div className="list">
				<table>
					<thead>
					    <tr className="table_first">
					      <th>序号</th>
					      <th>活动主题</th>
					      <th>状态</th>
					      <th>报名人数</th>
					      <th>打卡人数</th>
					      <th>开始时间</th>
					      <th>参与条件</th>
					      <th>活动类型</th>
					      <th>所属俱乐部</th>
					      <th>负责人</th>
					      <th>操作</th>
					    </tr>
					</thead>
					{
						dataList.length > 0 && <ActiveList pageCount={pageCount} delActivity={delActivity} dataList={dataList}/> 
					}
				</table>

				<Pages total={total} pageCount={pageCount} onClickHendle={this.props.pageClick} location = {this.props.location}/>
				
			</div>
		);
	}
}