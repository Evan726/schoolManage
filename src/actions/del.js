import {
	CALL_API,
	Schemas
} from '../middleware/api'
//发布活动
import {
	DELETE_REQUEST,
	DELETE_SUCCESS,
	DELETE_FAILURE
} from "../constants/actionType";

export function fetchRelease(del, endpoint, data, schema, pageCount, id) {
	return {
		del,
		pageCount,
		id,
		[CALL_API]: {
			types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
			endpoint: endpoint,
			method: 'POST',
			body: data,
			schema: schema
		}
	}
}
export function fetchDelAdmin(json, pageCount) {
	var endpoint = "adminSchool/setUp/delAdmin";
	return dispatch => {
		dispatch(fetchRelease("admin", endpoint, json, Schemas.DELETE, pageCount, json.adminId))
	}
}

export function fetchDelClub(json, pageCount) {
	var endpoint = "adminSchool/club/delClub";
	return dispatch => {
		dispatch(fetchRelease("clublist", endpoint, json, Schemas.DELETE, pageCount, json.clubId))
	}
}

export function fetchDelActivity(json, pageCount) {
	var endpoint = "adminSchool/activity/delActivity";
	return dispatch => {
		dispatch(fetchRelease("activity", endpoint, json, Schemas.DELETE, pageCount, json.activityId))
	}
}

export function fetchDelClubActivity(json, pageCount, clubid) {
	var endpoint = "adminSchool/activity/delActivity";
	return dispatch => {
		dispatch(fetchRelease(clubid, endpoint, json, Schemas.DELETE, pageCount, json.activityId))
	}
}

export function fetchDelClubMember(json, pageCount, clubid) {
	var endpoint = "adminSchool/club/delClubMemberById";

	return dispatch => {
		dispatch(fetchRelease(clubid, endpoint, json, Schemas.DELETE, pageCount, json.userId))
	}
}