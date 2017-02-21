import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect
} from "react-redux";

import {
	signOut
} from "../actions/index.js";

import Sidebar from '../components/Common/Sidebar.js';
import Header from '../components/Common/Header.js';
import navdata from '../api/navdata.js';


class App extends Component {

	constructor(props) {
		super(props);
		this.onClickHendle = this.onClickHendle.bind(this)
	}

	componentWillMount() {
		const {
			status
		} = this.props;
		if (!status) {
			window.location.href = "/"
			return false
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.status) {
			window.location.href = "/"
			return false
		}
	}

	onClickHendle() {
		this.props.dispatch(signOut())
	}

	render() {
		const {
			user,
			nickName,
			userId,
			status,
			newDate,
			children
		} = this.props
		return (
			<div className="rukou_box">
				<Sidebar items={navdata}/>
				<div className="student_right">
					<Header status={status} newDate={newDate} username={user} userId={userId} nickName={nickName} onClickHendle={this.onClickHendle}/>
					{children}
				</div>
			</div>
		);
	}
}
App.PropTypes = {
	status: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

	const {
		user,
		nickName,
		userId,
		status,
		newDate
	} = state.userState

	return {
		user,
		newDate,
		nickName,
		userId,
		status
	}
}

export default connect(mapStateToProps)(App)