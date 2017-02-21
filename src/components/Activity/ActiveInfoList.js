import React from 'react';
import {
	formatDate
} from '../../libs/formatDate';
export default class ActiveInfoList extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}
	render() {
		const {
			content,
			isFetch
		} = this.props;

		var memberType = "";
		if (content.memberType == 0) {
			memberType = "本俱乐部"
		} else if (content.memberType == 1) {
			memberType = "学生"
		} else if (content.memberType == 2) {
			memberType = "公开"
		}

		var activityType = ""
		if (content.activityType == 0) {
			activityType = "跑步"
		} else if (content.activityType == 1) {
			activityType = "其他活动"
		}

		var startDate = "";
		if (content.startDate == undefined) {
			startDate = "";
		} else {
			startDate = formatDate(new Date(content.startDate));
		}

		var clubName = "";
		if (content.clubId) {
			clubName = content.clubId.name
		}

		var endDate = "";
		if (content.endDate == undefined) {
			endDate = "";
		} else {
			endDate = formatDate(new Date(content.endDate));
		}

		return (
			<div className="info_list">
				<table>
					<colgroup>
						<col width = "180" />
						<col width = "＊"/>
					</colgroup>
					<tbody>
					    <tr>
					      <td className="onestudent_table1">开始时间：</td>
					      <td className="onestudent_table2">{startDate}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">结束时间：</td>
					      <td className="onestudent_table2">{endDate}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">活动地址：</td>
					      <td className="onestudent_table2">{content.address}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">活动类型：</td>
					      <td className="onestudent_table2">{activityType}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">参与对象：</td>
					      <td className="onestudent_table2">{memberType}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">报名人数：</td>
					      <td className="onestudent_table2">{content.enrollCount}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">打卡数：</td>
					      <td className="onestudent_table2">{content.signCount||0}</td>
					    </tr>
					    <tr>
					      <td className="onestudent_table1">活动介绍：</td>
					      <td className="onestudent_table2">{content.introductionUrl}</td>
					    </tr>  
				    </tbody> 
				</table>
			</div>
		);
	}
}