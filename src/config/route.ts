import Index from "../page/Index.vue"
import TeamPage from "../page/TeamPage.vue"
import SearchPage from "../page/SearchPath.vue"

import UserPage from "../page/UserPage.vue"
import UserUpdatePage from "../page/UserUpdatePage.vue"
import UserTeamCreatePage from "../page/UserTeamCreatePage.vue"
import UserTeamJoinPage from "../page/UserTeamJoinPage.vue"


import UserEditPage from "../page/UserEditPage.vue"
import SearchResultPage from "../page/SearchResultPath.vue"
import UserLoginPage from "../page/UserLoginPage.vue"
import TeamAddPage from "../page/TeamAddPage.vue"
import TeamUpdatePage from "../page/TeamUpdateTeam.vue"



const routes = [
    { path: '/', component: Index },
    { path: '/team',title: '找队伍', component: TeamPage },
    { path: '/user',title: '个人信息', component: UserPage },
    { path: '/search',title: '找伙伴', component: SearchPage },
    { path: '/user/list',title: '用户列表', component: SearchResultPage },
    { path: '/user/edit',title: '编辑信息', component: UserEditPage },
    { path: '/user/login',title: '登录', component: UserLoginPage },
    { path: '/team/add',title: '创建队伍', component: TeamAddPage },
    { path: '/team/update',title: '更新队伍', component: TeamUpdatePage },
    { path: '/user/update',title: '更新信息', component: UserUpdatePage },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
]

export default routes;
