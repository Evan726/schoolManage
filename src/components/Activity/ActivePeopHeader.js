var React = require('react');
var Route = require('react-router');
var Link = Route.Link;
var ActivePeopHeader = React.createClass({

	render: function() {
		return (
			<div className="search">
					<div className="activeinfo_add">
						<span>X</span>
					</div>
					<div className="activeinfo_body">
						<p><span>欧亚运动趣味跑步</span><span className="activeinfo_name">报名中</span></p>
						<p><span>申明:</span><span>创建</span></p>
						<p><span>2016-02-12</span><span>10:30</span></p>
					</div>
					<div className="activeinfo_right">
						<ul className="info_time">
							<li><Link to={"activity/details"}>简介</Link></li>
							<li className="time_active"><Link to={"activity/member"} className="tabcolor">成员</Link></li>
						</ul>
					</div>
				</div>
		);
	}

});

module.exports = ActivePeopHeader;