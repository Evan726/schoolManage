import merge from 'lodash/merge'
import union from 'lodash/union'
import * as TYPE from "../constants/actionType";
export function paginate({
	mapActionToKey,
	mapActionToId,
	mapActionName,
	types
}) {
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected types to be an array of three elements.')
	}
	if (!types.every(t => typeof t === 'string')) {
		throw new Error('Expected types to be strings.')
	}
	if (typeof mapActionToKey !== 'function') {
		throw new Error('Expected mapActionToKey to be a function.')
	}

	const [requestType, successType, failureType] = types;

	function updatePagination(state = {
		isFetching: false,
		pageCount: 1,
		total: 0,
		lists: {},
		ids: {},
		addOk: false,
		editok: false,
		addError: "",
	}, action) {
		const _key = mapActionToKey(action)

		// console.log("updatePagination_key:", _key)
		// console.log("updatePagination_state:", state)
		// console.log("updatePagination_action:", action)
		switch (action.type) {
			case requestType:
				return merge({}, state, {
					isFetching: true
				})
				break;
			case successType:
				var row = []
				if (_key === "mileage") {
					var listData = merge(state.lists, action.response.entities[_key])
					return merge({}, state, {
						isFetching: false,
						pageCount: action.response.result.pageCount,
						durationCount: action.response.result.durationCount,
						kilometerCount: action.response.result.kilometerCount,
						total: action.response.result.total,
						lists: listData,
						ids: merge({}, state.ids, {
							[action.response.result.pageCount]: action.response.result.listData
						})
					})
				}
				return merge({}, state, {
					isFetching: false,
					pageCount: action.response.result.pageCount,
					total: action.response.result.total,
					lists: merge(state.lists, action.response.entities[_key]),
					ids: merge({}, state.ids, {
							[action.response.result.pageCount]: action.response.result.listData
						})
						//ids: {union(state.ids, action.response.result.listData)}
				})
				break;
			case failureType:
				return merge({}, state, {
					isFetching: false
				})
				break;
			default:
				return state
		}
	}
	return function updatePaginationByKey(state = {}, action) {

		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				var key;
				if (typeof mapActionToId === "function") {
					key = mapActionToId(action)
				} else {
					key = mapActionToKey(action)
				}
				//console.log("key:", key)
				//console.log("action:", action)
				return merge({}, state, {
					[key]: updatePagination(state[key], action)
				})
				break;
			default:
				return addRelease(state, action, mapActionName)
		}
	}
};

function addRelease(state, action, mapActionName) {
	switch (action.type) {
		case TYPE.RELEASE_REQUEST:
			return merge({}, state, {
				[action.release]: {
					isFetching: true,
					addOk: false,
					addError: ""
				}
			});
			break;
		case TYPE.RELEASE_SUCCESS:
			if (state[action.release].ids) {
				var arr = state[action.release].ids[1];
				//console.log("state0:", arr)
				arr.unshift(action.response.id)
				return merge({}, state, {
					[action.release]: {
						lists: merge({}, state[action.release].lists, {
							[action.response.id]: action.response
						}),
						ids: merge({}, state[action.release].ids, {
							[1]: arr
						}),
						isFetching: false,
						addOk: true,
						addError: ""
					}
				});
			} else {
				return merge({}, state, {
					[action.release]: {
						isFetching: false,
						addOk: true,
						addError: ""
					}
				});
			}

			break;
		case TYPE.RELEASE_FAILURE:
			return merge({}, state, {
				[action.release]: {
					isFetching: false,
					addOk: false,
					addError: action.error
				}
			});
			break;
		default:
			return editRelease(state, action);
			break;
	}
};

function editRelease(state, action) {
	switch (action.type) {
		case TYPE.EDIT_REQUEST:
			return merge({}, state, {
				[action.edit]: {
					isFetching: true,
					editok: false,
					editerror: ""
				}
			});
			break;
		case TYPE.EDIT_SUCCESS:
			return merge({}, state, {
				[action.edit]: {
					lists: merge({}, state[action.edit].lists, {
						[action.response.id]: action.response
					}),
					isFetching: false,
					editok: true,
				}
			});
			break;
		case TYPE.EDIT_FAILURE:
			return merge({}, state, {
				[action.edit]: {
					isFetching: false,
					editok: false,
					editerror: action.error
				}
			});
			break;
		default:
			return del(state, action);
	}
};

function del(state, action) {
	switch (action.type) {
		case TYPE.DELETE_REQUEST:
			if (state && action) {
				if (state[action.del]) {
					return merge({}, state, {
						[action.del]: {
							isFetching: true
						}
					});
				}
			}
			return state;
			break;
		case TYPE.DELETE_SUCCESS:
			if (state && action) {
				if (state[action.del]) {
					var newState = merge({}, state, {
						[action.del]: {
							isFetching: false
						}
					});

					function removeByValue(arr, val) {
						for (var i = 0; i < arr.length; i++) {
							if (arr[i] == val) {
								arr.splice(i, 1);
								break;
							}
						}
					}
					if (newState[action.del].ids) {
						removeByValue(newState[action.del].ids[action.pageCount], action.id)
					}
					return newState;
				}
			}

			return state;
			break;
		case TYPE.DELETE_FAILURE:
			if (state && action) {
				if (state[action.del]) {
					return merge({}, state, {
						[action.del]: {
							isFetching: false
						}
					});
				}
			}
			return state;
			break;
		default:
			return state;
	}
}