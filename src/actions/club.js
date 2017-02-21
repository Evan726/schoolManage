import {
	CALL_API,
	Schemas
} from '../middleware/api';

//俱乐部列表
import {
	CLUBLIST_REQUEST,
	CLUBLIST_SUCCESS,
	CLUBLIST_FAILURE
} from "../constants/actionType";

function Club(club, reqQuery) {
	return {
		club,
		[CALL_API]: {
			types: [CLUBLIST_REQUEST, CLUBLIST_SUCCESS, CLUBLIST_FAILURE],
			endpoint: 'adminSchool/club/getClubList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.CLUBLIST
		}
	}
}
export function fetchClub(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(Club("club", Object.assign({}, reqQuery, json)))
	}
}

//俱乐部搜素列表
import {
	CLUBSEARCH_REQUEST,
	CLUBSEARCH_SUCCESS,
	CLUBSEARCH_FAILURE
} from "../constants/actionType";

function SearchClub(club, reqQuery, id) {
	return {
		club,
		id,
		[CALL_API]: {
			types: [CLUBSEARCH_REQUEST, CLUBSEARCH_SUCCESS, CLUBSEARCH_FAILURE],
			endpoint: 'adminSchool/club/getClubList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.CLUBLIST
		}
	}
}

export function fetchSearchClub(json, squeryStr) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(SearchClub("club", Object.assign({}, reqQuery, json), squeryStr))
	}
}

//俱乐部信息
import {
	CLUBINFO_REQUEST,
	CLUBINFO_SUCCESS,
	CLUBINFO_FAILURE
} from "../constants/actionType";
export function fetchClubInfo(clubInfo, id) {
	return {
		clubInfo,
		id,
		[CALL_API]: {
			types: [CLUBINFO_REQUEST, CLUBINFO_SUCCESS, CLUBINFO_FAILURE],
			endpoint: 'adminSchool/club/getClubInfoById',
			method: 'POST',
			body: {
				"clubId": id
			},
			schema: Schemas.CLUBINFO
		}
	}
}

//俱乐部成员列表
import {
	CLUBMEMBERLIST_REQUEST,
	CLUBMEMBERLIST_SUCCESS,
	CLUBMEMBERLIST_FAILURE
} from "../constants/actionType";

function MemberList(clubmemberlist, reqQuery, id) {
	return {
		clubmemberlist,
		id,
		[CALL_API]: {
			types: [CLUBMEMBERLIST_REQUEST, CLUBMEMBERLIST_SUCCESS, CLUBMEMBERLIST_FAILURE],
			endpoint: 'adminSchool/club/getClubMemberByClubId',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.CLUBMEMBERLIST
		}
	}
}
export function fetchMemberList(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(MemberList("clubmemberlist", Object.assign({}, reqQuery, json), json.clubId))
	}
}

//俱乐部活动列表
import {
	CLUBACTIVITYLIST_REQUEST,
	CLUBACTIVITYLIST_SUCCESS,
	CLUBACTIVITYLIST_FAILURE
} from "../constants/actionType";

function ActivityList(clubactivitylist, reqQuery, id) {
	return {
		clubactivitylist,
		id,
		[CALL_API]: {
			types: [CLUBACTIVITYLIST_REQUEST, CLUBACTIVITYLIST_SUCCESS, CLUBACTIVITYLIST_FAILURE],
			endpoint: 'adminSchool/club/getClubActivityByClubId',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.CLUBACTIVITYLIST
		}
	}
}

export function fetchActivityList(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(ActivityList("clubactivitylist", Object.assign({}, reqQuery, json), json.clubId))
	}
}