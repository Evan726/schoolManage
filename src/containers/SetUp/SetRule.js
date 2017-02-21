import React from 'react';
import {
	connect
} from "react-redux";
import {
	Link
} from "react-router";
import {
	fetchGetSetRule,
	fetchEditSetRule
} from "../../actions/setup";

import Tab from '../../components/SetUp/Tab';
import login_ico_01 from '../../static/images/login_ico_01.png';
class SetRule extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			targetCredits: null,
			excellentCredit: null,
			passCredit: null,
			creditKiometer: null,
			creditActivity: null,
			bigCreditActivity: null,
			smallSpeed: null,
			bigSpeed: null,
			lastSemesterStartTime: null,
			lastSemesterEntTime: null,
			nextSemesterStartTime: null,
			nextSemesterEndTime: null,
			isDisabled: false,
			isEdit: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit1 = this.handleSubmit1.bind(this);
		this.handleSubmit2 = this.handleSubmit2.bind(this);
	}
	componentWillMount() {
		this.props.dispatch(fetchGetSetRule())

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.content !== this.props.content) {
			var con = nextProps.content;
			this.setState({
				targetCredits: con.targetCredits,
				excellentCredit: con.excellentCredit,
				passCredit: con.passCredit,
				creditKiometer: con.creditKiometer,
				creditActivity: con.creditActivity,
				bigCreditActivity: con.bigCreditActivity,
				smallSpeed: con.smallSpeed,
				bigSpeed: con.bigSpeed,
				lastSemesterStartTime: con.lastSemesterStartTime,
				lastSemesterEntTime: con.lastSemesterEntTime,
				nextSemesterStartTime: con.nextSemesterStartTime,
				nextSemesterEndTime: con.nextSemesterEndTime
			})

		}
		if (nextProps.isEdit !== this.state.isEdit) {
			alert("修改成功")
			this.setState({
				isEdit: false
			})
		}
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	handleSubmit1(e) {
		e.preventDefault();
		var a,b,c,d,e,f,g,h,i;
		if(!this.state.targetCredits){
			$(".targetCredits").eq(0).css("display","inline-block")
			$("#targetCredits").css("border-color","#f40")
			a = false;
		}else{
			$(".targetCredits").eq(0).css("display","none")
			$("#targetCredits").css("border-color","#cdcbcc")
			a = true;
		}
		if(!this.state.creditKiometer){
			$(".creditKiometer").eq(0).css("display","inline-block")
			$("#creditKiometer").css("border-color","#f40")
			b = false;
		}else{
			$(".creditKiometer").eq(0).css("display","none")
			$("#creditKiometer").css("border-color","#cdcbcc")
			b = true;
		}
		if(!this.state.bigCreditActivity){
			$(".bigCreditActivity").eq(0).css("display","inline-block")
			$("#bigCreditActivity").css("border-color","#f40")
			c = false;
		}else{
			$(".bigCreditActivity").eq(0).css("display","none")
			$("#bigCreditActivity").css("border-color","#cdcbcc")
			c = true;
		}
		if(!this.state.creditActivity){
			$(".creditActivity").eq(0).css("display","inline-block")
			$("#creditActivity").css("border-color","#f40")
			d = false;
		}else{
			$(".creditActivity").eq(0).css("display","none")
			$("#creditActivity").css("border-color","#cdcbcc")
			d = true;
		}
		if(!this.state.passCredit){
			$(".passCredit").eq(0).css("display","inline-block")
			$("#passCredit").css("border-color","#f40")
			e = false;
		}else{
			$(".passCredit").eq(0).css("display","none")
			$("#passCredit").css("border-color","#cdcbcc")
			e = true;
		}
		if(!this.state.excellentCredit){
			$(".excellentCredit").eq(0).css("display","inline-block")
			$(".excellentCredit").eq(1).css("display","none")
			$("#excellentCredit").css("border-color","#f40")
			f = false;
		}else{
			$(".excellentCredit").eq(0).css("display","none")
			$("#excellentCredit").css("border-color","#cdcbcc")
			f = true;
		}
		if(!this.state.smallSpeed || !this.state.bigSpeed){
			$(".Speed").eq(0).css("display","inline-block")
			$("#smallSpeed").css("border-color","#f40")
			$("#bigSpeed").css("border-color","#f40")
			g = false;
		}else{
			$(".Speed").eq(0).css("display","none")
			$("#smallSpeed").css("border-color","#cdcbcc")
			$("#bigSpeed").css("border-color","#cdcbcc")
			g = true;
		}
		if(this.state.passCredit && this.state.excellentCredit){
			if(this.state.passCredit - this.state.excellentCredit >= 0 ){
	 			$(".excellentCredit").eq(1).css("display","inline-block")
				$("#excellentCredit").css("border-color","#f40")
				h = false;
	 		}else{
	 			$(".excellentCredit").eq(1).css("display","none")
				$("#excellentCredit").css("border-color","#cdcbcc")
				h = true;
	 		}
		}
 		if(this.state.smallSpeed && this.state.bigSpeed){
 			if(this.state.smallSpeed - this.state.bigSpeed >= 0 ){
	 			$(".Speed").eq(1).css("display","inline-block")
				$("#bigSpeed").css("border-color","#f40")
				i = false;
	 		}else{
	 			$(".Speed").eq(1).css("display","none")
				$("#bigSpeed").css("border-color","#cdcbcc")
				i = true;
	 		}
 		}
		if(!(a&&b&&c&&d&&e&&f&&g&&h&&i)){
			return false;
		}

		var m,n,o,p,q,r,s;
		if(!(this.state.targetCredits > 0) || this.state.targetCredits > 500){
			$(".targetCredits").eq(1).css("display","inline-block")
			$("#targetCredits").css("border-color","#f40")
			m = false;
		}else{
			$(".targetCredits").eq(1).css("display","none")
			$("#targetCredits").css("border-color","#cdcbcc")
			m = true;
		}
		if(!(this.state.creditKiometer > 0) || this.state.creditKiometer > 100){
			$(".creditKiometer").eq(1).css("display","inline-block")
			$("#creditKiometer").css("border-color","#f40")
			n = false;
		}else{
			$(".creditKiometer").eq(1).css("display","none")
			$("#creditKiometer").css("border-color","#cdcbcc")
			n = true;
		}
		if(!(this.state.bigCreditActivity > 0) || this.state.bigCreditActivity > 100){
			$(".bigCreditActivity").eq(1).css("display","inline-block")
			$("#bigCreditActivity").css("border-color","#f40")
			o = false;
		}else{
			$(".bigCreditActivity").eq(1).css("display","none")
			$("#bigCreditActivity").css("border-color","#cdcbcc")
			o = true;
		}
		if(!(this.state.creditActivity > 0) || this.state.creditActivity > 100){
			$(".creditActivity").eq(1).css("display","inline-block")
			$("#creditActivity").css("border-color","#f40")
			p = false;
		}else{
			$(".creditActivity").eq(1).css("display","none")
			$("#creditActivity").css("border-color","#cdcbcc")
			p = true;
		}
		var passgrade = this.state.targetCredits * this.state.creditKiometer + this.state.bigCreditActivity;
		if(!(this.state.passCredit > 0) || this.state.passCredit > passgrade){
			$(".passCredit").eq(1).css("display","inline-block")
			$("#passCredit").css("border-color","#f40")
			q = false;
		}else{
			$(".passCredit").eq(1).css("display","none")
			$("#passCredit").css("border-color","#cdcbcc")
			q = true;
		}
		if(!(this.state.excellentCredit > 0)){
			$(".excellentCredit").eq(2).css("display","inline-block")
			$("#excellentCredit").css("border-color","#f40")
			r = false;
		}else{
			$(".excellentCredit").eq(2).css("display","none")
			$("#excellentCredit").css("border-color","#cdcbcc")
			r = true;
		}
		if(!(this.state.smallSpeed > 0) || !(this.state.bigSpeed > 0) || this.state.smallSpeed > 50 || this.state.bigSpeed > 50	){
			$(".Speed").eq(2).css("display","inline-block")
			$("#smallSpeed").css("border-color","#f40")
			$("#bigSpeed").css("border-color","#f40")
			s = false;
		}else{
			$(".Speed").eq(2).css("display","none")
			$("#smallSpeed").css("border-color","#cdcbcc")
			$("#bigSpeed").css("border-color","#cdcbcc")
			s = true;
		}
		if(!(m&&n&&o&&p&&q&&r&&s)){
			return false;
		}
		this.props.dispatch(fetchEditSetRule(this.state))
	}

	handleSubmit2(e) {
		e.preventDefault();	
		this.props.dispatch(fetchEditSetRule(this.state))
	}
	render() {
		return (
			<div className="student_center">
				<Tab active={3}/>
				<div className="onestudent_list">
					<div className="set_list">
						<form onSubmit = {this.handleSubmit1}>
						<h4>学分规则设定</h4>
							<ul>
								<li>
									<span>一个学期运动目标里程</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="targetCredits"
										ref="targetCredits"
										value={this.state.targetCredits}
										onChange ={this.handleChange.bind(this,'targetCredits')}/>
									<span>公里</span>
									<strong className="targetCredits">不能为空</strong>
									<strong className="targetCredits">请输入1到500之间的整数</strong>
								</li>
								<li>
									<span>有效跑步1km累计</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="creditKiometer"
										ref="creditKiometer"
										value={this.state.creditKiometer}
										onChange ={this.handleChange.bind(this,'creditKiometer')}/>
									<span>学分</span>
									<strong className="creditKiometer">不能为空</strong>
									<strong className="creditKiometer">请输入1到100之间的整数</strong>
								</li>


								<li>
									<span>一个学期活动分上限</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="bigCreditActivity"
										ref="bigCreditActivity"
										value={this.state.bigCreditActivity}
										onChange ={this.handleChange.bind(this,'bigCreditActivity')}/>
									<span>学分</span>
									<strong className="bigCreditActivity">不能为空</strong>
									<strong className="bigCreditActivity">请输入1到100之间的整数</strong>
								</li>
								<li>
									<span>参加1次活动累计</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="creditActivity"
										ref="creditActivity"
										value={this.state.creditActivity}
										onChange ={this.handleChange.bind(this,'creditActivity')}/>
									<span>学分</span>
									<strong className="creditActivity">不能为空</strong>
									<strong className="creditActivity">请输入1到100之间的整数</strong>
								</li>
								<li>
									<span>及格需要</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="passCredit"
										ref="passCredit"
										value={this.state.passCredit}
										onChange ={this.handleChange.bind(this,'passCredit')}/>
									<span>学分</span>
									<strong className="passCredit">不能为空</strong>
									<strong className="passCredit">请输入大于0，小于一个学期运动目标里程 * 有效跑步1KM累计分数 + 活动分数上限的数字</strong>
								</li>
								<li>
									<span>优秀需要</span>
									<input type="text"
										disabled={this.state.isDisabled}		
										id="excellentCredit"
										ref="excellentCredit"
										value={this.state.excellentCredit}
										onChange ={this.handleChange.bind(this,'excellentCredit')}/>
									<span>学分</span>
									<strong className="excellentCredit">不能为空</strong>
									<strong className="excellentCredit">优秀学分应该大于及格学分</strong>
									<strong className="excellentCredit">请输入大于及格分的整数</strong>
								</li>								
								<li>
									<span>平均速配有效范围</span>
									<input type="text"
										disabled={this.state.isDisabled}
										className="set_input1"		
										id="smallSpeed"
										ref="smallSpeed"
										value={this.state.smallSpeed}
										onChange ={this.handleChange.bind(this,'smallSpeed')}/>
									<span>-</span>
									<input type="text"
										disabled={this.state.isDisabled}
										className="set_input2"		
										id="bigSpeed"
										ref="bigSpeed"
										value={this.state.bigSpeed}
										onChange ={this.handleChange.bind(this,'bigSpeed')}/>
									<span>分钟</span>
									<strong className="Speed">不能为空</strong>
									<strong className="Speed">平均速配有效范围设置不正确</strong>
									<strong className="Speed">请输入1到50之间的整数,且后框数字大于前框数字</strong>
								</li>
								<li className="buttonLi">
									<button type="submit" className="set_button" >确定</button>
								</li>
							</ul>
							<div className="set_tishi">
								配速：运动一公里所用的时间，以分钟计时长，有效范围建议为4-12分钟
								<p>及格分数范围：大于1，小于里程目标 * 有效跑步1KM累计分数 + 一个学期活动分数上限</p>
								<p>优秀分数：大于及格分数即可，具体数字自行设定</p>
							</div>
						</form>
						<form onSubmit = {this.handleSubmit2}>
						<h4>学分规则设定</h4>
							<ul>
									<li><span>上学期</span>
									<select 
										ref="lastSemesterStartTime"
										value={this.state.lastSemesterStartTime} 
										onChange = {this.handleChange.bind(this,'lastSemesterStartTime')}>
											<option value="2">2月 </option>
											<option value="3">3月 </option>
									</select>
									<span>-</span>
									<select 
										ref="lastSemesterEntTime"
										value={this.state.lastSemesterEntTime} 
										onChange = {this.handleChange.bind(this,'lastSemesterEntTime')}>
											<option value="6">6月 </option>
											<option value="7">7月 </option>
											<option value="8">8月 </option>
									</select>
									<strong className="lastSemester">不能为空</strong>
									<strong className="lastSemester">不能为空</strong>
								</li>
								<li>
									<span>下学期</span>
									<select 
										ref="nextSemesterStartTime"
										value={this.state.nextSemesterStartTime} 
										onChange = {this.handleChange.bind(this,'nextSemesterStartTime')}>
											<option value="9">9月</option>
											<option value="10">10月</option>
									</select>
									<span>-</span>
									<select 
										ref="nextSemesterEndTime"
										value={this.state.nextSemesterEndTime} 
										onChange = {this.handleChange.bind(this,'nextSemesterEndTime')}>
											<option value="12">12月</option>
											<option value="1">1月</option>
									</select>
									<strong className="nextSemester">不能为空</strong>
									<strong className="nextSemester">不能为空</strong>

								</li>
								<li><button type="submit" className="set_button">确定</button></li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		isEdit,
		isFetch,
		content
	} = state.SetRule || {
		isEdit: false,
		isFetch: false,
		content: {}
	};
	return {
		isEdit,
		isFetch,
		content
	}
}
export default connect(mapStateToProps)(SetRule);