require('core-js/fn/object/assign');
import {
	STUDENTINFO_REQUEST,
	STUDENTINFO_SUCCESS,
	STUDENTINFO_FAILURE
} from "../constants/actionType";
var init = {
	isFetching: false,
	content: {},
}
export default function StudentInfo(state = init, action) {
	switch (action.type) {
		case STUDENTINFO_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			})
			break;
		case STUDENTINFO_SUCCESS:
			//console.log(action.response)
			return Object.assign({}, state, {
				isFetching: false,
				content: Object.assign({}, state.content, action.response)
			})
			break;
		case STUDENTINFO_FAILURE:
			return Object.assign({}, state, {
				isFetching: false
			})
			break;
		default:
			return state
	}
}