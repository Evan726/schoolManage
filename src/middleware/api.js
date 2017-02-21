require('core-js/fn/object/assign');
var crypto = require('crypto');
import {
    Schema,
    arrayOf,
    normalize
} from 'normalizr'

//驼峰
import {
    camelizeKeys
} from 'humps'
import 'isomorphic-fetch'

function md5(vaule) {
    var md5 = crypto.createHash('md5');
    return md5.update(vaule).digest('hex').toUpperCase();
}

function getNextPageUrl(response) {
    const link = response.url
    if (!link) {
        return null
    }
    const nextLink = link.split('?')[0];
    return nextLink
}



//const API_ROOT = 'http://59.110.44.57:3003/';
const API_ROOT = 'http://192.168.0.42:3003/';


function callApi(endpoint, schema, method, body) {
    var httpUrl = "v0/" + endpoint;
    var fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + httpUrl : endpoint
    if (!!sessionStorage.getItem("userId") && !!sessionStorage.getItem("token")) {
        var userId = sessionStorage.getItem("userId");
        var token = sessionStorage.getItem("token");
        var reqQuery = "?userId=" + userId + "&token=" + token + "&";
        var _body = JSON.stringify(body) || "{}";
        var sign = "/" + httpUrl + reqQuery + _body + 'ABCDEFG$';
        //console.log("sign:", sign)
        var reqQuery = reqQuery + "sign=" + md5(sign);
        fullUrl = API_ROOT + httpUrl + reqQuery;
    }
    //console.log(fullUrl)
    var Json = {
        cache: 'reload',
        method: method
    };
    if (method === "POST") {
        var fetchJson = Object.assign({}, Json, {
            body: JSON.stringify(body),
            headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        })
    } else {
        var fetchJson = Json
    }
    const req = new Request(fullUrl, fetchJson);
    return fetch(req)
        .then(response =>
            response.json().then(json => ({
                json,
                response
            }))
        ).then(({
            json,
            response
        }) => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            if (json.code !== "0000") {
                return Promise.reject(json)
            }

            const camelizedJson = camelizeKeys(json.result)
            const nextPageUrl = getNextPageUrl(response)
            if (!camelizedJson) {
                return json
            }
            // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
            // console.log('fetch_old:', response);
            // console.log('fetch_o1:', camelizedJson);
            // console.log('fetch_new:', Object.assign({},
            //     normalize(camelizedJson, schema), {
            //         nextPageUrl
            //     }
            // ));
            // console.log('+++++++++++++++++++++++++++++++++++++++++++++++');
            if (schema._key === "no") {
                return camelizedJson
            }

            return Object.assign({},
                normalize(camelizedJson, schema), {}
            )
        })
}

const loginSchema = new Schema('no');
const passSchema = new Schema('no');

//学生
const student = new Schema('student', {
    idAttribute: "studentId"
});
var studentSchema = {
    listData: arrayOf(student)
};
//学生信息
const studentInfoSchema = new Schema('no');

//学生里程
const mileage = new Schema('mileage', {
    idAttribute: "id"
});
var mileageSchema = {
    listData: arrayOf(mileage)
};
//学生活动
const studentActivity = new Schema('studentActivity', {
    idAttribute: "id"
});
var studentActivitySchema = {
    listData: arrayOf(studentActivity)
};

//设置-管理员列表
const admin = new Schema('admin', {
    idAttribute: "id"
});
var adminSchema = {
    listData: arrayOf(admin)
};

//设置-俱乐部列表
const setclub = new Schema('clublist', {
    idAttribute: "id"
});
var setClubListSchema = {
    listData: arrayOf(setclub)
};

//俱乐部
const club = new Schema('club');
var clubSchema = {
    listData: arrayOf(club)
};

//俱乐部成员
const clubmemberlist = new Schema('clubmemberlist');
var clubMemberListSchema = {
    listData: arrayOf(clubmemberlist)
};
//俱乐部活动
const clubActivityList = new Schema('clubactivitylist');
var clubActivityListSchema = {
    listData: arrayOf(clubActivityList)
};
//俱乐部信息
const clubInfoSchema = new Schema('no');

//发布
const addAdminSchema = new Schema('no')
const addClubSchema = new Schema('no')
const addActivitySchema = new Schema('no')
const editAdminSchema = new Schema('no')
const getAdminSchema = new Schema('no')

//活动
const activity = new Schema('activity');
var activitySchema = {
    listData: arrayOf(activity)
};
//活动详情
const activityDetailsSchema = new Schema('no');
//活动成员
const activitymember = new Schema('activitymember');
var activitymemberSchema = {
    listData: arrayOf(activitymember)
};
const deleteSchema = new Schema('no');
const resetSchema = new Schema('no');
const usergradeSchema = new Schema('no');
const usergradeEditSchema = new Schema('no');
const getruleSchema = new Schema('no');

export const Schemas = {
    USER: loginSchema,
    EDITPASS: passSchema,
    GETRULE: getruleSchema,
    STUDENT: studentSchema,
    STUDENTINFO: studentInfoSchema,
    MILEAGE: mileageSchema,
    STUDENTACTIVITY: studentActivitySchema,
    ADMIN: adminSchema,
    ADDADMIN: addAdminSchema,
    ADDCLUB: addClubSchema,
    DELETE: deleteSchema,
    RESETADMIN: resetSchema,
    GETADMIN: getAdminSchema,
    EDITADMIN: editAdminSchema,
    SETCLUBLIST: setClubListSchema,
    CLUBLIST: clubSchema,
    CLUBMEMBERLIST: clubMemberListSchema,
    CLUBINFO: clubInfoSchema,
    CLUBACTIVITYLIST: clubActivityListSchema,
    ACTIVITY: activitySchema,
    ACTIVITYDETAILS: activityDetailsSchema,
    ACTIVITYMEMBER: activitymemberSchema,
    ADDACTIVITY: addActivitySchema,
    USETGRADE: usergradeSchema,
    USETGRADEEDIT: usergradeEditSchema,
    GETSETRULE: usergradeEditSchema,
    EDITSETRULE: usergradeEditSchema

}


// Action key that carries API call info interpreted by this Redux middleware.
//export const CALL_API = Symbol('Call API')
export const CALL_API = 'Call API'
    // A Redux middleware that interprets actions with CALL_API info specified.
    // Performs the call and promises when such actions are dispatched.
export default store => next => action => {

    //console.log('当前执行的action:', action);
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }


    let {
        endpoint,
        method,
    } = callAPI

    const {
        body
    } = callAPI

    const {
        schema,
        types,
    } = callAPI;


    if (!method) {
        throw new Error('你没有定义method，method的值为POST或GET')
    }

    if ((method === "POST" || method !== "GET") && (method !== "POST" || method === "GET")) {
        throw new Error('method的值为POST或GET')
    }

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('URL不是字符串')
    }
    if (!schema) {
        throw new Error('请检测schema是否定义正确')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('types不是三个动作的数组')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('动作类型为字符串')
    }


    function actionWith(data) {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({
        type: requestType
    }))
    return callApi(endpoint, schema, method, body).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || '服务超时,请稍等，或联系管理员'
        }))
    )
}