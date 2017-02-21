import React from 'react'
import {
    Route,
    IndexRoute,
} from 'react-router'
import App from './App'
import Index from './Student/Index'
import SearchIndex from './Student/SearchIndex'
import ActivityList from './Student/ActivityList'
import MileageList from './Student/MileageList'
import StudentInfo from './Student/StudentInfo'


// import App from './App'
// import Index from './Student/Index'
// import Activity from './Student/activity'
// import Information from './Student/information'
// import Onestudent from './Student/onestudent'

import ActiveIndex from './Activity/Index'
import AddActivity from './Activity/AddActivity'
import ActivityDetails from './Activity/ActivityDetails'
import ActiveMember from './Activity/ActiveMember'
import ActiveSearchIndex from './Activity/ActiveSearchIndex'

import ClubIndex from './Club/Index'
import ClubActivity from './Club/ActivityList'
import EditClub from './Club/EditClub'
import ClubInfo from './Club/ClubInfo'
import ClubMemberList from './Club/MemberList'
import ClubSearchIndex from './Club/ClubSearchIndex'

// import SetUp from './SetUp/Index'
// import AddUseradmin from './SetUp/adduseradmin'
// import ClubChange from './SetUp/clubchange'
// import ClubCreate1 from './SetUp/clubcreate1'
// import SetClub from './SetUp/setclub'
// import SetIndex from './SetUp/setIndex'
// import UserChange from './SetUp/userchange'
// import UserLevel from './SetUp/userlevel'

import SetUp from './SetUp/Index'
import SetRule from './SetUp/SetRule'
import SetClub from './SetUp/SetClub'
import AddUserAdmin from './SetUp/AddUserAdmin'
import EditPassword from './SetUp/EditPassword'
//import ClubChange from './SetUp/clubchange'
import AddClub from './SetUp/AddClub'

import UserLevelEdit from './SetUp/UserLevelEdit'
import UserLevel from './SetUp/UserLevel'


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="student" component={Index} >
			<Route path="search/:studentNo(/:page)" component={SearchIndex} />
        	<Route path="studentinfo/:id" component={StudentInfo} />
        	<Route path="activity/:id" component={ActivityList} />
        	<Route path="mileage/:id" component={MileageList} />
			<Route path=":page" component={Index} />
        </Route>
        <Route path="activity" component={ActiveIndex} >
            <Route path="search/:searchQuery(/:page)" component={ActiveSearchIndex} />
            <Route path="addactivity" component={AddActivity} />
            <Route path="details/:id" component={ActivityDetails} />
            <Route path="member/:id" component={ActiveMember} />
            <Route path=":page" component={ActiveIndex} />
        </Route>
        <Route path="club" component={ClubIndex} >
            <Route path="search/:searchQuery(/:page)" component={ClubSearchIndex} />
            <Route path="activity/:id" component={ClubActivity} />
            <Route path="member/:id" component={ClubMemberList} />
            <Route path="clubInfo/:id" component={ClubInfo} />
            <Route path="editclub/:id" component={EditClub} />
            <Route path=":page" component={ClubIndex} />
        </Route>
        <Route path="setup" component={SetUp} >
            <Route path="adduseradmin" component={AddUserAdmin} />
            <Route path="edituseradmin/:id" component={AddUserAdmin} />
            <Route path="editpassword/:id" component={EditPassword} />
            <Route path="addclub" component={AddClub} />
            <Route path="editclub/:id(/:typepage)" component={AddClub} />
            <Route path="setclub(/:page)" component={SetClub} />
            <Route path="setrule" component={SetRule} />
            <Route path="userleveledit" component={UserLevelEdit} />
            <Route path="userlevel" component={UserLevel} />
            <Route path=":page" component={SetUp} />
        </Route>
    </Route>
)

// export default (
//     <Route path="/" component={App}>
//         <IndexRoute component={Index}/>
//         <Route path="index/:page" component={Index} >
//         	<Route path="Activity" component={Activity} />
//         	<Route path="Information" component={Information} />
//         	<Route path="Onestudent" component={Onestudent} />
//         </Route>

//         <Route path="Activeindex" component={Activity} >
//         	<Route path="Activechange" component={Activechange} />
//         	<Route path="Activecreate" component={Activecreate} />
//         	<Route path="Activeinformation" component={Activeinformation} />
//         	<Route path="Activepeople" component={Activepeople} />
//         </Route>

//          <Route path="Clubindex" component={Clubindex} >
//         	<Route path="Clubactive" component={Clubactive} />
//         	<Route path="Clubchange" component={Clubchange} />
//         	<Route path="Clubinformation" component={Clubinformation} />
//         	<Route path="Clubpeople" component={Clubpeople} />
//         </Route>

//         <Route path="SetUp" component={SetUp} >
//         	<Route path="AddUseradmin" component={AddUseradmin} />
//         	<Route path="ClubChange" component={ClubChange} />
//         	<Route path="ClubCreate1" component={ClubCreate1} />
//         	<Route path="SetClub" component={SetClub} />
//         	<Route path="SetIndex" component={SetIndex} />
//         	<Route path="UserChange" component={UserChange} />
//         	<Route path="UserLevel" component={UserLevel} />
//         </Route>
//     </Route>
// )