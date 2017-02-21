import React from 'react';
import {
	Link
} from "react-router";
import ClubChangeHeader from '../../components/Club/ClubChangeHeader.js'
import ClubChangeList from '../../components/Club/ClubChangeList.js'

export default class EditClub extends React.Component{
	render () {
		return (
			<div className="student_center">
				<p>当前位置：<span><Link to={"/club"}>俱乐部管理 ></Link> </span><span className="span2">详情</span></p>
				<ClubChangeHeader />
				<div className="onestudent_list">
					<ClubChangeList />
				</div>
			</div>
		);
	}
}
