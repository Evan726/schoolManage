// require("qiniu-js/dist/qiniu")
import React from 'react';
import {
	Link
} from "react-router"

import {
	connect
} from "react-redux";
import {
	urlState
} from "../../actions/index";
import {
	fetchAdminList
} from "../../actions/setup";
import {
	addClub
} from "../../actions/release";
import {
	editClub,
} from "../../actions/edit";
import {
	fetchClubInfo
} from "../../actions/club";

import Tab from '../../components/SetUp/Tab';
// import qiniu from 'qiniu';
class AddClub extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	constructor(props) {
		super(props);
		this.state = {
			"adminId": "",
			"clubNo": "",
			"name": "",
			"content": "",
			"logo": ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.removeHandel = this.removeHandel.bind(this);
	}
	componentWillMount() {
		var json = {
			pageCount: 1,
			rows: 100
		}
		this.props.dispatch(fetchAdminList(json));
		if (this.props.params.id) {
			this.props.dispatch(urlState({
				id: this.props.params.id
			}, "cInfo"))
		}
		if (this.props.clubId) {
			this.props.dispatch(fetchClubInfo("clubInfo", this.props.clubId))
		}

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
						logo: sourceLink
					});
					//console.log("file:", file);
					//console.log("info:", info);
					//console.log("up:", up);
					// 每个文件上传成功后,处理相关的事情
					// 其中 info 是文件上传成功后，服务端返回的json，形式如
					// {
					//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
					//    "key": "gogopher.jpg"
					//  }
					// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

					// var domain = up.getOption('domain');
					// var res = parseJSON(info);
					// var sourceLink = domain + res.key; 获取上传成功后的文件的Url
				},
				'Error': function(up, err, errTip) {
					//console.log("4err:", err);
					//console.log("4errTip:", errTip);
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

	}
	componentWillReceiveProps(nextProps) {
		if (this.props.params.id) {
			if (nextProps.clubId !== this.props.clubId) {
				this.props.dispatch(fetchClubInfo("clubInfo", nextProps.clubId))
			}
			if (JSON.stringify(nextProps.content) !== JSON.stringify(this.props.content)) {
				var con = nextProps.content;
				console.log("3333con:", con)
				var adminId = "";
				if (con.adminId) {
					adminId = con.adminId.id
				}
				this.setState({
					"clubId": con.id,
					"adminId": adminId,
					"clubNo": con.clubNo,
					"name": con.name || "",
					"content": con.content || "",
					"logo": con.logo || ""
				})
			}
			if (this.props.editok !== nextProps.editok) {
				this.context.router.push('/setup/setclub')
			};
			return false
		}

		if (this.props.addOk !== nextProps.addOk) {
			this.context.router.push('/setup/setclub/1')
		};


	}


	handleChange(name, event) {
		var newState = {};
		var target = event.target;
		newState[name] = $.trim(target.value);
		this.setState(newState);
	}

	submitHandler(e) {
		var a,b,c;
		if(!this.state.name){
			$(".name").css("display","inline-block");
			a = false;
		}else{
			$(".name").css("display","none");
			a = true;
		}
		if(!this.state.clubNo){
			$(".clubNo").css("display","inline-block");
			b = false;
		}else{
			$(".clubNo").css("display","none");
			b = true;
		}
		if(!this.state.adminId){
			$(".adminId").css("display","inline-block");
			c = false;
		}else{
			$(".adminId").css("display","none"); 
			c = true;
		}
		if(!(a&&b&&c)){
			return false;
		}

		if (!this.state.clubId) {
			this.props.dispatch(addClub(this.state))
		} else {
			this.props.dispatch(editClub(this.state))
		}

	}
	removeHandel() {
		this.setState({
			"adminId": "",
			"clubNo": "",
			"name": "",
			"content": "",
			"logo": ""
		});
		if (this.props.params.typepage == "clubinfo") {
			this.context.router.push('/club/clubInfo/' + this.props.params.id)
			location.reload()
		} else {
			this.context.router.push('/setup/setclub')
		}
		//this.context.router.push('/setup/setclub/1')
		//<Link to={this.props.group==1?"setup/setclub":"club/clubInfo/"+isDisabled}>
	}
	render() {
	

		//console.log(this.state);
		var isDisabled = this.props.params.id || "";
		var optionArr = [];
		const {
			dataList
		} = this.props;
		console.log(dataList)
		for (var i = 0; i < dataList.length; i++) {
			optionArr.push(<option value={dataList[i].id} key={i}>{dataList[i].nickName}</option>)
		}

		//this.handleChange.bind(this,'logoImg'),
		return (
			<div className="student_center">
				<p>当前位置：
					<span>
						<Link to={"setup/setclub"}>俱乐部设置</Link> > 
					</span>
					{!this.props.params.id?<span className="span2">创建俱乐部</span>:<span className="span2">编辑俱乐部</span>}
					
				</p>
				<Tab active={4}/>
				<div className="onestudent_list">
					<div className="setperson_title">
						<div>
							<span onClick={this.removeHandel}>取消</span>
						</div>
					</div>
					<div className="">
						<form onSubmit = {this.submitHandler}>
							<table>
								<colgroup>
									<col width = "180"/>
									<col width = "＊"/>
								</colgroup>
								<tbody>
							    <tr>
							      <td className="createactive_table1">俱乐部LOGO</td>
							      <td>
								      {
								      	this.state.logo && <span className="createactive_span">
								      		<img src={this.state.logo} className="images" alt={this.state.title} />
								      	</span>
								      }
							      	
							      	<span className="createactive_span" id="container">
							      		<span id="pickfiles" >+</span>
							      	</span>
							      	<span className="createactive_span1">图片尺寸为720*420，小于2M，格式为git,jpg,png</span>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>名称</td>
							      <td>
									<input type="text"
										disabled={!!isDisabled}		
										id="name"
										ref="name"
										value={this.state.name}
										onChange ={this.handleChange.bind(this,'name')}
										placeholder="输入名称"/>
										<strong className="name">名称不能为空</strong>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>编号</td>
							      <td>
									<input type="text"
										disabled={!!isDisabled}	
										id="clubNo"
										ref="clubNo"
										value={this.state.clubNo}
										onChange ={this.handleChange.bind(this,'clubNo')}
										placeholder="输入编号"/>
										<strong className="clubNo">编号不能为空</strong>
							      </td>
							    </tr>
							     <tr>
							      <td className="createactive_table1">简介</td>
							      <td>
									<textarea
										id="content"
										ref="content"
										value={this.state.content}
										onChange ={this.handleChange.bind(this,'content')}
										placeholder="输入简介"/>
							      </td>
							    </tr>
							    <tr>
							      <td className="createactive_table1"><i>*</i>负责人</td>
							      <td>
										<select 
											ref="adminId"
											value={this.state.adminId} 
											onChange = {this.handleChange.bind(this,'adminId')}>
												<option value="0">选择管理员</option>
										    	{optionArr}
										</select>
										<strong className="adminId">请选择管理员</strong>
							      </td>
							    </tr>
							    </tbody>
							    <tfoot>
							    	<tr>
							    		<td className="add_button" colSpan="2">
							    			<button type="submit">确定</button>
							    		</td>
							    	</tr>
							    </tfoot>
							</table>
						</form>
					</div>
				</div>	
			</div>
		);
	}
}

function mapStateToProps(state) {

	const {
		group
	} = state.userState.group

	const clubId = state.urlObj.cInfo ? state.urlObj.cInfo.id : "";
	const {
		isFetch,
		content
	} = state.details.clubInfo[clubId] || {
		isFetch: false,
		content: ""
	};
	const {
		isFetching,
		addOk,
		editok,
		addError
	} = state.listpage.listSetClub.clublist || {
		isFetching: false,
		addOk: false,
		editok: false,
		addError: "",
	};
	const {
		lists,
		ids
	} = state.listpage.listAdmin.admin || {
		lists: {},
		ids: {}
	};

	var dataList = [];
	//console.log("123---:", ids)
	if (ids) {
		var arr = ids[1]
		if (!!arr) {
			dataList = arr.map(id => lists[id])
		}
	}


	return {
		group,
		clubId,
		isFetching,
		addOk,
		editok,
		content,
		addError,
		dataList,
		isFetch,
		content
	}
}

export default connect(mapStateToProps)(AddClub)