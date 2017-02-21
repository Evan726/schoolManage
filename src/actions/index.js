import {
	CALL_API,
	Schemas
} from '../middleware/api';
//url写入状态
import {
	INSERT_URL
} from "../constants/actionType";
export function urlState(obj, pageName) {
	return {
		type: INSERT_URL,
		obj,
		pageName
	}
}



//页数
import {
	PAGE_ACTIVE
} from "../constants/actionType";
export function fetchPageActive(page, pageName) {
	return {
		type: PAGE_ACTIVE,
		page,
		pageName
	}
}


//删除活动
import {
	DELETE_REQUEST,
	DELETE_SUCCESS,
	DELETE_FAILURE
} from "../constants/actionType";

export function fetchDelete(del, id) {
	return {
		del,
		id,
		[CALL_API]: {
			types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
			endpoint: `activity/del/activityId/${id}`,
			method: 'GET',
			schema: Schemas.DELETE
		}
	}
}
export function delActivity(id) {
	return dispatch => {
		dispatch(fetchDelete("activity", id))
	}
}

//活动详情
import {
	ACTIVITYDETAILS_REQUEST,
	ACTIVITYDETAILS_SUCCESS,
	ACTIVITYDETAILS_FAILURE
} from "../constants/actionType";
export function fetchActivityDetails(id, activitydetails) {
	return {
		activitydetails,
		id,
		[CALL_API]: {
			types: [ACTIVITYDETAILS_REQUEST, ACTIVITYDETAILS_SUCCESS, ACTIVITYDETAILS_FAILURE],
			endpoint: `activity/GetActivity/userId/0/devId/0/activityId/${id}`,
			method: 'POST',
			schema: Schemas.ACTIVITYDETAILS
		}
	}
}

//活动详情
import {
	GETRULE_REQUEST,
	GETRULE_SUCCESS,
	GETRULE_FAILURE
} from "../constants/actionType";
export function fetchGetRule() {
	return {
		[CALL_API]: {
			types: [GETRULE_REQUEST, GETRULE_SUCCESS, GETRULE_FAILURE],
			endpoint: "adminSchool/setUp/getRuleBySchoolId",
			method: 'POST',
			schema: Schemas.GETRULE
		}
	}
}

//订单详情页
import {
	ORDERDETAILS_REQUEST,
	ORDERDETAILS_SUCCESS,
	ORDERDETAILS_FAILURE
} from "../constants/actionType";
export function fetchOrderDetails(id, orderdetails) {
	return {
		orderdetails,
		id,
		[CALL_API]: {
			types: [ORDERDETAILS_REQUEST, ORDERDETAILS_SUCCESS, ORDERDETAILS_FAILURE],
			endpoint: `enrollOrder/${id}`,
			method: 'GET',
			schema: Schemas.ORDERDETAILS
		}
	}
}
//订单list
import {
	ORDER_REQUEST,
	ORDER_SUCCESS,
	ORDER_FAILURE
} from "../constants/actionType";
export function ActivityOrders(id, activityorders) {
	return {
		activityorders,
		id,
		[CALL_API]: {
			types: [ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE],
			endpoint: `enrollOrders/activityId/${id}`,
			method: 'GET',
			schema: Schemas.ACTIVITYORDERS
		}
	}
}

//搜索订单
import {
	ORDERSEARCH_REQUEST,
	ORDERSEARCH_SUCCESS,
	ORDERSEARCH_FAILURE
} from "../constants/actionType";
export function FetchOrdersSearch(mobile, orderssearch) {
	return {
		orderssearch,
		mobile,
		[CALL_API]: {
			types: [ORDERSEARCH_REQUEST, ORDERSEARCH_SUCCESS, ORDERSEARCH_FAILURE],
			endpoint: `enrollOrders/mobile/${mobile}`,
			method: 'GET',
			schema: Schemas.ORDERSSEARCH
		}
	}
}



//登陆
import {
	USER_REQUEST,
	USER_SUCCESS,
	USER_FAILURE
} from "../constants/actionType";

export function fetchLoginUser(data) {
	return {
		[CALL_API]: {
			types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
			endpoint: 'adminSchool/login',
			method: 'POST',
			body: data,
			schema: Schemas.USER
		}
	}
}

//退出
import {
	SIGNOUT_SESSION
} from "../constants/actionType";

export function signOut(args) {
	return {
		type: SIGNOUT_SESSION
	}
}

//修改密码
import {
	EDITPASS_REQUEST,
	EDITPASS_SUCCESS,
	EDITPASS_FAILURE
} from "../constants/actionType";

export function editPassword(data) {
	return {
		[CALL_API]: {
			types: [EDITPASS_REQUEST, EDITPASS_SUCCESS, EDITPASS_FAILURE],
			endpoint: 'adminSchool/setUp/editPassword',
			method: 'POST',
			body: data,
			schema: Schemas.EDITPASS
		}
	}
}