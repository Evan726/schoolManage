import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from "react-redux";
import {
	fetchUserGrade
} from "../../actions/setup";
import Tab from '../../components/SetUp/Tab';
class UserLevel extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.props.dispatch(fetchUserGrade())
	}
	render() {
		const {
			isFetch,
			content
		} = this.props;
		return (
			<div className="student_center">
				<Tab active={2}/>
				<div className="info_list">
					<div className="setperson_title">
						<div>
							<Link to={"setup/userleveledit"}><span>编辑</span></Link>
						</div>
					</div>
					<div className="user_list">
						{!!content&&<table>
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
						      <td>{content.title1||""}</td>
						      <td>小于等于{content.kilometer1||""}</td>
						    </tr>
						    <tr>
						      <td>2</td>
						      <td>{content.title2||""}</td>
						      <td>小于等于{content.kilometer2||""}</td>
						    </tr>
						    <tr>
						      <td>3</td>
						     	<td>{content.title3||""}</td>
						      <td>小于等于{content.kilometer3||""}</td>
						    </tr>
						    <tr>
						      <td>4</td>
						      <td>{content.title4||""}</td>
						      <td>小于等于{content.kilometer4||""}</td>
						    </tr>
						    <tr>
						      <td>5</td>
						      <td>{content.title5||""}</td>
						      <td>小于等于{content.kilometer5||""}</td>
						    </tr>
						    <tr>
						      <td>6</td>
						      <td>{content.title6||""}</td>
						      <td>大于{content.kilometer5||""}</td>
						    </tr>
						    </tbody>
						 </table>
						}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {
		isFetch,
		content
	} = state.UserGrade || {
		isFetch: false,
		content: {}
	};
	return {
		isFetch,
		content
	}
}
export default connect(mapStateToProps)(UserLevel);