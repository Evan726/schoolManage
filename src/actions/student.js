import {
	CALL_API,
	Schemas
} from '../middleware/api';

//学生列表
import {
	STUDENT_REQUEST,
	STUDENT_SUCCESS,
	STUDENT_FAILURE
} from "../constants/actionType";

function Student(student, reqQuery) {
	return {
		student,
		[CALL_API]: {
			types: [STUDENT_REQUEST, STUDENT_SUCCESS, STUDENT_FAILURE],
			endpoint: 'adminSchool/student/studentList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.STUDENT
		}
	}
}
export function fetchStudent(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(Student("student", Object.assign({}, reqQuery, json)))
	}
}


//学生搜素列表
import {
	STUDENT_SEARCH_REQUEST,
	STUDENT_SEARCH_SUCCESS,
	STUDENT_SEARCH_FAILURE
} from "../constants/actionType";

function searchStudent(student, reqQuery, id) {
	return {
		student,
		id,
		[CALL_API]: {
			types: [STUDENT_SEARCH_REQUEST, STUDENT_SEARCH_SUCCESS, STUDENT_SEARCH_FAILURE],
			endpoint: 'adminSchool/student/studentList',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.STUDENT
		}
	}
}

export function fetchSearchStudent(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(searchStudent("student", Object.assign({}, reqQuery, json), json.studentNo))
	}
}


//学生信息
import {
	STUDENTINFO_REQUEST,
	STUDENTINFO_SUCCESS,
	STUDENTINFO_FAILURE
} from "../constants/actionType";
export function fetchStudentInfo(studentInfo, id) {
	return {
		studentInfo,
		id,
		[CALL_API]: {
			types: [STUDENTINFO_REQUEST, STUDENTINFO_SUCCESS, STUDENTINFO_FAILURE],
			endpoint: 'adminSchool/student/StudentInfo',
			method: 'POST',
			body: {
				"studentId": id
			},
			schema: Schemas.STUDENTINFO
		}
	}
}


//学生里程
import {
	MILEAGE_REQUEST,
	MILEAGE_SUCCESS,
	MILEAGE_FAILURE
} from "../constants/actionType";

function Mileage(mileage, reqQuery, id) {

	return {
		mileage,
		id,
		[CALL_API]: {
			types: [MILEAGE_REQUEST, MILEAGE_SUCCESS, MILEAGE_FAILURE],
			endpoint: 'adminSchool/student/getMileageListByStudentId',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.MILEAGE
		}
	}
}
export function fetchMileage(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(Mileage("mileage", Object.assign({}, reqQuery, json), json.studentId))
	}
}

//学生活动
import {
	STUDENT_ACTIVITY_REQUEST,
	STUDENT_ACTIVITY_SUCCESS,
	STUDENT_ACTIVITY_FAILURE
} from "../constants/actionType";

function studentActivity(studentActivity, reqQuery, id) {

	return {
		studentActivity,
		id,
		[CALL_API]: {
			types: [STUDENT_ACTIVITY_REQUEST, STUDENT_ACTIVITY_SUCCESS, STUDENT_ACTIVITY_FAILURE],
			endpoint: 'adminSchool/student/getActivityListByStudentId',
			method: 'POST',
			body: reqQuery,
			schema: Schemas.STUDENTACTIVITY
		}
	}
}
export function fetchStudentActivity(json) {
	var reqQuery = {
		"pageCount": 1,
		"rows": 20,
	}
	return dispatch => {
		dispatch(studentActivity("studentActivity", Object.assign({}, reqQuery, json), json.studentId))
	}
}