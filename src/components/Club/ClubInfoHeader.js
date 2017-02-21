import React from 'react';
import {
	Link
} from "react-router";
import {
	formatDate
} from '../../libs/formatDate';
import ClubLogo from '../../static/images/clubLogo.png';

export default class ClubInfoHeader extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			headerImg: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.content.logo !== this.props.content.logo) {
			this.setState({
				headerImg: nextProps.content.logo
			})
		}
	}

	handleImageErrored() {
		this.setState({
			headerImg: ClubLogo,
		});
	}

	render() {
		const {
			content
		} = this.props;
		var adminId = '';
		if (content.adminId) {
			adminId = content.adminId.nickName
		} else {
			adminId = ""
		}

		var createTime = "";
		if (content.createTime == undefined) {
			createTime = "";
		} else {
			createTime = formatDate(new Date(content.createTime))
		}

		return (
			<div className="search">
				<div className="activeinfo_add">
					<span>
						<img 
							src={this.state.headerImg}
							onError={this.handleImageErrored.bind(this)}
						/>
					</span>
				</div>
				<div className="activeinfo_body">
					<p><span>{content.name}</span></p>
					<p><span>{adminId}</span><span>创建</span></p>
					<p><span>{createTime}</span></p>
				</div>
				<div className="search_right">
					<Link to={"setup/editclub/"+content.id+"/clubinfo"}><span>编辑</span></Link>
				</div>
			</div>
		);
	}
}