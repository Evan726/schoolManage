require('core-js/fn/object/assign');
import {
	USETGRADE_REQUEST,
	USETGRADE_SUCCESS,
	USETGRADE_FAILURE
} from "../constants/actionType";
var init = {
	isFetch: false,
	content: {},
	isEdit: false
}
export default function UserGrade(state = init, action) {
	switch (action.type) {
		case USETGRADE_REQUEST:
			return Object.assign({}, state, {
				isFetch: true,
				isEdit: false
			})
			break;
		case USETGRADE_SUCCESS:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false,
				content: action.response
			})
			break;
		case USETGRADE_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false
			})
			break;
		default:
			return UserGradeEdit(state, action)
	}
}

import {
	USETGRADEEDIT_REQUEST,
	USETGRADEEDIT_SUCCESS,
	USETGRADEEDIT_FAILURE
} from "../constants/actionType";

function UserGradeEdit(state, action) {
	switch (action.type) {
		case USETGRADEEDIT_REQUEST:
			return Object.assign({}, state, {
				isFetch: true,
				isEdit: false
			})
			break;
		case USETGRADEEDIT_SUCCESS:
			return Object.assign({}, state, {
				isEdit: true,
				isFetch: false,
				content: action.response
			})
			break;
		case USETGRADEEDIT_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false
			})
			break;
		default:
			return state
	}
}