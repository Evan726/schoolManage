import {
	CALL_API,
	Schemas
} from '../middleware/api'
//发布活动
import {
	RELEASE_REQUEST,
	RELEASE_SUCCESS,
	RELEASE_FAILURE
} from "../constants/actionType";

export function fetchRelease(release, endpoint, data, schema) {
	return {
		release,
		[CALL_API]: {
			types: [RELEASE_REQUEST, RELEASE_SUCCESS, RELEASE_FAILURE],
			endpoint: endpoint,
			method: 'POST',
			body: data,
			schema: schema
		}
	}
}
export function addAdmin(json) {
	var endpoint = "adminSchool/setUp/addAdmin";
	return dispatch => {
		dispatch(fetchRelease("admin", endpoint, json, Schemas.ADDADMIN))
	}
}

export function addClub(json) {
	var endpoint = "adminSchool/club/addClub";
	return dispatch => {
		dispatch(fetchRelease("clublist", endpoint, json, Schemas.ADDCLUB))
	}
}

export function addActivity(json) {
	var endpoint = "adminSchool/activity/addActivity";
	return dispatch => {
		dispatch(fetchRelease("activity", endpoint, json, Schemas.ADDACTIVITY))
	}
}