import {
	CALL_API,
	Schemas
} from '../middleware/api'
//发布活动
import {
	EDIT_REQUEST,
	EDIT_SUCCESS,
	EDIT_FAILURE
} from "../constants/actionType";

export function fetchEdit(edit, endpoint, data, schema) {
	return {
		edit,
		[CALL_API]: {
			types: [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE],
			endpoint: endpoint,
			method: 'POST',
			body: data,
			schema: schema
		}
	}
}
export function editAdmin(json) {
	var endpoint = "adminSchool/setUp/editAdmin";
	return dispatch => {
		dispatch(fetchEdit("admin", endpoint, json, Schemas.EDITADMIN))
	}
}

export function editClub(json) {
	var endpoint = "adminSchool/club/editClub";
	return dispatch => {
		dispatch(fetchEdit("clublist", endpoint, json, Schemas.EDITADMIN))
	}
}