import {
	CALL_API,
	Schemas
} from '../middleware/api';

//管理员列表
import {
	ADMIN_REQUEST,
	ADMIN_SUCCESS,
	ADMIN_FAILURE
} from "../constants/actionType";

function AdminList(admin, reqQuery) {
	return {
		admin,
		[CALL_API]: {
			types: [ADMIN_REQUEST, ADMIN_SUCCESS, ADMIN_FAILURE],
			endpoint: 'adminSchool/setUp/adminList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.ADMIN
		}
	}
}
export function fetchAdminList(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(AdminList("admin", Object.assign({}, reqQuery, json)))
	}
}

//管理员列表
import {
	SETCLUBLIST_REQUEST,
	SETCLUBLIST_SUCCESS,
	SETCLUBLIST_FAILURE
} from "../constants/actionType";

function ClubList(clublist, reqQuery) {
	return {
		clublist,
		[CALL_API]: {
			types: [SETCLUBLIST_REQUEST, SETCLUBLIST_SUCCESS, SETCLUBLIST_FAILURE],
			endpoint: 'adminSchool/setUp/getClubList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.SETCLUBLIST
		}
	}
}
export function fetchClubList(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(ClubList("clublist", Object.assign({}, reqQuery, json)))
	}
}


//获取管理员信息
import {
	GETADMIN_REQUEST,
	GETADMIN_SUCCESS,
	GETADMIN_FAILURE
} from "../constants/actionType";

export function getAdmin(json) {
	return {
		[CALL_API]: {
			types: [GETADMIN_REQUEST, GETADMIN_SUCCESS, GETADMIN_FAILURE],
			endpoint: 'adminSchool/setUp/getAdmin',
			method: 'POST',
			body: json,
			schema: Schemas.GETADMIN
		}
	}
}

//重置密码
import {
	RESET_REQUEST,
	RESET_SUCCESS,
	RESET_FAILURE
} from "../constants/actionType";

export function fetchResetPass(json) {
	return {
		[CALL_API]: {
			types: [RESET_REQUEST, RESET_SUCCESS, RESET_FAILURE],
			endpoint: 'adminSchool/setUp/resetPassword',
			method: 'POST',
			body: json,
			schema: Schemas.RESETADMIN
		}
	}
}

//获取学生等级
import {
	USETGRADE_REQUEST,
	USETGRADE_SUCCESS,
	USETGRADE_FAILURE
} from "../constants/actionType";
export function fetchUserGrade() {
	return {
		[CALL_API]: {
			types: [USETGRADE_REQUEST, USETGRADE_SUCCESS, USETGRADE_FAILURE],
			endpoint: 'adminSchool/setUp/getUserGradeBySchoolId',
			method: 'POST',
			schema: Schemas.USETGRADE
		}
	}
}

//设置学生等级
import {
	USETGRADEEDIT_REQUEST,
	USETGRADEEDIT_SUCCESS,
	USETGRADEEDIT_FAILURE
} from "../constants/actionType";
export function fetchUserLevelEdit(json) {
	return {
		[CALL_API]: {
			types: [USETGRADEEDIT_REQUEST, USETGRADEEDIT_SUCCESS, USETGRADEEDIT_FAILURE],
			endpoint: 'adminSchool/setUp/setUserGrade',
			method: 'POST',
			body: json,
			schema: Schemas.USETGRADEEDIT
		}
	}
}


//获取基本设置
import {
	GETSETRULE_REQUEST,
	GETSETRULE_SUCCESS,
	GETSETRULE_FAILURE
} from "../constants/actionType";
export function fetchGetSetRule(json) {
	return {
		[CALL_API]: {
			types: [GETSETRULE_REQUEST, GETSETRULE_SUCCESS, GETSETRULE_FAILURE],
			endpoint: 'adminSchool/setUp/getRuleBySchoolId',
			method: 'POST',
			body: json,
			schema: Schemas.GETSETRULE
		}
	}
}

//修改基本设置
import {
	EDITSETRULE_REQUEST,
	EDITSETRULE_SUCCESS,
	EDITSETRULE_FAILURE
} from "../constants/actionType";
export function fetchEditSetRule(json) {
	return {
		[CALL_API]: {
			types: [EDITSETRULE_REQUEST, EDITSETRULE_SUCCESS, EDITSETRULE_FAILURE],
			endpoint: 'adminSchool/setUp/setRule',
			method: 'POST',
			body: json,
			schema: Schemas.EDITSETRULE
		}
	}
}


//