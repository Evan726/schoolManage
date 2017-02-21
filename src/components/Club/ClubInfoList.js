import React from 'react';
import ClubLogo from '../../static/images/clubLogo.png'
export default class ClubInfoList extends React.Component{
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			headerImg: ""
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.content.logo !== this.props.content.logo) {
			this.setState({
				headerImg: nextProps.content.logo
			})
		}
	}

	handleImageErrored() {
		this.setState({
			headerImg: ClubLogo,
		});
	}

	render () {
		const {
			content
		} = this.props;
		var adminId = '';
		if(content.adminId){
			adminId= content.adminId.nickName
		}else{
			adminId = ""
		}

		return (
			<div>
				<table>
					<colgroup>
						<col width = "180"/>
						<col width = "＊"/>
					</colgroup>
					<tbody>
					    <tr>
					      <td className="createactive_table1">俱乐部LOGO</td>
					      <td>
					      	<div className="activeinfo_add">
								<span ref="s">
									<img 
										src={this.state.headerImg}
										onError={this.handleImageErrored.bind(this)}
									/>
								</span>
							</div>
					      </td>
					    </tr>
		 			    <tr>
					      <td className="createactive_table1">名称</td>
					      <td>
							<span>{content.name}</span>
					      </td>
					    </tr>
					    <tr>
					      <td className="createactive_table1">编号</td>
					      <td>
							<span>{content.clubNo}</span>
					      </td>
					    </tr>
					     <tr>
					      <td className="createactive_table1">简介</td>
					      <td>
							<span>{content.content}</span>
					      </td>
					    </tr>
					    <tr>
					      <td className="createactive_table1">负责人</td>
					      <td>
							<span>{adminId}</span>
					      </td>
					    </tr>
				    </tbody>
				</table>
			</div>
		);
	}
}
