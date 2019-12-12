import axios from 'axios';

let base = 'bonus';

// ===========================业绩查询==============================
/**
 * 获取业绩列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementList = params => {
    return axios.post(`${base}/achievement/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementExport = params => {
    return axios.post(`${base}/achievement/export`, params);
};
/**
 * 业绩详情
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementDetails = params => {
    return axios.post(`${base}/achievement/details`, params);
};
/**
 * 余额返利
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const saleRebate = params => {
    return axios.post(`${base}/achievement/sale_rebate`, params);
};
/**
 * 交易返佣
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const saleCommission = params => {
    return axios.post(`${base}/achievement/sale_commission`, params);
};
/**
 * 销售提成非直客ECN
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const saleRrewardECN = params => {
    return axios.post(`${base}/achievement/sale_reward_ecn`, params);
};
/**
 * 销售提成非直客标准
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const saleRewardStandard = params => {
    return axios.post(`${base}/achievement/sale_reward_standard`, params);
};
/**
 * 总监提成ECN
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const chiefInspectorRewardECN = params => {
    return axios.post(`${base}/achievement/chief_inspector_reward_ecn`, params);
};
/**
 * 总监提成标准
 * update by szt 2018.04.17 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const chiefInspectorRewardStandard = params => {
    return axios.post(`${base}/achievement/chief_inspector_reward_standard`, params);
};

// ===========================返利明细==============================
/**
 * 返利明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const interestList = params => {
    return axios.post(`${base}/interest/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const interestExport = params => {
    return axios.post(`${base}/interest/export`, params);
};

// ===========================返佣明细==============================
/**
 * 返佣明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const commissionList = params => {
    return axios.post(`${base}/commission/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const commissionExport = params => {
    return axios.post(`${base}/commission/export`, params);
};

// ===========================已平仓交易==============================
/**
 * 已平仓交易明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const closePositionList = params => {
    return axios.post(`${base}/close_position/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const closePositionExport = params => {
    return axios.post(`${base}/close_position/export`, params);
};

// ===========================持仓交易==============================
/**
 * 持仓交易明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const positionList = params => {
    return axios.post(`${base}/position/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const positionExport = params => {
    return axios.post(`${base}/position/export`, params);
};

// ===========================887代理活动==============================
/** 887代理活动列表  **/
export const ibActivityList = params => {
    return axios.post(`${base}/ib_activity/list`, params);
};
/** 导出数据 **/
export const ibActivityExport = params => {
    return axios.post(`${base}/ib_activity/export`, params);
};

// =========================== 工资发放 ==============================
/**
 * 获取入工资奖金列表
 * update by wangyusen 2018.03.13
 *
 * **/
export const getWagesList = params => {
    return axios.post(`${base}/list`, params);
};
//发放详情
export const getWagesInfo = params => {
    return axios.post(`${base}/info`, params);
};
//操作日志
export const getWageslog = params => {
    return axios.post(`${base}/log`, params);
};


//导入数据受理
export const flieUpload = params => {
    return axios.post(`${base}/payment_accept`, params);
};
//导入数据结果
export const flieUploadResult = params => {
    return axios.post(`${base}/payment_accept_result`, params);
};


//执行发放
export const handlePerform = params => {
    return axios.post(`${base}/payment_send_accept`, params);
};
//执行发放结果
export const handlePerformResult = params => {
    return axios.post(`${base}/payment_send_accept_result`, params);
};
