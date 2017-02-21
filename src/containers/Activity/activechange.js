var React = require('react');
var Route = require('react-router');
var Link = Route.Link;
var activechange = React.createClass({

	render: function() {
		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/activity"}>活动管理</Link> > </span><span><Link to={"activeindex/activeinformation"}>活动详情</Link> > </span><span className="span2">编辑</span></p>
				<div className="search">
					<div className="activeinfo_add">
						<span>X</span>
					</div>
					<div className="activeinfo_body">
						<p><span>欧亚运动趣味跑步</span><span className="activeinfo_name">报名中</span></p>
						<p><span>申明:</span><span>创建</span></p>
						<p><span>2016-02-12</span><span>10:30</span></p>
					</div>
					<div className="search_right">
						<span><Link to={"activeindex/activeinformation"}>取消</Link></span>
					</div>
				</div>
				<div className="onestudent_list">
					<form>
						<table>
							<colgroup>
								<col width = "180"/>
								<col width = "＊"/>
							</colgroup>
						    <tr>
						      <td className="createactive_table1"><i>*</i>活动LOGO</td>
						      <td>
						      	<span className="createactive_span">
						      		+
						      	</span>
						      	<span className="createactive_span1">图片尺寸为720*420，小于2M，格式为git,jpg,png</span>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>活动主题</td>
						      <td>
								<input type="text"/>
						    </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>活动类型</td>
						      <td>
								<select>
								  <option value="volvo">跑步</option>
								  <option value="saab">跑步</option>
								  <option value="opel">跑步</option>
								  <option value="audi">跑步</option>
								</select>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>里程</td>
						      <td>
								<input type="text"/> cm
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>开始时间</td>
						      <td>
								<input type="text"/> 
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>结束时间</td>
						      <td>
								<input type="text"/>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1">周期</td>
						      <td>
								<select>
								  <option value="volvo">一次性</option>
								  <option value="saab">一次性</option>
								  <option value="opel">一次性</option>
								  <option value="audi">一次性</option>
								</select>
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>活动地址</td>
						      <td>
								<input type="text" /> 地图
						      </td>
						    </tr>
						    <tr>
						      <td className="createactive_table1"><i>*</i>参与范围</td>
						      <td>
								<input type="radio" name="a"/> 本俱乐部
								<input type="radio" name="a"/> 校内
								<input type="radio" name="a"/> 公开
						      </td>
						    </tr>
						     <tr>
						      <td className="createactive_table1">活动简介</td>
						      <td>
								<textarea></textarea>
						      </td>
						    </tr>
						</table>
						<div className="add_button">
							<button disabled type="submit">确定</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

});

module.exports = activechange;