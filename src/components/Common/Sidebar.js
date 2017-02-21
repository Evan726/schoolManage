import React from 'react';
import {
	Link
} from "react-router";

import students_01 from "../../static/images/students_01.png";
import students_02 from "../../static/images/students_02.png";
import left_icon_01 from "../../static/images/left_icon_01.png";
import logo from "../../static/images/logo.png";
import activity_01 from "../../static/images/activity_01.png";
import activity_02 from "../../static/images/activity_02.png";
import club_01 from "../../static/images/club_01.png";
import club_02 from "../../static/images/club_02.png";
import setup_01 from "../../static/images/setup_01.png";

class NavListLi extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		var src = "";
		var dizhi = location.hash.split("/")
		var num = dizhi[1].indexOf("?")
		var hash = "";
		if (num != -1) {
			hash = dizhi[1].substring(0, num)

		} else {
			hash = dizhi[1].substring(0)
		}



		if (this.props.src == "studentLogo") {
			src = students_01
		} else if (this.props.src == "activityLogo") {
			src = activity_01
		} else if (this.props.src == "clubLogo") {
			src = club_01
		}
		if (hash == "student" && this.props.src == "studentLogo") {
			src = students_02
		} else if (hash == "activity" && this.props.src == "activityLogo") {
			src = activity_02
		} else if (hash == "club" && this.props.src == "clubLogo") {
			src = club_02
		}

		return (
			<li><Link to={this.props.urls} activeClassName="active"><img src={src}/>{this.props.name}</Link></li>
		);
	}
}

//<li className="rukou_active" activeClassName="active"><Link to={"activeindex"}><img src={activity_01}/>活动管理</Link></li>
export default class Sidebar extends React.Component {
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
		var row = [];
		var itemArr = this.props.items;
		for (var i = 0; i < itemArr.length; i++) {
			row.push(<NavListLi name={itemArr[i].name}  urls={itemArr[i].urls} key = {itemArr[i].id} src = {itemArr[i].src}/>)
		}
		return (
			<div className="student_left">
				<div className="ruokou_logo">
					<img className="ruokou_bglogo" src={left_icon_01}/>
					<div className="ruokou_smlogo" >
						<img src={logo}/>
						<p>欧亚学院</p>
					</div>
				</div>
				<div className="rukou_list">
					<ul>
						{row}
					</ul>
				</div>

					<div className="rukou_set">
						
						<Link to={"/setup"}><img src={setup_01}/><span>设置</span></Link>
					</div>

				
			</div>
		);
	}
}