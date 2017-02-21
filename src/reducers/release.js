require('core-js/fn/object/assign');
import * as TYPE from "../constants/actionType";
//发布


// export function release(state = {}, action) {
// 	//console.log("action:", action)
// 	switch (action.type) {
// 		case TYPE.RELEASE_REQUEST:
// 		case TYPE.RELEASE_SUCCESS:
// 		case TYPE.RELEASE_FAILURE:
// 			return Object.assign({}, state, {
// 				[action.release]: updataRelease(state[action.release], action)
// 			})
// 			break;
// 		default:
// 			return state;
// 			break;
// 	}
// }