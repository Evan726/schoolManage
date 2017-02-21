import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
import ClubLogo from '../../static/images/clubLogo.png';

export default class ClubHeader extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
	}

	componentWillMount() {
		const {
			headtype
		} = this.props;
		if (headtype === "member") {
			this.setState({
				active: true
			})
		}
	}

	render() {
		const {
			content
		} = this.props;

		var adminId = '';
		if(content.adminId){
			adminId= content.adminId.nickName
		}else{
			adminId = ""
		}
		
		return (
			<div className="search">
			<div className="activeinfo_add">
				<Link to={"club/clubInfo/"+content.id}><span><img src={content.logo || ClubLogo} /></span></Link>
			</div>
			<div className="activeinfo_body">
				<p><span>{content.name}</span></p>
				<p><span>{adminId}</span><span>创建</span></p>
				<p><span>{formatDate(new Date(content.createTime))}</span></p>
			</div>
			<div className="search_right">
				<ul className="info_time">
					<li className="time_active"><Link to={"club/activity/"+content.id} className={!this.state.active&&"tabcolor"}>活动</Link></li>
					<li><Link to={"club/member/"+content.id} className={this.state.active&&"tabcolor"}>成员</Link></li>
				</ul>
			</div>
		</div>
		);
	}
}