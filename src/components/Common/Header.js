import React from 'react';
import {
	Link
} from "react-router";
import id_02 from "../../static/images/id_02.png";
import {
	formatDate,
	getWeek
} from '../../libs/formatDate';
export default class Header extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			nTime: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + getWeek(new Date())
		}
	}

	render() {
		const {
			user,
			nickName,
			userId,
			status,
			newDate
		} = this.props;

		return (
			<header>
				<span className="span1">青动力后台管理系统</span>
				<span>{this.state.nTime}</span>
				<div className="rukou_right">
					<div className="right_name">
						<img src={id_02}/>
						<span>{nickName||user}
						<ul>
							<li><Link to={"/setup/edituseradmin/"+userId}>个人资料</Link></li>
							<li><Link to={"/setup/editpassword/"+userId}>修改密码</Link></li>
						</ul>
						</span>
					</div>
					<a href="#" className="button" onClick={this.props.onClickHendle.bind(this)}>退出</a>
				</div>
			</header>
		);
	}
}