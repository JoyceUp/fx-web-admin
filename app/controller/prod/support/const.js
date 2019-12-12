/**
 * 服务端API请求地址
 * Created by zlp on 2017-12-25.
 */

// const base_url = "http://172.7.0.204:8082/fx-api-admin/";
//  const base_url = "http://10.202.0.32:8080/fx-api-admin/";   //production
// const base_url = "http://172.7.1.160:8080/"; //郭杰
// const base_url = "http://172.7.1.103:8080/"; //海山
// const base_url = "http://172.7.1.242:8080/"; //张宏伟
const base_url = "http://172.7.1.65:8080/";  //陈长石
// const base_url = "http://172.5.1.150:8080/"; //于广岳

// const base_url = "http://localhost:8080/"; //宋志涛
// const base_url = "http://172.7.1.111:8080/"; //宋志涛
// const base_url = "http://172.7.1.224:8080/"; //吴朋

const version = "api/v1/";
module.exports = {
    //请求方法
    request_types: {
        GET: 'get',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    //<公共接口>
    common: {
        email_unique: base_url + "common/v1/email_unique",             //验证email唯一性 get
        send_email_verify_code: base_url + "common/v1/verify_code",    //获取验证码到邮箱 get
        get_rate: base_url + "common/v1/rate",                         //获取汇率 get
        upload_img: base_url + "common/v1/images",                     //上传图片 post
        get_img: base_url + "common/v1/images/",                       //获取图片 get
        get_img_liu: base_url + "common/v1/images/",                   //获取图片 get
    },
    //#登录
    login: {
        login: base_url + "login",                          //登入
        logout: base_url + "logout",                        //登出
        setting: base_url + version + "setting"             //设置
    },
    //#资金管理
    manage: {
        dep_draw: base_url + version + "ib/fund/dep_draw",      //出入金列表
        transfer: base_url + version + "ib/fund/transfer",      //转账记录列表
        commission: base_url + version + "ib/fund/commission",  //返佣
        rebate: base_url + version + "ib/fund/rebate",          //返利
    },
    //#资金管理
    money: {
        //入金管理
        deposit_list: base_url + version + "admin/order/deposit",                           //入金列表  get
        deposit_details: base_url + version + "admin/order/deposit/",                       //入金详情 get
        deposit_confirm: base_url + version + "admin/order/deposit/confirm",                //财务处理 put
        deposit_ignore: base_url + version + "admin/order/deposit/ignore",                  //财务或资金岗忽略订单 put
        deposit_increase: base_url + version + "admin/order/deposit/increase",              //资金岗同意资金入账 put
        deposit_manual_increase: base_url + version + "admin/order/deposit/manual_increase",//资金岗手动处理入账后变更状态为已完成 put
        deposit_export: base_url + version + "admin/order/deposit/export",                  //导出数据 get

        //出金管理
        withdraw_list: base_url + version + "admin/order/withdraw",             //出金列表 get
        withdraw_details: base_url + version + "admin/order/withdraw/",             //出金详情 get
        withdraw_decrease: base_url + version + "admin/order/withdraw/decrease",             //资金岗扣款 put
        withdraw_finish: base_url + version + "admin/order/withdraw/finish",                //财务给银行打款完成 put
        withdraw_ignore: base_url + version + "admin/order/withdraw/ignore",                //资金岗忽略订单 put
        withdraw_manual_decrease: base_url + version + "admin/order/withdraw/manual_decrease",             //资金岗手动扣款 put
        withdraw_back: base_url + version + "admin/order/withdraw/back",             //资金岗退回订单 put
        withdraw_export: base_url + version + "admin/order/withdraw/export",             //导出数据 get
        withdraw_export_bankcard: base_url + version + "admin/order/withdraw/bankcardexport",             //导出数据 get
        withdraw_export_tt: base_url + version + "admin/order/withdraw/ttexport",             //导出数据 get

        //转账管理
        transfer_list: base_url + version + "admin/order/transfer",                             //转账列表 get
        transfer_details: base_url + version + "admin/order/transfer/",                         //转账详情 get
        transfer_ignore: base_url + version + "admin/order/transfer/ignore",                    //资金岗忽略转账订单 put
        transfer_manual_transfer: base_url + version + "admin/order/transfer/manual_transfer",  //资金岗手动完成转账 put
        transfer_transfer: base_url + version + "admin/order/transfer/transfer",                //资金岗完成转账 put
        transfer_export: base_url + version + "admin/order/transfer/export",                    //导出数据 get

        //余额清零管理
        clear_balance_list: base_url + version + "admin/order/clear_balance",                       //余额清零列表 get
        clear_balance_details: base_url + version + "admin/order/clear_balance/",                   //余额清零详情 get
        clear_balance_clear: base_url + version + "admin/order/clear_balance/clear",                //资金岗完成余额清零 put
        clear_balance_ignore: base_url + version + "admin/order/clear_balance/ignore",              //资金岗忽略订单 put
        clear_balance_manual_clear: base_url + version + "admin/order/clear_balance/manual_clear",  //资金岗手动完成余额清零 put
        clear_balance_export: base_url + version + "admin/order/clear_balance/export",              //导出数据 get

        //返利管理(财务审核)
        rebate_list: base_url + version +  "admin/finance/audit",                           //a返利明细列表 get

        one_day: base_url + version + "admin/finance/audit/rebate/detail",                  //b获取当天的返利明细 get
        export_one_day: base_url + version + "admin/finance/audit/rebate/export",           //b获取当天的返利明细导出 get
        confirm_one_day: base_url + version + "admin/finance/audit/rebate/deal/",           //b财务打返利操作 PUT
        repeat_one_day: base_url + version + "admin/finance/audit/recalcrebate",            //b重新生成当天为生成的返利明细 PUT

        one_day_info_list: base_url + version + "admin/finance/audit/custrebate/detail",            //c获取客户返利明细列表 get
        export_one_day_info_list: base_url + version + "admin/finance/audit/custrebate/export",     //c获取客户返利明细列表导出 get

        one_day_info_list2: base_url + version + "admin/finance/audit/custrebate/detail2",          //c获取客户返利明细列表 get
        export_one_day_info_list2: base_url + version + "admin/finance/audit/custrebate/export2",   //c获取客户返利明细列表导出 get
        export_one_day_summary: base_url + version + "admin/finance/audit/custrebate/summary",      //汇总 get

        //返利转余额管理
        rebate_to_balance_list: base_url + version + "admin/order/rebate_to_balance",               //返利转余额列表 get
        rebate_to_balance_details: base_url + version + "admin/order/rebate_to_balance/",           //返利转余额详情 get
        rebate_to_balance_export: base_url + version + "admin/order/rebate_to_balance/export",      //导出数据 get

        //返佣补算
        process_lost_commission: base_url + version + "admin/schedule/process_lost_commission",     //返佣补算 post
        //提成补算
        process_lost_reward: base_url + version + "admin/schedule/process_lost_reward",             //提成补算 post

        //跨系统内部转账
        pre_transfer_custinfo: base_url + version + "admin/order/pre_transfer/custinfo",            //获取新系统账户信息 get
        pre_transfer_pre_custinfo: base_url + version + "admin/order/pre_transfer/pre_custinfo",    //获取老系统账户信息 get
        pre_transfer_pre_withdraw: base_url + version + "admin/order/pre_transfer/pre_withdraw",    //老系统转出 put
        pre_transfer_deposit: base_url + version + "admin/order/pre_transfer/new_deposit",          //新系统转入 put
        pre_transfer_deposit_withdraw: base_url + version + "admin/order/pre_transfer/new_transfer"
    },
    //#奖金管理
    bonus: {
        //工资奖金管理
        wages:{
            wages_list:base_url + version+"admin/fund/company_payment",  //获取列表

            handle:base_url + version+"admin/fund/company_payment/",  //执行发放或查询发放详情
            //  Upload:base_url + version+"admin/fund/company_payment",  //上传文件

            payment_accept:base_url + version+"admin/fund/company_payment_accept",  //导入(受理)文件
            payment_accept_result:base_url + version+"admin/fund/company_payment_accept_result",  //查询导入文件结果

            payment_send_accept:base_url + version+"admin/fund/company_pay_send_accept/",  //执行(受理)发放
            payment_send_accept_result:base_url + version+"admin/fund/company_pay_send_accept_result/",  //查询发放结果


            log:base_url + version+"admin/fund/operation_log"   //操作日志
        },


        //业绩查询
        achievement_list: base_url + version + "admin/data/sale_performance/all",                   //列表 get
        achievement_export: base_url + version + "admin/data/sale_performance/all",                      //导出数据 get
        achievement_details: base_url + version + "admin/data/sale_performance/detail",             //详情 get
        achievement_sale_rebate: base_url + version + "admin/data/sale_performance/sale_rebate/list_common",    //余额返利
        achievement_sale_commission: base_url + version + "admin/data/sale_performance/sale_commission/list",   //交易返佣
        achievement_sale_reward_ecn: base_url + version + "admin/data/sale_performance/common_sale_reward/list_ecn",            //销售提成非直客ECN
        achievement_sale_reward_standard: base_url + version + "admin/data/sale_performance/common_sale_reward/list_common",    //销售提成非直客标准
        achievement_chief_inspector_reward_ecn: base_url + version + "admin/data/sale_performance/department_sale_reward/list_ecn",         //总监提成ECN
        achievement_chief_inspector_reward_standard: base_url + version + "admin/data/sale_performance/department_sale_reward/list_common", //总监提成标准

        //返利明细
        interest_list: base_url + version + "admin/report/get_rebate_reward_info_page",             //列表 get
        interest_export: base_url + version + "admin/report/get_rebate_reward_info_excel",          //导出数据 get

        //返佣明细
        commission_list: base_url + version + "admin/report/get_commission_order_page",            //列表 get
        commission_export: base_url + version + "admin/report/get_commission_order_excel",         //导出数据 get

        //[X]已平仓交易明细
        close_position_list: base_url + version + "admin/order/deposit",                           //列表 get
        close_position_export: base_url + version + "admin/order/deposit/export",                  //导出数据 get

        //[X]持仓交易明细
        position_list: base_url + version + "admin/order/deposit",                                  //列表 get
        position_export: base_url + version + "admin/order/deposit/export",                         //导出数据 get

        //887代理活动
        ib_activity_list: base_url + version + "admin/data/ib_activity",            //列表 get
    },
    //#财务报表
    report:{
        // 入金流量表
        deposit_list: base_url + version + "admin/data/deposit",                           //入金流量报表  get
        deposit_export: base_url + version + "admin/data/deposit",                  //导出入金流量报表 get

        // 出金流量表
        withdraw_list: base_url + version + "admin/data/withdraw",             //出金流量报表 get
        withdraw_export: base_url + version + "admin/data/withdraw",             //导出出金流量报表 get

        // 转账流量表
        transfer_list: base_url + version + "admin/data/transfer",                             //转账流量报表 get
        transfer_export: base_url + version + "admin/data/transfer",                    //导出转账流量报表 get

        // 出入金汇总表
        sum_list: base_url + version + "admin/data/deposit_withdraw",                             //出入金汇总报表 get
        sum_export: base_url + version + "admin/data/deposit_withdraw",                    //导出出入金汇总报表 get

        // 每日账户余额表
        balance_list: base_url + version + "admin/data/export/balance",                       //每日账户余额报表 get
        balance_export: base_url + version + "admin/data/export/balance",              //导出每日账户余额报表 get

        // 销售每日入金表
        deposit_sales_export: base_url + version + "admin/data/export/daily/deposit",                  //导出销售每日入金报表 get

        // 团队每日净入金表
        deposit_team_export: base_url + version + "admin/data/export/daily/net_deposit",                  //导出团队每日净入金报表 get
    },
    //系统管理
    auth: {
        user: base_url + version + "user",                  //用户管理
        resource: base_url + version + "resource",          //资源管理
        role: base_url + version + "role",                  //角色管理
        role_update: base_url + version + "role/update",    //角色管理
        online: base_url + version + "online",              //在线用户
        operation: base_url + version + "log/operation",    //行为日志
        parameter: base_url + version + "system_setting",        //系统参数
        history: base_url + version + "system_setting/sys_setting_history",        //历史记录
    },

    sales: {
        sale: {
            list: base_url + version + 'admin/sales',                   //销售列表
            info: base_url + version + 'admin/sales/info',              //销售基本信息
            customer: base_url + version + 'admin/sales/customer',      //销售的客户列表
            ib: base_url + version + 'admin/sales/ib',                  //销售的代理

            commission: base_url + version + 'admin/sales/commission',   //返佣
            rebate: base_url + version + 'admin/sales/rebate',           //返利

            reward: base_url + version + 'admin/sales/reward',           //提成
        },
        organization: {
            list: base_url + version + 'admin/organization',                        // 获取资源树
            company : base_url + version + 'admin/organization/company',            // 添加/删除/修改  公司
            department : base_url + version + 'admin/organization/department',      // 添加/删除/修改  部门
            team : base_url + version + 'admin/organization/team',                  // 添加/删除/修改  组别
        },
        hr: {
            list: base_url + version + 'admin/organization/sales_hr',               //人员列表
            add: base_url + version + 'admin/organization/sales_hr/add',            //添加销售
            info: base_url + version + 'admin/organization/sales_hr/info',          //销售基本信息
            remove: base_url + version + 'admin/organization/sales_hr/remove',      //删除销售
            update: base_url + version + 'admin/organization/sales_hr/update',      //更新销售
            update_password: base_url + version + 'admin/organization/sales_hr/update_password',      //更新销售密码
        }
    },

    //#代理管理
    agents: {
        apply_list: base_url + version + "admin/ib/apply",          //登记待审核代理  -- 列表
        potential_list: base_url + version + "admin/ib/potential",  //潜在代理列表  -- 列表
        ib_list: base_url + version + "admin/ib",                   //代理列表
        ib_info: base_url + version + "admin/ib/info",              //代理详情
        account_list: base_url + version + "admin/ib/account",      //代理账户信息
        customer_list: base_url + version + "admin/ib/relation/customer",            //代理客户信息
        deposit_withdraw_list: base_url + version + "admin/ib/fund/deposit_withdraw",//代理资金信息   出入金信息
        transfer_list: base_url + version + "admin/ib/fund/transfer",                //代理资金信息    转账信息
        rebate_balance_list: base_url + version + "admin/ib/fund/rebate_balance",    //代理资金信息    返利转余额信息
        commission_list: base_url + version + "admin/ib/fund/commission",            //代理资金信息    返佣信息
        rebate_list: base_url + version + "admin/ib/fund/rebate",                    //代理资金信息    返利信息
        record_list: base_url + version + "admin/ib/record",                         //代理沟通信息
    },
    //#客户管理
    customers: {
        potential_list: base_url + version + "admin/customer/potential",    //潜在用户
        customer_list: base_url + version + "admin/customer",               //注册用户
    },
    //#关系管理
    relation:{
        //客户关系管理
        customer_mngt: base_url + version + "admin/relation/customer_mngt",                     //获取客户列表 get
        customer_mngt_ib: base_url + version + "admin/relation/customer_mngt/ib",               //获取代理列表 get
        customer_mngt_set_ib: base_url + version + "admin/relation/customer_mngt/set_ib",       //设置代理 put
        customer_mngt_sales: base_url + version + "admin/relation/customer_mngt/sales",         //获取销售列表 get
        customer_mngt_set_sales: base_url + version + "admin/relation/customer_mngt/set_sales", //设置销售 put

        //代理关系管理
        ib_mngt: base_url + version + "admin/relation/ib_mngt/ib",                  //获取代理列表 get
        ib_mngt_sales: base_url + version + "admin/relation/ib_mngt/sales",         //获取销售列表 get
        ib_mngt_set_sales: base_url + version + "admin/relation/ib_mngt/set_sales", //设置销售 put

        //账户关系管理
        account_mngt: base_url + version + "admin/relation/account_mngt/",          //获取客户列表 get

        //客户关系管理记录
        history_customer: base_url + version + "admin/relation/history/customer",   //获取客户关系变更历史列表 get
        //history_account: base_url + version + "admin/relation/history/account",   //获取客户账户关系变更历史列表 get
        history_ib: base_url + version + "admin/relation/history/ib",               //获取代理关系变更历史列表 get
    },
    //#账号管理
    accounts:{
        //客户账号管理
        account_list:  base_url + version + "admin/account/customer",
        account_enable: base_url + version + "admin/customer/account/enable",
        account_disable: base_url + version + "admin/customer/account/disable",
        account_delete: base_url + version + "admin/customer/account/delete",
        account_resend_email: base_url + version + "admin/customer/account/resend_email",
        account_set_read_only: base_url + version + "admin/customer/account/set_read_only",
        account_update_password: base_url + version + "admin/customer/account/update_password",

        account_info: base_url + version + "admin/account/customer/basic",     //get 获取客户基本信息 参数是owner_id
        account_deposit: base_url + version +"admin/account/customer/deposit", //get 获取客户账户入金信息
      /*  account_images: base_url + version + "admin/customer/info/bankcard",//get 获取客户银行卡信息
        account_address: base_url + version + "admin/customer/info/address",//get 获取客户银行卡信息*/
        account_in_money_list: base_url + version + "admin/customer/fund/deposit_withdraw",  //获取客户出入金信息
        accounts_export: base_url + version + "admin/account/customer/export",  //导出客户账号列表


        //代理账号管理
        agents_account_list: base_url + version +"admin/account/ib",
        agents_account_delete: base_url + version +"admin/account/basic",
        agents_account_disable: base_url + version +"admin/ib/account/disable",
        agents_account_enable: base_url + version +"admin/ib/account/enable",
        agents_account_resend_email: base_url + version +"admin/ib/account/resend_email",
        agent_account_info: base_url + version +"admin/account/basic",
        agent_account_images:base_url + version +"admin/ib/info/bankcard",
        agent_account_export: base_url + version + "admin/account/export",//导出代理账号列表
    },

}


