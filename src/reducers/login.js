require('core-js/fn/object/assign');

import {
	USER_REQUEST,
	USER_SUCCESS,
	USER_FAILURE,
	SIGNOUT_SESSION
} from "../constants/actionType";

var initLogin = {
	userId: "",
	user: "",
	token: "",
	nickName: "",
	schoolId: "",
	clubId: [],
	group: "",
	newDate: null,
	status: false,
	isfacth: false,
	msg: ""
};
// {
//     "token": "15354429D813DAABEB533937BAD0E9C9",
//     "userId": "585b7c7c648a270bb81fd050",
//     "username": "admin",
//     "schoolId": "5853abd9a51f7610749e4080",
//     "clubId":
//     [
//         "58816d21199ce64f48dfc4c9"
//     ],
//     "nickName": "刘登超",
//     "group": 1,
//     "newDate": "2017-02-06T03:26:39.394Z"
// }
if (window.sessionStorage) {
	initLogin.userId = sessionStorage.getItem("userId") || "";
	initLogin.user = sessionStorage.getItem("user") || "";
	initLogin.token = sessionStorage.getItem("token") || "";
	initLogin.nickName = sessionStorage.getItem("nickName") || "";
	initLogin.newDate = sessionStorage.getItem("newDate") || "";
	initLogin.schoolId = sessionStorage.getItem("schoolId") || "";
	initLogin.clubId = sessionStorage.getItem("clubId") || "";
	initLogin.group = Number(sessionStorage.getItem("group"));
	initLogin.status = sessionStorage.getItem("status") === "true" ? true : false;
}

export function userState(state = initLogin, action) {
	switch (action.type) {
		case USER_REQUEST:
			return Object.assign({}, state, {
				isfacth: true,
				status: false,
				msg: ""
			});
		case USER_SUCCESS:
			return Object.assign({}, state, {
				user: action.response.username,
				userId: action.response.userId,
				token: action.response.token,
				newDate: action.response.newDate,
				nickName: action.response.nickName || "",
				status: writeSession(action.response),
				isfacth: false,
				schoolId: action.response.schoolId,
				clubId: action.response.clubId,
				group: Number(action.response.group),
				msg: ""
			});
		case USER_FAILURE:
			console.log(action)
			return Object.assign({}, state, {
				isfacth: false,
				status: false,
				msg: action.error
			});

		default:
			return signOut(state, action);
	}
}


import {
	EDITPASS_REQUEST,
	EDITPASS_SUCCESS,
	EDITPASS_FAILURE,
} from "../constants/actionType";

export function editPassword(state = {
	isfacth: false,
	msg: ""
}, action) {
	switch (action.type) {
		case EDITPASS_REQUEST:
			return Object.assign({}, state, {
				isfacth: true
			});
		case EDITPASS_SUCCESS:
			delSession();
			return Object.assign({}, state, {
				isfacth: false,
				msg: "修改成功"
			});
		case EDITPASS_FAILURE:
			return Object.assign({}, state, {
				isfacth: false,
				msg: "修改失败"
			});
		default:
			return signOut(state, action);
	}
}



function signOut(state, action) {
	switch (action.type) {
		case SIGNOUT_SESSION:
			return Object.assign({}, state, {
				userId: "",
				user: "",
				token: "",
				schoolId: "",
				newDate: null,
				clubId: [],
				group: "",
				newDate: null,
				status: delSession(),
				isfacth: false
			})
		default:
			return state;
	}
}

//写入session
function writeSession(user) {
	if (window.sessionStorage) {
		sessionStorage.setItem("user", user.username);
		sessionStorage.setItem("userId", user.userId);
		sessionStorage.setItem("token", user.token);
		sessionStorage.setItem("newDate", user.newDate);
		sessionStorage.setItem("schoolId", user.schoolId);
		sessionStorage.setItem("clubId", user.clubId.join("-"));
		sessionStorage.setItem("group", user.group);
		sessionStorage.setItem("nickName", user.nickName || "");
		if (sessionStorage.getItem("userId")) {
			sessionStorage.setItem("status", true);
			return true
		}
	} else {}
	return false
}

//删除session
function delSession() {
	if (window.sessionStorage) {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("status");
		sessionStorage.removeItem("schoolId");
		sessionStorage.removeItem("clubId");
		sessionStorage.removeItem("nickName");
		sessionStorage.removeItem("group");
		return false
	} else {

	}
}