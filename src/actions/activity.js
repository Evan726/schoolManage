import {
	CALL_API,
	Schemas
} from '../middleware/api';

//活动列表
import {
	ACTIVITY_REQUEST,
	ACTIVITY_SUCCESS,
	ACTIVITY_FAILURE
} from "../constants/actionType";

function Activity(activity, reqQuery) {
	return {
		activity,
		[CALL_API]: {
			types: [ACTIVITY_REQUEST, ACTIVITY_SUCCESS, ACTIVITY_FAILURE],
			endpoint: 'adminSchool/activity/getActivityList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.ACTIVITY
		}
	}
}
export function fetchActivity(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(Activity("activity", Object.assign({}, reqQuery, json)))
	}
}

//活动信息
import {
	ACTIVITYDETAILS_REQUEST,
	ACTIVITYDETAILS_SUCCESS,
	ACTIVITYDETAILS_FAILURE
} from "../constants/actionType";
export function fetchActivityDetails(activitydetails, id) {
	return {
		activitydetails,
		id,
		[CALL_API]: {
			types: [ACTIVITYDETAILS_REQUEST, ACTIVITYDETAILS_SUCCESS, ACTIVITYDETAILS_FAILURE],
			endpoint: 'adminSchool/activity/activityDetails',
			method: 'POST',
			body: {
				"activityId": id
			},
			schema: Schemas.ACTIVITYDETAILS
		}
	}
}


//活动成员列表
import {
	ACTIVITYMEMBER_REQUEST,
	ACTIVITYMEMBER_SUCCESS,
	ACTIVITYMEMBER_FAILURE
} from "../constants/actionType";

function ActivityMember(activitymember, reqQuery, id) {
	return {
		activitymember,
		id,
		[CALL_API]: {
			types: [ACTIVITYMEMBER_REQUEST, ACTIVITYMEMBER_SUCCESS, ACTIVITYMEMBER_FAILURE],
			endpoint: 'adminSchool/activity/activityMemberByActivityId',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.ACTIVITYMEMBER
		}
	}
}
export function fetchActivityMember(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(ActivityMember("activitymember", Object.assign({}, reqQuery, json), json.activityId))
	}
}

//

//活动搜素列表
import {
	ACTIVITYSEARCH_REQUEST,
	ACTIVITYSEARCH_SUCCESS,
	ACTIVITYSEARCH_FAILURE
} from "../constants/actionType";

function SearchActivity(activity, reqQuery, id) {
	return {
		activity,
		id,
		[CALL_API]: {
			types: [ACTIVITYSEARCH_REQUEST, ACTIVITYSEARCH_SUCCESS, ACTIVITYSEARCH_FAILURE],
			endpoint: 'adminSchool/activity/getActivityList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.ACTIVITY
		}
	}
}

export function fetchSearchActivity(json, squeryStr) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(SearchActivity("activity", Object.assign({}, reqQuery, json), squeryStr))
	}
}