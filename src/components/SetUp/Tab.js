import React from 'react';
import {
	Link
} from "react-router";
export default class Tab extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			group: null
		}
	}
	componentWillMount() {
		this.setState({
			group: Number(sessionStorage.getItem("group"))
		})
	}
	render() {
		if (this.state.group == 1) {
			return (
				<div className="set_title">
					<ul>
						<li className={this.props.active===1?"set_li":""}><Link to={"/setup"}>后台用户</Link></li>
						<li className={this.props.active===2?"set_li":""}><Link to={"setup/userlevel"}>学员等级</Link></li>
						<li className={this.props.active===3?"set_li":""}><Link to={"setup/setrule"}>基础规则</Link></li>
						<li className={this.props.active===4?"set_li":""}><Link to={"setup/setclub"}>俱乐部设置</Link></li>
					</ul>
				</div>
			)
		}
		return (
			<div className="set_title">
				<ul>
					<li className={this.props.active===1?"set_li":""}><Link to={"/setup"}>后台用户</Link></li>
				</ul>
			</div>
		);
	}
}