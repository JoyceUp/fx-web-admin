import axios from 'axios';
let base ='accounts';

//客户账号列表
export const accountsList = params =>{
    return  axios.post(`${base}/accounts/list`,params);
};

//账号明细
export const accountDetail = params =>{
    return axios.post(`${base}/accounts/info`,params);
}

//更新账号
export const enableAccount = params =>{
    return axios.post(`${base}/accounts/enable`,params);
}

export const getDepositList = params =>{
    return axios.post(`${base}/accounts/deposit/list`,params);
}

//客户账号导出
export const exportCustomer = params =>{
    return axios.post(`${base}/accounts/customer/export`,params,{responseType:'arraybuffer'});
}


//代理账号 列表
export const agentAccountList = params =>{
    return axios.post(`${base}/accounts/agent/list`,params);
}
//账号明细
export const agentAccountDetail = params =>{
    return axios.post(`${base}/accounts/agent/info`,params);
}

//代理账号导出
export const exportAgent = params =>{
    return axios.post(`${base}/accounts/agent/export`,params,{responseType:'arraybuffer'});
}
