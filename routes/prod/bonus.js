/**
 * Created by szt 2018.01.03.
 */



let express = require('express');
let router = express.Router();
let money = require("../../app/controller/prod/bonus");

//#奖金管理
//业绩查询
router.post("/achievement/list", money.achievement.list);               //列表
router.post("/achievement/export", money.achievement.export);           //导出数据
router.post("/achievement/details", money.achievement.details);         //详情
router.post("/achievement/sale_rebate", money.achievement.sale_rebate);         //余额返利
router.post("/achievement/sale_commission", money.achievement.sale_commission); //交易返佣
router.post("/achievement/sale_reward_ecn", money.achievement.sale_reward_ecn);             //销售提成非直客ECN
router.post("/achievement/sale_reward_standard", money.achievement.sale_reward_standard);   //销售提成非直客标准
router.post("/achievement/chief_inspector_reward_ecn", money.achievement.chief_inspector_reward_ecn);           //总监提成ECN
router.post("/achievement/chief_inspector_reward_standard", money.achievement.chief_inspector_reward_standard); //总监提成标准
//返利明细
router.post("/interest/list", money.interest.list);                 //列表
router.post("/interest/export", money.interest.export);             //导出数据
//返佣明细
router.post("/commission/list", money.commission.list);             //列表
router.post("/commission/export", money.commission.export);         //导出数据
//已平仓交易明细
router.post("/close_position/list", money.close_position.list);     //列表
router.post("/close_position/export", money.close_position.export); //导出数据
//持仓交易明细
router.post("/position/list", money.position.list);                 //列表
router.post("/position/export", money.position.export);             //导出数据
//887代理活动
router.post("/ib_activity/list", money.ib_activity.list);             //列表
router.post("/ib_activity/export", money.ib_activity.export);         //导出数据


// 工资奖金管理
router.post("/list", money.wages_list.list);                   //工资列表

router.post("/payment_send_accept", money.wages_list.payment_send_accept);               //执行发放受理
router.post("/payment_send_accept_result", money.wages_list.payment_send_accept_result); //执行发放结果

router.post("/payment_accept", money.wages_list.payment_accept);                //导入数据受理
router.post("/payment_accept_result", money.wages_list.payment_accept_result);  //导入数据结果

router.post("/info", money.wages_list.info);    //详情
router.post("/log", money.wages_list.log);      //发放日志

module.exports = router;