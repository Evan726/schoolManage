import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from "react-redux";
import {
	fetchUserGrade,
	fetchUserLevelEdit
} from "../../actions/setup";
import Tab from '../../components/SetUp/Tab';
class UserLevelEdit extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			"kilometer1": 0,
			"title1": "",
			"kilometer2": 0,
			"title2": "",
			"kilometer3": 0,
			"title3": "",
			"kilometer4": 0,
			"title4": "",
			"kilometer5": 0,
			"title5": "",
			"title6": ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	componentWillMount() {
		this.props.dispatch(fetchUserGrade())
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.content !== nextProps.content) {
			this.setState({
				"kilometer1": nextProps.content.kilometer1,
				"title1": nextProps.content.title1,
				"kilometer2": nextProps.content.kilometer2,
				"title2": nextProps.content.title2,
				"kilometer3": nextProps.content.kilometer3,
				"title3": nextProps.content.title3,
				"kilometer4": nextProps.content.kilometer4,
				"title4": nextProps.content.title4,
				"kilometer5": nextProps.content.kilometer5,
				"title5": nextProps.content.title5,
				"title6": nextProps.content.title6
			});
		}
		if (this.props.isEdit !== nextProps.isEdit) {
			this.context.router.push('/setup/userlevel');
		}
	}
	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}
	submitHandler(e) {
		e.preventDefault();
		var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o;
		//等级名称不能为空
		if(!this.state.title1){
			$(".title1").css("display","inline-block")
			$("#title1").css("border-color","#f40")
			a = false;
		}else{
			$(".title1").css("display","none")
			$("#title1").css("border-color","#cdcbcc")
			a = true;
		}
		if(!this.state.title2){
			$(".title2").css("display","inline-block")
			$("#title2").css("border-color","#f40")
			b = false;
		}else{
			$(".title2").css("display","none")
			$("#title2").css("border-color","#cdcbcc")
			b = true;
		}
		if(!this.state.title3){
			$(".title3").css("display","inline-block")
			$("#title3").css("border-color","#f40")
			c = false;
		}else{
			$(".title3").css("display","none")
			$("#title3").css("border-color","#cdcbcc")
			c = true;
		}
		if(!this.state.title4){
			$(".title4").css("display","inline-block")
			$("#title4").css("border-color","#f40")
			d = false;
		}else{
			$(".title4").css("display","none")
			$("#title4").css("border-color","#cdcbcc")
			d = true;
		}
		if(!this.state.title5){
			$(".title5").css("display","inline-block")
			$("#title5").css("border-color","#f40")
			e = false;
		}else{
			$(".title5").css("display","none")
			$("#title5").css("border-color","#cdcbcc")
			e = true;
		}
		if(!this.state.title6){
			$(".title6").css("display","inline-block")
			$("#title6").css("border-color","#f40")
			f = false;
		}else{
			$(".title6").css("display","none")
			$("#title6").css("border-color","#cdcbcc")
			f = true;
		}
		//里程必须为数字
		if(!(this.state.kilometer1 > 0)){
			$(".kilometer1").eq(0).css("display","inline-block")
			$("#kilometer1").css("border-color","#f40")
			g = false;
		}else{
			$(".kilometer1").css("display","none")
			$("#kilometer1").css("border-color","#cdcbcc")
			g = true;
		}
		if(!(this.state.kilometer2 > 0)){
			$(".kilometer2").eq(0).css("display","inline-block")
			$("#kilometer2").css("border-color","#f40")
			h = false;
		}else{
			$(".kilometer2").eq(0).css("display","none")
			$("#kilometer2").css("border-color","#cdcbcc")
			h = true;
		}
		if(!(this.state.kilometer3 > 0)){
			$(".kilometer3").eq(0).css("display","inline-block")
			$("#kilometer3").css("border-color","#f40")
			i = false;
		}else{
			$(".kilometer3").eq(0).css("display","none")
			$("#kilometer3").css("border-color","#cdcbcc")
			i = true;
		}
		if(!(this.state.kilometer4 > 0)){
			$(".kilometer4").eq(0).css("display","inline-block")
			$("#kilometer4").css("border-color","#f40")
			j = false;
		}else{
			$(".kilometer4").eq(0).css("display","none")
			$("#kilometer4").css("border-color","#cdcbcc")
			j = true;
		}
		if(!(this.state.kilometer5 > 0)){
			$(".kilometer5").eq(0).css("display","inline-block")
			$("#kilometer5").css("border-color","#f40")
			k = false;
		}else{
			$(".kilometer5").eq(0).css("display","none")
			$("#kilometer5").css("border-color","#cdcbcc")
			k = true;
		}
		if(!(this.state.kilometer1 < this.state.kilometer2)){
			$(".kilometer2").eq(1).css("display","inline-block")
			$("#kilometer2").css("border-color","#f40")
			l = false;
		}else{
			$(".kilometer2").eq(1).css("display","none")
			$("#kilometer2").css("border-color","#cdcbcc")
			l = true;
		}
		if(!(this.state.kilometer2 < this.state.kilometer3)){
			$(".kilometer3").eq(1).css("display","inline-block")
			$("#kilometer3").css("border-color","#f40")
			m = false;
		}else{
			$(".kilometer3").eq(1).css("display","none")
			$("#kilometer3").css("border-color","#cdcbcc")
			m = true;
		}
		if(!(this.state.kilometer3 < this.state.kilometer4)){
			$(".kilometer4").eq(1).css("display","inline-block")
			$("#kilometer4").css("border-color","#f40")
			n = false;
		}else{
			$(".kilometer4").eq(1).css("display","none")
			$("#kilometer4").css("border-color","#cdcbcc")
			n = true;
		}
		if(!(this.state.kilometer4 < this.state.kilometer5)){
			$(".kilometer5").eq(1).css("display","inline-block")
			$("#kilometer5").css("border-color","#f40")
			o = false;
		}else{
			$(".kilometer5").eq(1).css("display","none")
			$("#kilometer5").css("border-color","#cdcbcc")
			o = true;
		}
		if(!(a&&b&&c&&d&&e&&f&&g&&h&&i&&j&&k&&l&&m&&n&&o)){
			return false;
		}
		this.props.dispatch(fetchUserLevelEdit(this.state))
	}
	render() {
		return (
			<div className="student_center">
				<Tab active={2}/>
				<div className="info_list">
					<div className="setperson_title">
						<div>
							<Link to={"setup/userlevel"}><span>取消</span></Link>
						</div>
					</div>
					<div className="user_list">
						<form onSubmit = {this.submitHandler}>
							<table className="userchange_table">
								<colgroup>
									<col width = "100" />
									<col width = "100" />
									<col width = "100" />
								</colgroup>
								<thead>
								    <tr className="table_first">
								      <th>序号</th>
								      <th>等级名称</th>
								      <th>运动里程(km)</th>
								    </tr>
							    </thead>
							    <tbody>
							    <tr>
							      <td>1</td>
							      <td>
							      	<input type="text"	
										id="title1"
										ref="title1"
										value={this.state.title1}
										onChange ={this.handleChange.bind(this,'title1')}/>
										<strong className="title1">不能为空</strong>
							      </td>
							      <td>
									小于等于<input type="text"	
										id="kilometer1"
										ref="kilometer1"
										value={this.state.kilometer1}
										onChange ={this.handleChange.bind(this,'kilometer1')}/>
										<strong className="kilometer1">请输入正确的数字</strong>
							      </td>
							    </tr>
							    <tr>
							      <td>2</td>
								      <td>
							      	<input type="text"	
										id="title2"
										ref="title2"
										value={this.state.title2}
										onChange ={this.handleChange.bind(this,'title2')}/>
										<strong className="title2">不能为空</strong>
							      </td>
							      <td>
									小于等于<input type="text"	
										id="kilometer2"
										ref="kilometer2"
										value={this.state.kilometer2}
										onChange ={this.handleChange.bind(this,'kilometer2')}/>
										<strong className="kilometer2">请输入正确的数字</strong>
										<strong className="kilometer2">下一等级必须大于上一等级</strong>
							      </td>
							    </tr>
							    <tr>
							      <td>3</td>
							    <td>
							      	<input type="text"	
										id="title3"
										ref="title3"
										value={this.state.title3}
										onChange ={this.handleChange.bind(this,'title3')}/>
										<strong className="title3">不能为空</strong>
							      </td>
							      <td>
									小于等于<input type="text"	
										id="kilometer3"
										ref="kilometer3"
										value={this.state.kilometer3}
										onChange ={this.handleChange.bind(this,'kilometer3')}/>
										<strong className="kilometer3">请输入正确的数字</strong>
										<strong className="kilometer3">下一等级必须大于上一等级</strong>
							      </td>
							    </tr>
							    <tr>
							      <td>4</td>
							      <td>
							      	<input type="text"	
										id="title4"
										ref="title4"
										value={this.state.title4}
										onChange ={this.handleChange.bind(this,'title4')}/>
										<strong className="title4">不能为空</strong>
							      </td>
							      <td>
									小于等于<input type="text"	
										id="kilometer4"
										ref="kilometer4"
										value={this.state.kilometer4}
										onChange ={this.handleChange.bind(this,'kilometer4')}/>
										<strong className="kilometer4">请输入正确的数字</strong>
										<strong className="kilometer4">下一等级必须大于上一等级</strong>
							      </td>
							    </tr>
							    <tr>
							      <td>5</td>
							      <td>
							      	<input type="text"	
										id="title5"
										ref="title5"
										value={this.state.title5}
										onChange ={this.handleChange.bind(this,'title5')}/>
										<strong className="title5">不能为空</strong>
							      </td>
							      <td>
									小于等于<input type="text"	
										id="kilometer5"
										ref="kilometer5"
										value={this.state.kilometer5}
										onChange ={this.handleChange.bind(this,'kilometer5')}/>
										<strong className="kilometer5">请输入正确的数字</strong>
										<strong className="kilometer5">下一等级必须大于上一等级</strong>
							      </td>
							    </tr>
							    <tr>
							      <td>6</td>
							      <td>
									<input type="text"	
										id="title6"
										ref="title6"
										value={this.state.title6}
										onChange ={this.handleChange.bind(this,'title6')}/>
										<strong className="title6">不能为空</strong>
							      </td>
							      <td>
									大　　于<input type="text" value={this.state.kilometer5} disabled/>
							      </td>
							    </tr>
							    </tbody>
							</table>
							<div className="userchange_button">
						    	<button type="submit">确定</button>
						    </div>
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
	} = state.UserGrade || {
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
export default connect(mapStateToProps)(UserLevelEdit);