require('core-js/fn/object/assign');
import {
	combineReducers
} from 'redux';

import {
	userState,
	editPassword
} from "./login";
import {
	paginate
} from './paginate'

import {
	detaileFn
} from './detaileFn'


import * as TYPE from "../constants/actionType";
import UserGrade from "./UserGrade";
import SetRule from "./SetRule";

import {
	release
} from './release.js'

//保存url状态
function urlObj(state = {}, action) {
	switch (action.type) {
		case TYPE.INSERT_URL:
			return Object.assign({}, state, {
				[action.pageName]: action.obj
			})
			break;
		default:
			return state;
			break;
	}
}

function pageActive(state = {}, action) {
	switch (action.type) {
		case TYPE.PAGE_ACTIVE:
			return Object.assign({}, state, {
				[action.pageName]: Number(action.page)
			})
			break;
		default:
			return state;
			break;
	}
}



//分页列表
const listpage = combineReducers({
	listStudent: paginate({
		mapActionToKey: action => action.student,
		types: [TYPE.STUDENT_REQUEST, TYPE.STUDENT_SUCCESS, TYPE.STUDENT_FAILURE]
	}),
	listSearchStudent: paginate({
		mapActionToKey: action => action.student,
		mapActionToId: action => action.id,
		types: [TYPE.STUDENT_SEARCH_REQUEST, TYPE.STUDENT_SEARCH_SUCCESS, TYPE.STUDENT_SEARCH_FAILURE]
	}),
	listMileageStudent: paginate({
		mapActionToKey: action => action.mileage,
		mapActionToId: action => action.id,
		types: [TYPE.MILEAGE_REQUEST, TYPE.MILEAGE_SUCCESS, TYPE.MILEAGE_FAILURE]
	}),
	listStudentActivity: paginate({
		mapActionToKey: action => action.studentActivity,
		mapActionToId: action => action.id,
		types: [TYPE.STUDENT_ACTIVITY_REQUEST, TYPE.STUDENT_ACTIVITY_SUCCESS, TYPE.STUDENT_ACTIVITY_FAILURE]
	}),
	listAdmin: paginate({
		mapActionToKey: action => action.admin,
		types: [TYPE.ADMIN_REQUEST, TYPE.ADMIN_SUCCESS, TYPE.ADMIN_FAILURE]
	}),

	listSetClub: paginate({
		mapActionToKey: action => action.clublist,
		mapActionName: "listSetClub",
		types: [TYPE.SETCLUBLIST_REQUEST, TYPE.SETCLUBLIST_SUCCESS, TYPE.SETCLUBLIST_FAILURE]
	}),

	ClubList: paginate({
		mapActionToKey: action => action.club,
		types: [TYPE.CLUBLIST_REQUEST, TYPE.CLUBLIST_SUCCESS, TYPE.CLUBLIST_FAILURE]
	}),
	listSearchClub: paginate({
		mapActionToKey: action => action.club,
		mapActionToId: action => action.id,
		types: [TYPE.CLUBSEARCH_REQUEST, TYPE.CLUBSEARCH_SUCCESS, TYPE.CLUBSEARCH_FAILURE]
	}),
	ClubMemberList: paginate({
		mapActionToKey: action => action.clubmemberlist,
		mapActionToId: action => action.id,
		types: [TYPE.CLUBMEMBERLIST_REQUEST, TYPE.CLUBMEMBERLIST_SUCCESS, TYPE.CLUBMEMBERLIST_FAILURE]
	}),

	listActivity: paginate({
		mapActionToKey: action => action.activity,
		types: [TYPE.ACTIVITY_REQUEST, TYPE.ACTIVITY_SUCCESS, TYPE.ACTIVITY_FAILURE]
	}),
	listSearchActivity: paginate({
		mapActionToKey: action => action.activity,
		mapActionToId: action => action.id,
		types: [TYPE.ACTIVITYSEARCH_REQUEST, TYPE.ACTIVITYSEARCH_SUCCESS, TYPE.ACTIVITYSEARCH_FAILURE]
	}),

	ClubActivityList: paginate({
		mapActionToKey: action => action.clubactivitylist,
		mapActionToId: action => action.id,
		types: [TYPE.CLUBACTIVITYLIST_REQUEST, TYPE.CLUBACTIVITYLIST_SUCCESS, TYPE.CLUBACTIVITYLIST_FAILURE]
	}),
	listActivityMember: paginate({
		mapActionToKey: action => action.activitymember,
		mapActionToId: action => action.id,
		types: [TYPE.ACTIVITYMEMBER_REQUEST, TYPE.ACTIVITYMEMBER_SUCCESS, TYPE.ACTIVITYMEMBER_FAILURE]
	}),
});
//详情页单条数据
const details = combineReducers({
	clubInfo: detaileFn({
		detailsKey: action => action.clubInfo,
		detaileId: action => action.id,
		types: [TYPE.CLUBINFO_REQUEST, TYPE.CLUBINFO_SUCCESS, TYPE.CLUBINFO_FAILURE]
	}),
	ActivityDetails: detaileFn({
		detailsKey: action => action.activitydetails,
		detaileId: action => action.id,
		types: [TYPE.ACTIVITYDETAILS_REQUEST, TYPE.ACTIVITYDETAILS_SUCCESS, TYPE.ACTIVITYDETAILS_FAILURE]
	}),
	StudentInfo: detaileFn({
		detailsKey: action => action.studentInfo,
		detaileId: action => action.id,
		types: [TYPE.STUDENTINFO_REQUEST, TYPE.STUDENTINFO_SUCCESS, TYPE.STUDENTINFO_FAILURE]
	})
})



function resetPass(state = {
	isFetch: false,
	resetOk: false,
	resetError: false
}, action) {
	switch (action.type) {
		case TYPE.RESET_REQUEST:
			return Object.assign({}, state, {
				isFetch: true
			});
			break;
		case TYPE.RESET_SUCCESS:
			return Object.assign({}, state, {
				isFetch: false,
				resetOk: true
			});
			break;
		case TYPE.RESET_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				resetOk: false,
				error: resetError.error
			});
			break;
		default:
			return state;
			break;
	}
}

function getRule(state = {
	isFetch: false,
	content: {}
}, action) {
	switch (action.type) {
		case TYPE.GETRULE_REQUEST:
			return Object.assign({}, state, {
				isFetch: true
			});
			break;
		case TYPE.GETRULE_SUCCESS:
			return Object.assign({}, state, {
				isFetch: false,
				content: action.response
			});
			break;
		case TYPE.GETRULE_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				resetOk: false,
				error: resetError.error
			});
			break;
		default:
			return state;
			break;
	}
}

//获取管理员信息

function getAdminInfo(state = {
	isFetch: false,
	content: {},
}, action) {
	switch (action.type) {
		case TYPE.GETADMIN_REQUEST:
			return Object.assign({}, state, {
				isFetch: true
			});
			break;
		case TYPE.GETADMIN_SUCCESS:
			//console.log("GETADMIN_SUCCESS", action)
			return Object.assign({}, state, {
				isFetch: false,
				content: action.response
			});
			break;
		case TYPE.GETADMIN_FAILURE:
			//console.log("RELEASE_FAILURE", action)
			return Object.assign({}, state, {
				isFetch: false,
			});
			break;
		default:
			return state;
			break;
	}
}

export const rootReducer = combineReducers({
	pageActive,
	urlObj,
	userState,
	editPassword,
	listpage,
	details,
	resetPass,
	getAdminInfo,
	UserGrade,
	SetRule,
	getRule
})