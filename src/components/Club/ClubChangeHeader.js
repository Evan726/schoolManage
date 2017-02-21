import React from 'react';
import {
	Link
} from "react-router";

export default class ClubChangeHeader extends React.Component{
	render () {
		return (
			<div className="search">
				<div className="activeinfo_add">
					<span>X</span>
				</div>
				<div className="activeinfo_body">
					<p><span>欧亚运动趣味跑步俱乐部</span></p>
					<p><span>申明:</span><span>创建</span></p>
					<p><span>2016-02-12</span><span>10:30</span></p>
				</div>
				<div className="search_right">
					<Link to={"club/clubinfo"}><span>取消</span></Link>
				</div>
			</div>
		)
	}
}
