import merge from 'lodash/merge';
export function detaileFn({
	detailsKey,
	detaileId,
	types
}) {

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('请检查action的类型')
	}
	if (!types.every(t => typeof t === 'string')) {
		throw new Error('action的类型不是string')
	}

	const [requestType, successType, failureType] = types;

	function updateDetails(state = {
		isFetch: false,
		content: {}
	}, action) {
		const key = detailsKey(action)
		const id = detaileId(action)

		switch (action.type) {
			case requestType:
				return merge({}, state, {
					isFetching: true
				})
			case successType:
				return merge({}, state, {
					isFetching: false,
					content: merge(state.jsonData, action.response),
				})
			case failureType:
				return merge({}, state, {
					isFetching: false
				})
			default:
				return state
		}
	}
	return function details(state = {}, action) {
		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				//console.log("action1", action)
				const key = detailsKey(action)
				const id = detaileId(action)
					//console.log("key1:", key)
					//console.log("id2:", id)
				return merge({}, state, {
					[id]: updateDetails(state[id], action)
				})
			default:
				return state
		}
	}
}