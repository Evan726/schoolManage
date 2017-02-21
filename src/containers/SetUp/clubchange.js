var React = require('react');
var Route = require('react-router');
var Link = Route.Link;

var cludcreate = React.createClass({

	render: function() {
		return (
			<div className="student_center">
				<p>当前位置：<span>俱乐部管理 > </span><span className="span2">详情</span></p>
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
						<Link to={"SetUp/setclub"}><span>取消</span></Link>
					</div>
				</div>
				<div className="onestudent_list">
					<table>
						<colgroup>
							<col width = "180"/>
							<col width = "＊"/>
						</colgroup>
						<tbody>
						    <tr>
						      <td className="createactive_table1">俱乐部LOGO</td>
						      <td>
						      	<span className="createactive_span">
						      		+
						      	</span>
						      	<span className="createactive_span1">图片尺寸为720*420，小于2M，格式为git,jpg,png</span>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>名称</td>
						      <td>
								<input type="text" value="单车俱乐部" disabled/>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>编号</td>
						      <td>
								<input type="text" value="P12" disabled/>
						      </td>
						    </tr>
						     <tr>
						      <td className="createactive_table1">简介</td>
						      <td>
								<textarea className="textarea"></textarea>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>负责人</td>
						      <td>
								<select>
							  <option value="saab">康宝</option>
							  <option value="opel">康宝</option>
							  <option value="audi">康宝</option>
								  <option value="audi">康宝</option>
								</select>
						      </td>
						    </tr>
					    </tbody>
					</table>
					<div className="add_button">
						<button disabled type="submit">确定</button>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = cludcreate;