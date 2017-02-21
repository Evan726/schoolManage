require("qiniu-js/dist/qiniu")
import React from 'react';
import {
	Link
} from "react-router"

import {
	connect
} from "react-redux";
import {
	fetchClub
} from "../../actions/club";
import {
	addActivity
} from "../../actions/release";
import {
	formatDate
} from '../../libs/formatDate';
import 'antd/lib/date-picker/style/index.less';
import 'antd/lib/time-picker/style/index.less';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import search from '../../static/images/search.png';
import mark from '../../static/images/mark.png';
import Return from '../../static/images/return.png';
const RangePicker = DatePicker.RangePicker;

class AddActivity extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			"title": "",
			"introductionUrl": "",
			"startDate": null,
			"endDate": null,
			"address": "",
			"kilometer": null,
			"peopleNumber": 10000000000,
			"publisher": "",
			"logoImgUrl": "",
			"activityType": "0",
			"memberType": "0",
			"clubId": "",
			"lag": null,
			"lat": null,
			"signEndDate": "2017-01-02 10:00",
			"isSign": "1",
			"isEnroll": "1",
			"isPay": "0",
			"totalFee": 0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.handleMap = this.handleMap.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.disabledStartDate = this.disabledStartDate.bind(this);
		this.disabledEndDate = this.disabledEndDate.bind(this);
	}



	componentWillMount() {
		var json = {
			pageCount: 1,
			rows: 100
		}
		this.props.dispatch(fetchClub(json))
		var nickName = sessionStorage.getItem("nickName") || sessionStorage.getItem("user");
		this.setState({
			publisher: nickName
		});
	}

	componentDidMount() {
		var _this = this;
		var token = '';
		$.ajax({
			url: 'http://59.110.44.57:3003/v0/uptokenApp',
			type: 'POST',
			dataType: "json",
			headers: {
				"Content-Type": "application/json"
			},
			async: false,
			success: function(data) {
				token = data.result.uptoken
			}
		});
		var uploader = Qiniu.uploader({
			runtimes: 'html5,flash,html4', //上传模式,依次退化
			browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
			//uptoken_url: 'http://localhost:3003/v0/uptoken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
			uptoken: token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
			// uptoken_func: function(file) { // 在需要获取uptoken时，该方法会被调用
			// 	// do something
			// 	console.log("1211111111111113-----------------------:", file)

			// 	return {
			// 		"uptoken": "F5FLzpXsEziXvW8GYr4Viaps73wP1lTSduGbtRAe:6Q5hsuPpT8Wny7ysX4_xTNUm3Y8=:eyJzY29wZSI6InNjaG9vbGltZzoyLnBuZyIsImRlYWRsaW5lIjoxNDg0NDY0ODUyfQ=="
			// 	};
			// },
			unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
			// save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
			domain: 'http://ojp3gtlnw.bkt.clouddn.com/', //bucket 域名，下载资源时用到，**必需**
			get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
			container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
			max_file_size: '100mb', //最大文件体积限制
			flash_swf_url: 'js/plupload/Moxie.swf', //引入flash,相对路径
			max_retries: 3, //上传失败最大重试次数
			dragdrop: true, //开启可拖曳上传
			drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
			chunk_size: '4mb', //分块上传时，每片的体积
			auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
			init: {
				'FilesAdded': function(up, files) {
					plupload.each(files, function(file) {
						//console.log("1up:", up);
						//console.log("1files:", files);
						// 文件添加进队列后,处理相关的事情
					});
				},
				'BeforeUpload': function(up, file) {
					// 每个文件上传前,处理相关的事情
					//console.log("2up:", up);
					//console.log("3files:", file);
				},
				'UploadProgress': function(up, file) {
					// 每个文件上传时,处理相关的事情
				},
				'FileUploaded': function(up, file, info) {
					var domain = up.getOption('domain');
					var res = $.parseJSON(info);
					var sourceLink = domain + res.key; //获取上传成功后的文件的Url
					//$("#logoImg").attr("src", sourceLink);
					_this.setState({
						logoImgUrl: sourceLink
					});
				},
				'Error': function(up, err, errTip) {
					//上传出错时,处理相关的事情
				},
				'UploadComplete': function() {
					//队列文件处理完毕后,处理相关的事情
				},
				'Key': function(up, file) {
					// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
					// 该配置必须要在 unique_names: false , save_key: false 时才生效

					var key = "";
					// do something with key here
					return key
				}
			}
		});
		//this.handleMap()
		$("#fan").click(function() {
			$("#map_box").css({
				"z-index": "-1"
			})
		})

	}

	handleMap() {
		$("#map_box").css({
			"z-index": "9999999"
		})
		var _this = this;
		var _height = $(window).height();
		var _width = $(window).width();
		var map_h = _height - 79;
		$("#map_box").find(".map").css({
			height: map_h + "px",
			width: _width + "px",
			background: "#fc0"
		})

		var lng = 108.881414,
			lat = 34.190571;
		if (!this.state.lag || !this.state.lat) {
			_this.setState({
				lag: lng,
				lat: lat,
				address: "陕西省西安市雁塔区中投国际"
			});
		}

		var lag = this.state.lag || lng,
			lat = this.state.lat || lat;
		var map = new AMap.Map('map_container', {
			resizeEnable: true,
		});
		var marker = new AMap.Marker({
			position: [lag, lat], //marker所在的位置
			draggable: true //点是否可以拖拽
		});
		//也可以在创建完成后通过setMap方法执行地图对象
		marker.setMap(map);
		map.setZoom(16);
		map.setCenter([lag, lat]);

		AMap.plugin('AMap.Geocoder', function() {
			var geocoder = new AMap.Geocoder();
			var keyword = document.getElementById('keyword');
			var Search = document.getElementById('Search');
			Search.addEventListener("click", function() {
				//通过地址获取坐标和地址
				geocoder.getLocation(keyword.value, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						//TODO:获得了有效经纬度，可以做一些展示工作
						//比如在获得的经纬度上打上一个Marker
						var result = result.geocodes[0];

						geocoder_CallBack(result.location.lng, result.location.lat, result.formattedAddress);
					} else {
						//获取经纬度失败
						alert(获取经纬度失败)
					}
				});
			})

			marker.on('mouseup', function(e) {
				//拖动覆盖物获取坐标
				getAddress(marker.getPosition().lng, marker.getPosition().lat)
			});
			//通过坐标获取地址
			function getAddress(lng, lat) {
				geocoder.getAddress([lng, lat], function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						geocoder_CallBack(lng, lat, result.regeocode.formattedAddress);
					}
				});
			}
		});

		function geocoder_CallBack(lng, lat, address) {
			map.clearMap();
			marker.setPosition([lng, lat])
			marker.setMap(map);
			map.setZoom(16);
			map.setCenter([lng, lat]);

			_this.setState({
				lag: lng,
				lat: lat,
				address: address
			});
		}
		document.getElementById('biao').addEventListener("click", function() {
			if (!_this.state.lag) {
				alert("你还没有标记活动地址")
				return false
			}
			document.getElementById("map_box").style.zIndex = "-1";
		})
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.addOk !== nextProps.addOk) {
			this.context.router.push('/activity/1')
		};
		//console.log("this.props.addError", this.props.addError)
		//console.log("nextProps.addError", nextProps.addError)
		if (this.props.addError !== nextProps.addError) {
			if (nextProps.addError) {
				alert(nextProps.addError)
			}
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
		var a,b,c,d,e,f,g,h,i,j;
		if (!this.state.logoImgUrl) {
			//活动LOGO为空
			$(".Logo").css("display","inline-block")
			$("#container").css("border-color","#f40")
			a = false;
		}else{
			$(".Logo").css("display","none")
			$("#container").css("border-color","#cdcbcc")
			a = true;
		}
		if (!this.state.title) {
			//活动主题为空
			$(".ActivityTheme").css("display","inline-block")
			$("#title").css("border-color","#f40")
			title
			b = false;	
		}else{
			$(".ActivityTheme").css("display","none")
			$("#title").css("border-color","#cdcbcc")
			b = true;
		}
		var op = $("#activityType option:selected");
		if (op.html() == "选择活动类型") {
			$(".activityType").css("display","inline-block");
			$("#activityType").css("border-color","#f40");
		}else{
			$(".activityType").css("display","none");
			$("#activityType").css("border-color","#cdcbcc");
		}
		
		if (!this.state.kilometer) {
			//活动里程为空
			$(".noKilometer").css("display","inline-block")
			$("#kilometer").css("border-color","#f40")
			c = false;
		}else{
			$(".noKilometer").css("display","none")
			$("#kilometer").css("border-color","#cdcbcc")
			c = true;
		}
		if($(".noKilometer").css("display") == "none"){
			if (!(this.state.kilometer > 0)) {
			//里程为数字
				$(".numKilometer").css("display","inline-block")
				$("#kilometer").css("border-color","#f40")
				d = false;
			}else{
				$(".numKilometer").css("display","none")
				$("#kilometer").css("border-color","#cdcbcc")
				d = true;
			}
		}
		if (!this.state.startDate) {
			//开始时间不能为空
			$(".startTime").css("display","inline-block")
			$(".ant-input").eq(0).css("border-color","#f40")
			e = false;
		}else{
			$(".startTime").css("display","none")
			$(".ant-input").eq(0).css("border-color","#cdcbcc")
			e = true;
		}
		if (!this.state.endDate) {
			//结束时间不能为空
			$(".endTime").css("display","inline-block")
			$(".ant-input").eq(1).css("border-color","#f40")
			f = false;
		}else{
			$(".endTime").css("display","none")
			$(".ant-input").eq(1).css("border-color","#cdcbcc")
			f = true;
		}
		if (!this.state.address) {
			//活动地址不能为空
			$(".address").css("display","inline-block")
			$("#address").css("border-color","#f40")
			g = false;
		}else{
			$(".address").css("display","none")
			$("#address").css("border-color","#cdcbcc")
			g = true;
		}
		if($(".address").css("display") == "none"){
			//活动经纬度不能为空
			if (!this.state.lag || !this.state.lat) {
				$(".longitude").css("display","inline-block")
				$("#address").css("border-color","#f40")
				h = false;
			}else{
				$(".longitude").css("display","none")
				$("#address").css("border-color","#cdcbcc")
				h = true;
			}
		}
		var clubName = $("#selectClub option:selected");
		if (clubName.val() == 0) {
			$(".choiceClub").css("display","inline-block")
			$("#selectClub").css("border-color","#f40")
			i = false;
		}else{
			$(".choiceClub").css("display","none")
			$("#selectClub").css("border-color","#cdcbcc")
			i = true;
		}
		// if (this.state.startDate.getTime() > this.state.endDate.getTime()) {
		// 	alert("结束时间不能小于开始时间");
		// 	return false
		// }
		if(a&&b&&c&&d&&e&&f&&g&&h&&i){
			return true;
		}else{
			return false;
		}
		this.props.dispatch(addActivity(this.state))
	}

	onDateChange(name, value) {
		if (name == "startDate") {
			if (new Date(value) < new Date()) {
				var value = new Date()
			}
		} else if (name == "endDate") {
			if (new Date(value) < new Date(this.state.startDate)) {
				var value = new Date(this.state.startDate)
			}
		}
		this.setState({
			[name]: value
		});
	}
	disabledStartDate(startDate) {
		if (!startDate || !this.state.endDate) {
			return false;
		}
		return startDate.getTime() <= (Date.now() - 86400000) && startDate.getTime() >= this.state.endDate.getTime();
	}
	disabledEndDate(endDate) {
		if (!endDate || !this.state.startDate) {
			return false;
		}
		return endDate.getTime() <= (this.state.startDate.getTime() - 43200000);
	}
	render() {
		var optionArr = [];
		const {
			dataList
		} = this.props;
		for (var i = 0; i < dataList.length; i++) {
			optionArr.push(<option value={dataList[i].id} key={i}>{dataList[i].name}</option>)
		}

		return (
			<div className="student_center">

				<p>当前位置：<span><Link to={"/activity"}>活动管理</Link> > </span><span className="span2">发布活动</span><Link to={"/activity"}><span className="fanhui">返回</span></Link></p>

				<div className="onestudent_list">
					<form onSubmit={this.submitHandler}>
						<table>
							<colgroup>
								<col width = "180"/>
								<col width = "＊"/>
							</colgroup>
							<tbody>
							    <tr>
							      <td className="createactive_table1"><i>*</i>活动LOGO</td>
							      <td>
									{
								      	this.state.logoImgUrl && <span className="createactive_span">
								      		<img src={this.state.logoImgUrl} className="images" alt={this.state.title} />
								      	</span>
								      }
							      	
							      	<span className="createactive_span" id="container">
							      		<span id="pickfiles" >+</span>
							      	</span>
							      	<span className="createactive_span1">图片尺寸为720*420，小于2M，格式为git,jpg,png</span>
							      	<strong className="Logo">请上传活动LOGO</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>活动主题</td>
							      <td>
									<input type="text"	
										id="title"
										ref="title"
										value={this.state.title}
										onChange ={this.handleChange.bind(this,'title')}
										placeholder="输入活动主题"/>
									<strong className="ActivityTheme">活动主题不能为空</strong>
							    </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>活动类型</td>
							      <td>
										<select
											id="activityType" 
											ref="activityType"
											value={this.state.activityType} 
											onChange = {this.handleChange.bind(this,'activityType')}>
												<option className="activity">选择活动类型</option>
												<option value="0"  className="activity">跑步</option>
												<option value="1"  className="activity">其他</option>
										</select>
										<strong className="activityType">活动类型不能为空</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>里程</td>
							      <td>
									<input type="text"	
										id="kilometer"
										ref="kilometer"
										value={this.state.kilometer}
										onChange ={this.handleChange.bind(this,'kilometer')}
										placeholder="输入里程"/> km
									<strong className="noKilometer">里程不能为空</strong>
									<strong className="numKilometer">里程为数字</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>开始时间</td>
							      <td>
									<DatePicker
										id="startAddress"
										disabledDate={this.disabledStartDate}
										value={this.state.startDate}
										placeholder="选择活动开始时间"
										onChange={this.onDateChange.bind(this, "startDate")}
										toggleOpen={this.handleStartToggle}
										showTime  format="yyyy/MM/dd HH:mm:ss"
									/>
									<strong className="startTime">开始时间不能为空</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>结束时间</td>
							      <td>
									<DatePicker
										disabledDate={this.disabledEndDate}
										value={this.state.endDate}
										placeholder="选择活动结束时间"
										onChange={this.onDateChange.bind(this, "endDate")}
										open={this.state.endOpen}
										toggleOpen={this.handleEndToggle}
										showTime format="yyyy/MM/dd HH:mm:ss"
									/>
									<strong className="endTime">结束时间不能为空</strong>
								</td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>活动地址</td>
							      <td>
									<input type="text"
										id="address"
										ref="address"
										value={this.state.address}
										onChange ={this.handleChange.bind(this,'address')}
										placeholder="地址"/>
									<input type="text"	
										id="lat"
										ref="lat"
										value={this.state.lat}
										disabled
										placeholder="经度"/>
									<input type="text"	
										id="lag"
										ref="lag"
										value={this.state.lag}
										disabled
										placeholder="纬度"/> <span onClick={this.handleMap}>调用地图</span>
									<strong className="address">活动地址不能为空</strong>		
									<strong className="longitude">经纬度不能为空</strong>		
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>参与范围</td>
							      <td>
									<input type="radio"
											ref="memberType"
											value="0"
											checked={this.state.memberType==0}
											onChange = {this.handleChange.bind(this,'memberType')}/>本俱乐部
									<input type="radio"
											ref="memberType"
											value="1"
											checked={this.state.memberType==1}
											onChange = {this.handleChange.bind(this,'memberType')}/>校内
									<input type="radio"
											ref="memberType"
											value="2"
											checked={this.state.memberType==2}
											onChange = {this.handleChange.bind(this,'memberType')}/>公开
							      </td>
							    </tr>
							     <tr>
							      <td className="createactive_table1">活动简介</td>
							      <td>
									<input type="text"	
										id="introductionUrl"
										ref="introductionUrl"
										value={this.state.introductionUrl}
										onChange ={this.handleChange.bind(this,'introductionUrl')}
										placeholder="输入活动简介网址"/>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>所属俱乐部</td>
							      <td>
										<select 
											ref="clubId"
											id="selectClub"
											value={this.state.clubId} 
											onChange = {this.handleChange.bind(this,'clubId')}>
												<option value="0">选择俱乐部</option>
										    	{optionArr}
										</select>
										<strong className="choiceClub">请选择俱乐部</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>负责人</td>
							      <td>
									<span>{this.state.publisher}</span>
							      </td>
							    </tr>
						    </tbody>
						    <tfoot>
						    	<tr>
									<td colSpan="2" className="add_button">
										<button type="submit">发布</button>
						    		</td>
						    	</tr>
						    </tfoot>
						</table>
						
					</form>
					<p className="prompt">活动创建后不可编辑</p>
				</div>
				<div id="map_box" className="map_box">
					<div className="mapForm">
						<p className="return">
					    	<img src={Return} className="returnlogo"/> 
					    	<input id="fan" type="button" value="返回" />  
					    </p>
					    <p className="searchP">  
					        <input id="keyword" type="text" size="30"/>
					        <img src={search}  className="searchlogo"/> 
					        <input id="Search" type="button" value="搜索" />  
					    </p> 
					    <p className="okMark">
					    	<img src={mark} className="marklogo"/> 
					    	<input id="biao" type="button" value="确定" />  
					    </p> 
					    <p className="coordinate"> 
					        <i>经度：{this.state.lag}</i>  
					    	<i>纬度：{this.state.lat}</i> 
					        <i>地址：{this.state.address}</i>  
					    </p>
					</div>
					<div className="map" id="map_container"></div>
					
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {

	const {
		content
	} = state.getAdminInfo;

	const {
		lists,
		ids
	} = state.listpage.ClubList.club || {
		lists: {},
		ids: {}
	};
	var dataList = [];
	var arr = ids[1]
	if (!!arr) {
		dataList = arr.map(id => lists[id])
	}

	const {
		isFetching,
		addOk,
		editok,
		addError
	} = state.listpage.listActivity.activity || {
		isFetching: false,
		addOk: false,
		editok: false,
		addError: "",
	};

	return {
		isFetching,
		addOk,
		editok,
		content,
		addError,
		dataList
	}
}

export default connect(mapStateToProps)(AddActivity)