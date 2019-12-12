/**
 * Created by zlp on 2017-12-19.
 */
var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");

//导出excel通用方法，
function exportExcel(req, res, header, params, api, type) {
    request.get(api)
        .set(header)
        .responseType("blob")
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '导出' + type + '列表'}, req);
            }
            //导出型api, 返回文件流，在_res.body中, 而不在_res.text中
            //_res.body有可能是文件内容，也可能是错误信息
            var buffer = Buffer.from(_res.body);
            if (_res.header["content-type"]) {
                res.setHeader('Content-Type', _res.header["content-type"]);
            }
            if (_res.header["content-disposition"]) {
                res.setHeader('content-disposition', _res.header["content-disposition"]);
            }
            res.end(buffer);
        });
}


/**
 * 业绩查询
 * **/
exports.achievement = {
    //总览
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-总览'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //导出
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        console.log(params)
        let api = API.bonus.achievement_export;
        exportExcel(req, res, header, params, api, "业绩查询-导出");
    },
    //明细
    details: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_details)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '业绩查询-明细'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    //余额返利
    sale_rebate: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_sale_rebate)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-余额返利'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //交易返佣
    sale_commission: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_sale_commission)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-交易返佣'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //销售提成非直ecn
    sale_reward_ecn: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_sale_reward_ecn)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-销售提成非直ecn'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //销售提成非直标准
    sale_reward_standard: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_sale_reward_standard)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-销售提成非直标准'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //总监提成ecn
    chief_inspector_reward_ecn: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_chief_inspector_reward_ecn)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-总监提成ecn'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //总监提成标准
    chief_inspector_reward_standard: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_chief_inspector_reward_standard)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '业绩查询-总监提成标准'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    }
};
/**
 * 返利明细
 * **/
exports.interest = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.interest_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取返利明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.bonus.interest_export;
        exportExcel(req, res, header, params, api, "导出返利明细");
    }
};
/**
 * 返佣明细
 * **/
exports.commission = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.commission_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取返佣明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.bonus.commission_export;
        exportExcel(req, res, header, params, api, "导出返佣明细");
    }
};
/**
 * 已平仓交易明细
 * **/
exports.close_position = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.close_position_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取已平仓交易明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.bonus.close_position_export;
        exportExcel(req, res, header, params, api, "导出已平仓交易明细");
    }
};
/**
 * 持仓交易明细
 * **/
exports.position = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.position_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取持仓交易明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.bonus.position_export;
        exportExcel(req, res, header, params, api, "导出持仓交易明细");
    }
};
/**
 * 887代理活动
 * **/
exports.ib_activity = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.ib_activity_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取887代理活动列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.bonus.ib_activity_list;
        exportExcel(req, res, header, params, api, "887代理活动");
    }
};


/**
 * 获取工资奖金列表
 * **/
exports.wages_list = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log(API.bonus.wages.wages_list)
        request.get(API.bonus.wages.wages_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取入工资奖金列表'}, req);
                    res.json(JSON.parse(_res.text));
                }else{
                    res.json(_res);
                }

            });
    },

    log:function(req,res){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.wages.log)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getId', 'msg': '操作日志'}, req);
                    res.json(JSON.parse(_res.text));
                }else{
                    res.json(_res);
                }

            });

    },

    info:function(req,res){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let url = API.bonus.wages.handle+req.body.id;
        request.get(url)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getId', 'msg': '查询发放详情'}, req);
                    res.json(JSON.parse(_res.text));
                }else{
                    res.json(_res);
                }

            });

    },


    payment_send_accept: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let url = API.bonus.wages.payment_send_accept+req.body.id;
        request.put(url)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getList', 'msg': '执行发放受理'}, req);
                    res.json(JSON.parse(_res.text));
                }else{

                    res.json(_res);
                }

            });
    },
    payment_send_accept_result: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let url = API.bonus.wages.payment_send_accept_result+req.body.id;
        console.log(url)
        request.put(url)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                console.log(_res.status)
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getList', 'msg': '查询执行发放结果'}, req);
                    res.json(JSON.parse(_res.text));
                }else{

                    res.json(_res);
                }

            });
    },
    payment_accept: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.post(API.bonus.wages.payment_accept)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getList', 'msg': '导入数据受理'}, req);
                    res.json(JSON.parse(_res.text));
                }else{

                    res.json(_res);
                }

            });
    },
    payment_accept_result: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.post(API.bonus.wages.payment_accept_result)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    service.save_user_log({'type': 'getList', 'msg': '导入数据成功'}, req);
                    res.json(JSON.parse(_res.text));
                }else{

                    res.json(_res);
                }

            });
    },

};
