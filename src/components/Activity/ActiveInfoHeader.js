import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
export default class ActiveInfoHeader extends React.Component{
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render () {
		const {
			content
		} = this.props;
		var nowTime = new Date().getTime()
		var endTime = formatDate(new Date(content.endDate))
		var startTime = formatDate(new Date(content.startDate))
		if(startTime != NaN){
			startTime = new Date(content.endDate).getTime()
		}
		if(endTime !=NaN){
			endTime = new Date(content.endDate).getTime()
		}
		var status = "";
		if(startTime > nowTime){
			status = "报名中"
		}else if(endTime > nowTime){
			status = "进行中"
		}else if(endTime <nowTime){
			status = "已结束"
		}
		return (
			<div className="search">
				<div className="activeinfo_add">
					<span><img src={content.logoImgUrl} /></span>
				</div>
				<div className="activeinfo_body">
					<p><span>{content.title}</span><span className="activeinfo_name">{status}</span></p>
					<p><span>{content.publisher}</span><span>创建</span></p>
					<p><span>{formatDate(new Date(content.createTime))}</span></p>
				</div>
				<div className="activeinfo_right">
					<ul className="info_time">
						<li className="time_active"><Link to={"activity/details/"+content.id} className="tabcolor">简介</Link></li>
						<li><Link to={"activity/member/"+content.id}>成员</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}
