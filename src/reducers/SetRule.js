require('core-js/fn/object/assign');
import {
	GETSETRULE_REQUEST,
	GETSETRULE_SUCCESS,
	GETSETRULE_FAILURE
} from "../constants/actionType";
var init = {
	isFetch: false,
	content: {},
	isEdit: false
}
export default function SetRule(state = init, action) {
	switch (action.type) {
		case GETSETRULE_REQUEST:
			return Object.assign({}, state, {
				isFetch: true,
				isEdit: false
			})
			break;
		case GETSETRULE_SUCCESS:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false,
				content: action.response
			})
			break;
		case GETSETRULE_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false
			})
			break;
		default:
			return SetRuleEdit(state, action)
	}
}

import {
	EDITSETRULE_REQUEST,
	EDITSETRULE_SUCCESS,
	EDITSETRULE_FAILURE
} from "../constants/actionType";

function SetRuleEdit(state, action) {
	switch (action.type) {
		case EDITSETRULE_REQUEST:
			return Object.assign({}, state, {
				isFetch: true,
				isEdit: false
			})
			break;
		case EDITSETRULE_SUCCESS:
			return Object.assign({}, state, {
				isEdit: true,
				isFetch: false,
				content: action.response
			})
			break;
		case EDITSETRULE_FAILURE:
			return Object.assign({}, state, {
				isFetch: false,
				isEdit: false
			})
			break;
		default:
			return state
	}
}