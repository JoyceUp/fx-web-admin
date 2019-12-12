import Content from './views/Content.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Log from './views/system/Log.vue'
import onlineUser from './views/system/onlineUser.vue'
import Role from './views/system/Role.vue'
import sysParam from './views/system/sysParam.vue'
import historyRecord from './views/system/HistoryRecord'
import Resource from './views/system/Resource.vue'
import Users from './views/system/Users.vue'
import setUser from './views/system/setUser'
import Customers from './views/customers/enrolled/Customers.vue'
import CustomerDetail from './views/customers/enrolled/CustomerDetail.vue'
import potentialCustomers from './views/customers/PotentialCustomers.vue'
import potentialCustomersDetail from './views/customers/PotentialCustomersDetail.vue'

import agentList from  './views/proxy/agentList'
import agentDetails from  './views/proxy/agentDetails'
import agentRegister from  './views/proxy/agentRegister'
import agentRegisterDetails from  './views/proxy/agentRegisterDetails'
import agentPendingReview from  './views/proxy/pendingReview'
// import agentContracts from  './views/proxy/agentContracts'
import agentPotential from  './views/proxy/agentPotential'
import agentPotentialDetails from  './views/proxy/agentPotentialDetails'

import CustomerAccounts from './views/account/CustomerAccounts';
import AgentAccounts from './views/account/AgentAccounts'

//资金管理
import deposit from './views/money/deposit'
import withdraw from './views/money/withdraw'
import transferMoney from './views/money/transfer'
import cleanBalance from './views/money/clean_balance'
import rebate from './views/money/rebate'
import rebate_to_balance from './views/money/rebate_to_balance'
import lost_commission from './views/money/lost_commission'
import lost_reward from './views/money/lost_reward'
import internal_transfer_of_system from './views/money/internal_transfer_of_system'


//奖金管理
import achievement from './views/bonus/achievement'
import interest from './views/bonus/interest'
import commission from './views/bonus/commission'
import closePosition from './views/bonus/close_position'
import position from './views/bonus/position'
import agent_activity from './views/bonus/agents_activity';
import wage from './views/bonus/wage';
import wageLog from './views/bonus/wage_log';

//销售管理
import department from './views/sale/department'
import personnel from './views/sale/personnel/index'
import personnelList from './views/sale/personnel/list'
import personnelInfo from './views/sale/personnel/info'

import saleList from './views/sale/list.vue'
import saleDetails from './views/sale/details.vue'


//import accountList from './views/relation/accountList.vue'
import customerList from './views/relation/customerList.vue'
import proxyList from './views/relation/proxyList.vue'
//import accountModifiedLog from './views/relation/accountModifiedLog.vue'
import customerModifiedLog from './views/relation/customerModifiedLog.vue'
import proxyModifiedLog from './views/relation/proxyModifiedLog.vue'

//财务报表
//import report_deposit from './views/report/deposit.vue'
//import report_withdraw from './views/report/withdraw.vue'
//import report_transfer from './views/report/transfer.vue'
import report_sum from './views/report/sum.vue'
import report_balance from './views/report/balance.vue'
import report_deposit_sales from './views/report/deposit_sales.vue'
import report_deposit_team from './views/report/deposit_team.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        perm:'',
        code:'10020',
        component: Home,
        name: '客户管理',
        iconCls: 'iconfont icon-kehu',
        meta:"/",
        children: [
            { path: '/potential_customers', component: Content, name: '潜在客户' ,meta:"/potential_customers",code:"30020",redirect:'/',
                children:[
                    { path: '/', component: potentialCustomers, name: '潜在客户列表' ,code:"30020", hidden: true,meta:"/potential_customers"},
                    { path: '/detail/:id', component: potentialCustomersDetail, name: '潜在用户详情',code:"30040", hidden: true,meta:"/potential_customers"}
                ]
            },
         /*   { path: '/potential_customers', component: potentialCustomers, name: '潜在客户' ,code:"30020" },
            { path: '/potential_customers/detail/:id', component: potentialCustomersDetail, name: '潜在用户详情' ,code:"30040", hidden: true, },*/
            { path: '/customers', component: Customers, name: '注册客户',code:"30010",meta:"/customers"},
            { path: '/customers/detail/:id', component: CustomerDetail, name: '用户详情',code:"50010", hidden: true,meta:"/customers"}
        ]
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        perm:'',
        code:'10030',
        component: Home,
        name: '代理管理',
        iconCls: 'iconfont icon-dailizizhizizhiqiyezizhi',
        children: [
            { path: '/regist', component: agentRegister, name: '登记待审核代理' ,code:"30010" ,meta:"/regist"},
            { path: '/potential', component:agentPotential , name: '潜在代理列表',code:"30040",meta:"/potential"},
            { path: '/potential/details/:id', component: agentPotentialDetails, name: '潜在代理详情',code:"50010", hidden: true ,meta:"/potential"},
            { path: '/pendingreview', component:agentPendingReview , name: '注册待审核列表',code:"30020",meta:"/pendingreview"},
            { path: '/pendingreview/details/:id', component: agentRegisterDetails, name: '代理注册信息',code:"50010", hidden: true ,meta:"/pendingreview"},
            { path: '/proxy', component: agentList, name: '代理列表' ,code:"30030",meta:"/proxy"},
            { path: '/proxy/details/:id', component: agentDetails, name: '代理详情',code:"50010", hidden: true ,meta:"/proxy"},

            // { path: '/contracts', component: agentContracts, name: '代理合同管理' ,code:"30050" },
        ]
    },
    {
        path: '/sale',
        perm: '',
        code: '10040',
        component: Home,
        name: '销售管理',
        iconCls: 'iconfont icon-xiaoshourenyuanguanli',
        children: [
            {path: '/sale/list', component: saleList, name: '销售列表', code: "40010",meta:"/sale/list"},
            {path: '/sale/details/:id', component: saleDetails, name: '销售详情', code: "", hidden: true,meta:"/sale/list"},
            { path: '/department', component: department, name: '机构管理' ,code:"30020",meta:"/department"},
            { path: '/personnel', component: personnel, name: '人员管理' ,code:"30030",redirect:'/list',meta:"/personnel",
                children:[
                    { path: '/list', component: personnelList, name: '列表' ,code:"30010", hidden: true,meta:"/personnel"},
                    { path: '/info/:id', component: personnelInfo, name: '详情',code:"30020", hidden: true,meta:"/personnel"},
                    { path: '/personnel/add', component: personnelInfo, name: '添加',code:"30030", hidden: true,meta:"/personnel"},
                ]
            }
        ]
    },
    {
        path: '/money',
        perm:'',
        code:'10010',
        component: Home,
        name: '资金管理',
        iconCls: 'iconfont icon-9',
        children: [
            { path: '/deposit', component: deposit, name: '入金管理' ,code:"30010",meta:"/deposit"},
            { path: '/withdraw', component: withdraw, name: '出金管理',code:"30020",meta:"/withdraw"},
            { path: '/transfer', component: transferMoney, name: '转账管理' ,code:"30030",meta:"/transfer"},
            { path: '/clean_balance', component: cleanBalance, name: '余额清零管理' ,code:"30040",meta:"/clean_balance"},
            { path: '/rebate', component: rebate, name: '返利管理' ,code:"30060",meta:"/rebate"},
            /*{ path: '/rebate_to_balance', component: rebate_to_balance, name: '返利转余额' ,code:"30050",meta:"/rebate_to_balance"},*/
            { path: '/lost_commission', component: lost_commission, name: '返佣补算' ,code:"30070",meta:"/lost_commission"},
            { path: '/lost_reward', component: lost_reward, name: '提成补算' ,code:"30080",meta:"/lost_reward"},
            { path: '/internal_transfer_of_system', component: internal_transfer_of_system, name: '跨系统内部转账' ,code:"30090",meta:"/internal_transfer_of_system"}
        ]
    },
    {
        path: '/bonus',
        perm:'',
        code:'10140',
        component: Home,
        name: '奖金管理',
        iconCls: 'iconfont icon-9',
        children: [/*
            { path: '/wage', component: wage, name: '工资发放' ,code:"30010",meta:"/wage"},
            { path: '/wage_log', component: wageLog, name: '工资发放日志' ,code:"30010",meta:"/wage_log"},*/
            { path: '/achievement', component: achievement, name: '业绩查询' ,code:"30010",meta:"/achievement"},
            { path: '/interest', component: interest, name: '返利明细',code:"30020",meta:"/interest"},
            { path: '/commission', component: commission, name: '返佣明细' ,code:"30030",meta:"/commission"},
            { path: '/ib_activity', component: agent_activity, name: '887代理活动' ,code:"30060",meta:"/ib_activity"},
            { path: '/close_position', component: closePosition, name: '已平仓交易明细' ,code:"30040",meta:"/close_position"},
            { path: '/position', component: position, name: '持仓交易明细' ,code:"30050",meta:"/position"}
        ]
    },
    {
        path: '/report',
        perm:'',
        code:'10150',
        component: Home,
        name: '财务报表',
        iconCls: 'iconfont icon-9',
        children: [
            /*{ path: '/report/deposit', component: report_deposit, name: '入金流量表' ,code:"30010",meta:"/report/deposit"},
            { path: '/report/withdraw', component: report_withdraw, name: '出金流量表',code:"30020",meta:"/report/withdraw"},
            { path: '/report/transfer', component: report_transfer, name: '转账流量表' ,code:"30030",meta:"/report/transfer"},*/
            { path: '/report/sum', component: report_sum, name: '资金流水表' ,code:"30040",meta:"/report/sum"},
            { path: '/report/balance', component: report_balance, name: '每日账户余额表' ,code:"30050",meta:"/report/balance"},
            { path: '/report/deposit_sales', component: report_deposit_sales, name: '销售每日入金表' ,code:"30060",meta:"/report/deposit_sales"},
            { path: '/report/deposit_team', component: report_deposit_team, name: '团队每日净入金表' ,code:"30070",meta:"/report/deposit_team"}
        ]
    },





    {
        path: '/relation',
        perm: '',
        code: '10180',
        component: Home,
        name: '关系管理',
        iconCls: 'iconfont icon-duocengjiegou',
        children: [
            {path: '/relation/customer_list', component: customerList, name: '客户归属变更', code: "30010",meta:"/relation/customer_list"},
            {path: '/relation/proxy_list', component: proxyList, name: '代理归属变更', code: "30020",meta:"/relation/proxy_list"},
            {path: '/relation/customer_modified', component: customerModifiedLog, name: '变更客户归属记录', code: "30030",meta:"/relation/customer_modified"},
            {path: '/relation/proxy_modified', component: proxyModifiedLog, name: '变更代理归属记录', code: "30040",meta:'/relation/proxy_modified'}
        ]
    },

    {
        path: '/',
        perm:'',
        code:'10120',
        component: Home,
        name: '账号管理',
        iconCls: 'iconfont icon-zhanghaoguanli',
        children: [
            { path: '/customer_account', component: CustomerAccounts, name: '客户账号列表' ,code:"30010",meta:'/customer_account'},
            { path: '/agent_account', component: AgentAccounts, name: '代理账号列表',code:"30020",meta:'/agent_account'}
        ]
    },
    {
        path: '/',
        perm: '',
        code: '100000',
        component: Home,
        name: '系统管理',
        iconCls: 'iconfont icon-xitongshezhi',
        children: [
            {path: '/users', component: Users, name: '用户管理', code: "103500",meta:'/users'},
            {path: '/resource', component: Resource, name: '资源管理', code: "103000",meta:'/resource'},
            {path: '/role', component: Role, name: '角色管理', code: "102500",meta:'/role'},
            {path: '/onlineuser', component: onlineUser, name: '在线用户', code: "102000",meta:'/onlineuser'},
            {path: '/log', component: Log, name: '行为日志', code: "100500",meta:'/log'},
            {path: '/sysparam', component: sysParam, name: '系统参数', code: "101000",meta:'/sysparam'},
            {path: '/history', component: historyRecord, name: '参数历史记录', code: "30090",meta:'/history'},
            {path: '/setuser', component: setUser, name: '个人设置', hidden: true},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];


export default routes;