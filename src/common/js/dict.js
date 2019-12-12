export default {

    funds_type: {

        1: '入金-银行卡',
        2: '入金-微信支付',
        3: '入金-支付宝',
        4: '入金-电汇',
        5: '入金-线下充值',
        10: '入金-出金退回',
        6: '转账-转入',
        7: '余额清零',
        /*8: '入金-交易返佣'},
        9: '入金-返利转入余额'},*/
        101: '出金-银行卡',
        102: '出金-电汇',
        103: '转账-转出'
    },

    /*余额变更方式*/
    balance_change_type: {
        1: "银行卡",
        2: "微信",
        3: "支付宝",
        4: "电汇",
        5: "线下充值",
        6: "转账",
        7: "余额清零",
        8: "交易返佣",
        9: "返利转入余额",
        101: "银行卡",
        102: "电汇",
        103: "转账",
        201: "代理每日返利",
        202: "普通销售每日返利",
        203: "销售组负责人每日返利",
        204: "销售部门负责人每日返利",
        301: "返利转出到余额",
        401: "普通销售每日返利",
        402: "销售组负责人每日返利",
        403: "销售部门负责人每日返利",
        901: "MT4交易"
    },
    /*订单状态*/
    order_status: {
        1: "待支付",
        2: "待审核",
        3: "待到账确认",
        4: "待系统处理",
        5: "待银行打款",
        6: "待系统返利打款",
        7: "待读取余额",
        101: "系统处理失败",
        102: "读取余额失败",
        201: "已忽略",
        202: "已退回",
        203: "已取消",
        204: "已完成",
        205: "支付失败",
        206: "转入成功"
    },
    /*账户类型是否满足客户*/
    customer_type_satisfied: {
        1: "是",
        2: "否"
    },
    /*销售类型*/
    sales_state: {
        1: "在职",
        2: "离职",
        3: "兼职"
    },
    /*性别*/
    gender_map: {
        1: "男",
        2: "女",
    },
    /*证件类型*/
    identity_type_map: {
        1: "身份证",
        3: "护照"
    },
    /* 行为日志类型 */
    operation: {
        login: {type: 0, label: "登录"},
        loginOut: {type: 1, label: "退出"},
        add: {type: 2, label: "新增"},
        eidt: {type: 3, label: "修改"},
        del: {type: 3, label: "删除"},
        setRole: {type: 3, label: "授权"},
        getList: {type: 3, label: "查询列表"},
        getId: {type: 3, label: "查询ID详情"},
    },
    log_type: [
        {'key': '登录', 'value': '0'},
        {'key': '退出', 'value': '1'},
        {'key': '新增', 'value': '2'},
        {'key': '修改', 'value': '3'},
        {'key': '删除', 'value': '4'},
        {'key': '授权', 'value': '5'},
        {'key': '查询列表', 'value': '6'},
        {'key': '查询ID详情', 'value': '7'},
        {'key': '踢出用户', 'value': '8'}
    ],

    deposit_deposit_type: [
        {'key': '电汇', 'value': '4'},
        {'key': '银行卡', 'value': '1'},
        {'key': '微信', 'value': '2'}],
    deposit_type: [
        {'key': 'BAPPEBTI账户_A', 'value': '11'},
        {'key': 'BAPPEBTI账户_B', 'value': '12'},
        {'key': 'ECN账户', 'value': '3'}
    ],
    deposit_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待支付', 'value': '1'},
        {'key': '待审核', 'value': '2'},
        {'key': '待到账确认', 'value': '3'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '支付失败', 'value': '205'},
        {'key': '系统处理失败', 'value': '101'}
    ],

    withdraw_withdraw_type: [
        {'key': '电汇', 'value': '102'},
        {'key': '银行卡', 'value': '101'}],
    withdraw_type: [
        {'key': 'BAPPEBTI账户_A', 'value': '11'},
        {'key': 'BAPPEBTI账户_B', 'value': '12'},
        {'key': 'ECN账户', 'value': '3'}
    ],
    withdraw_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '待银行打款', 'value': '5'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'},
        {'key': '已退回', 'value': '202'},
        {'key': '已取消', 'value': '203'},
    ],
    transfer_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'},
        {'key': '已取消', 'value': '203'},
        {'key': '转入成功', 'value': '206'}
    ],
    clear_balance_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '待审核', 'value': '2'},
        {'key': '已忽略', 'value': '201'},
        {'key': '待系统处理', 'value': '4'},
        {'key': '系统处理失败', 'value': '101'}
    ],
    rebate_to_balance_status: [
        {'key': '已完成', 'value': '204'},
        {'key': '已失败', 'value': '101'}
    ],

    /* 身份证件 */
    identity_type: [
        {'value': 1, 'key': '身份证'},
        {'value': 3, 'key': '护照'}
    ],
    /* 称呼 */
    gender: [
        {'value': 1, 'key': '先生'},
        {'value': 2, 'key': '女士'}
    ],
    /* 潜在代理状态 */
    potential_state: [
        {'value': '30', 'key': '未完成'},
        {'value': '31', 'key': '待审核'},
        {'value': '33', 'key': '已开户'},
        {'value': '32', 'key': '已拒绝'},
    ],
    /* 注册待审核代理 */
    status: [
        {'value': '31', 'key': '待审核'},
        {'value': '33', 'key': '已开户'},
        {'value': '32', 'key': '已拒绝'},
    ],
    potential_state_map: {
        30: '未完成',
        31: '待审核',
        33: '已开户',
        32: '已拒绝'
    },
    /* 客户账户状态 */
    account_state: [
        {'value': '1', 'key': '正常'},
        {'value': '50', 'key': '只读'},
        {'value': '51', 'key': '禁用'},
    ],
    /*代理账户状态*/
    agent_account_state: [
        {'value': '1', 'key': '正常'},
        {'value': '51', 'key': '禁用'},
    ],
    account_state_map: {
        1: '正常',
        2: '逻辑删除',
        40: '停用',
        50: '只读',
        51: '禁用'
    },
    /* 代理账户类型 */
    account_type: [
        {'key': 'BAPPEBTI账户', 'value': '1'},
        {'key': 'STP账户', 'value': '2'},
        {'key': 'ECN账户', 'value': '3'}
    ],
    /*客户的账户类型*/
     customer_type: [
        {'key': 'BAPPEBTI账户_A', 'value': '11'},
        {'key': 'BAPPEBTI账户_B', 'value': '12'},
        {'key': 'ECN账户', 'value': '3'}
    ],
    /*客户的账户类型*/
    customer_two_type: {
        1: "BAPPEBTI账户",
        11: "BAPPEBTI账户_A",
        12: "BAPPEBTI账户_B",
        3: "ECN账户"
    },

    /*代理和客户的账户类型*/
    customer_ib_type: {
        1: "BAPPEBTI账户",
        2: "STP账户",
        3: "ECN账户"
    },
    /* BAPPEBTI账户，分为BAPPEBTI账户_A和BAPPEBTI账户_B */
    bappti_type: {
        11: "BAPPEBTI账户_A",
        12: "BAPPEBTI账户_B"
    },
    /* 沟通方式 */
    recorder_type: [
        {key: '电话', value: 1},
        {key: '邮件', value: 2},
        {key: '微信', value: 3},
        {key: '短信', value: 4},
        {key: '面谈', value: 5},
        {key: '其他', value: 6}
    ],

    /* 客户详情 资金着*/
    job: [        //就业情况
        {value: 1, key: '受雇'},
        {value: 2, key: '自雇'},
        {value: 3, key: '退休'},
        {value: 4, key: '失业'},
        {value: 5, key: '学生'},
        {value: 6, key: '家庭主妇'}
    ],
    job_map: {      //就业情况
        1: '受雇',
        2: '自雇',
        3: '退休',
        4: '失业',
        5: '学生',
        6: '家庭主妇'
    },
    capital_source: [        //资金来源
        {value: 1, key: '无资金来源'},
        {value: 2, key: '储蓄'},
        {value: 3, key: '退休金'},
        {value: 4, key: '政府援助'},
        {value: 5, key: '礼物馈赠'},
        {value: 6, key: '遗产继承'},
        {value: 7, key: '出售物业'},
        {value: 8, key: '出售/清算投资'}
    ],
    capital_source_map: {       //资金来源
        1: '无资金来源',
        2: '储蓄',
        3: '退休金',
        4: '政府援助',
        5: '礼物馈赠',
        6: '遗产继承',
        7: '出售物业',
        8: '出售/清算投资'
    },
    annual_income: [        //年收入
        {value: 1, key: '少于$25000'},
        {value: 2, key: '$25000-$49999'},
        {value: 3, key: '$50000-$99999'},
        {value: 4, key: '$100000-$249999'},
        {value: 5, key: '$250000-$1000000'},
        {value: 6, key: '多于$1000000'}
    ],
    annual_income_map: {       //年收入
        1: '少于$25000',
        2: '$25000-$49999',
        3: '$50000-$99999',
        4: '$100000-$249999',
        5: '$250000-$1000000',
        6: '多于$1000000'
    },
    total_asset: [        //总资产
        {value: 1, key: '少于$25000'},
        {value: 2, key: '$25000-$49999'},
        {value: 3, key: '$50000-$99999'},
        {value: 4, key: '$100000-$249999'},
        {value: 5, key: '$250000-$999999'},
        {value: 6, key: '$1000000-$4999999'},
        {value: 7, key: '$5000000-$9999999'},
        {value: 8, key: '多于$10000000'}
    ],
    total_asset_map: {      //总资产
        1: '少于$25000',
        2: '$25000-$49999',
        3: '$50000-$99999',
        4: '$100000-$249999',
        5: '$250000-$999999',
        6: '$1000000-$4999999',
        7: '$5000000-$9999999',
        8: '多于$10000000'
    },
    experience: [        //是否有交易经验
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    experience_map: {      //是否有交易经验
        1: '是',
        2: '否'
    },
    assess_risk: [        //是否有评估风险能力
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    assess_risk_map: {       //是否有评估风险能力
        1: '是',
        2: '否'
    },
    professional: [        //是否是专业人士
        {value: 1, key: '是'},
        {value: 2, key: '否'}
    ],
    professional_map: {        //是否是专业人士
        1: '是',
        2: '否'
    },

    /* 职位 */
    position: [

        {'value': '1', 'key': '客户总监'},
        {'value': '2', 'key': '团队经理'},
        {'value': '3', 'key': '客户经理'},
    ],

    /* 销售职位 */
    sales_position_map: {
        1: '客户总监',
        2: '团队经理',
        3: '客户经理'
    },

    /*代理详情 - 银行状态*/
    band_state: [
        {'value': '1', 'key': '正常'},
        {'value': '2', 'key': '删除'},
    ],

    /* 资金信息 - 出金记录 */
    //订单状态
    funds_status: [
        {'value': '1', 'key': '待支付'},
        {'value': '2', 'key': '待审核'},
        {'value': '3', 'key': '待到账确认'},
        {'value': '4', 'key': '待系统处理'},
        {'value': '5', 'key': '待银行打款'},
        {'value': '6', 'key': '待系统返利打款（目前只用于返利）'},
        {'value': '7', 'key': '待读取余额（目前只用于返利）'},
        {'value': '101', 'key': '系统处理失败'},
        {'value': '102', 'key': '读取余额失败（目前只用于返利）'},
        {'value': '201', 'key': '已忽略'},
        {'value': '202', 'key': '已退回'},
        {'value': '203', 'key': '已取消'},
        {'value': '204', 'key': '已完成'},
        {'value': '205', 'key': '支付失败'},
    ],
    //资金类型
    funds_channel_type: [
        {'value': '1', 'key': '入金-银行卡'},
        {'value': '2', 'key': '入金-微信支付'},
        {'value': '3', 'key': '入金-支付宝'},
        {'value': '4', 'key': '入金-电汇'},
        {'value': '5', 'key': '入金-线下充值'},
        {'value': '6', 'key': '入金-转账'},
        {'value': '7', 'key': '入金-余额清零'},
        {'value': '8', 'key': '入金-交易返佣'},
        {'value': '9', 'key': '入金-返利转入余额'},
        {'value': '101', 'key': '出金-银行卡'},
        {'value': '102', 'key': '出金-电汇'},
        {'value': '103', 'key': '出金-转账'},
        {'value': '201', 'key': '入金-代理每日返利（余额）'},
        {'value': '202', 'key': '入金-普通销售每日返利（余额）'},
        {'value': '203', 'key': '入金-销售组负责人每日返利（余额）'},
        {'value': '204', 'key': '入金-销售部门负责人每日返利（余额）'},
        {'value': '301', 'key': '出金-返利转出到余额'},
        {'value': '401', 'key': '入金-普通销售每日返利（层级）'},
        {'value': '402', 'key': '入金-销售组负责人每日返利（层级）'},
        {'value': '403', 'key': '入金-销售部门负责人每日返利（层级）'},
        {'value': '901', 'key': 'MT4交易'},
    ],
    funds_channel_type_map: [
        {'value': '1', 'key': '入金-银行卡'},
        {'value': '2', 'key': '入金-微信支付'},
        {'value': '3', 'key': '入金-支付宝'},
        {'value': '4', 'key': '入金-电汇'},
        {'value': '5', 'key': '入金-线下充值'},
        {'value': '6', 'key': '入金-转账'},
        {'value': '7', 'key': '入金-余额清零'},
        {'value': '8', 'key': '入金-交易返佣'},
        {'value': '9', 'key': '入金-返利转入余额'},
        {'value': '101', 'key': '出金-银行卡'},
        {'value': '102', 'key': '出金-电汇'},
        {'value': '103', 'key': '出金-转账'},
        {'value': '201', 'key': '入金-代理每日返利（余额）'},
        {'value': '202', 'key': '入金-普通销售每日返利（余额）'},
        {'value': '203', 'key': '入金-销售组负责人每日返利（余额）'},
        {'value': '204', 'key': '入金-销售部门负责人每日返利（余额）'},
        {'value': '301', 'key': '出金-返利转出到余额'},
        {'value': '401', 'key': '入金-普通销售每日返利（层级）'},
        {'value': '402', 'key': '入金-销售组负责人每日返利（层级）'},
        {'value': '403', 'key': '入金-销售部门负责人每日返利（层级）'},
        {'value': '901', 'key': 'MT4交易'},
    ],
    //交易类型
    funds_type_map: {
        0: "BUY(买入)",
        1: "SELL(卖出)",
        2: "BUY LIMIT",
        3: "SELL LIMIT",
        4: "BUY STOP",
        5: "SELL STOP",
        6: "BALANCE",
        7: "CREDIT"
    },
    funds_order_status_map: {
        0: "平仓",
        1: "持仓"
    },

    //返利管理
    rebate_order_status_select: [
        {'key': '全部', 'value': ''},
        {'key': '待审核', 'value': '2'},
        {'key': '待系统返利打款', 'value': '6'},
        {'key': '已完成', 'value': '204'}
    ],
    rebate_order_status_map: {
        2: "待审核",
        6: "待系统返利打款",
        204: "已完成"
    },
    role_type_select: [
        // {'key': '客户', 'value': '1'},
        {'key': '代理', 'value': '2'},
        {'key': '销售', 'value': '3'}
    ],
    role_type_map: {
        2: "代理",
        3: "销售"
    },
    report_status: {
        206: "转入成功",
        5: "待银行打款",
        202: "已退回",
        204: "已完成"
    },
    report_ib_status: {
        5: "待银行打款",
        202: "已退回",
        204: "已完成"
    },
    report_customer_deposit_cause: {
        1: "入金-银行卡",
        2: "入金-微信",
        4: "入金-电汇",
        6: "转账_转入",
        7: "账户余额清零"
    },
    report_ib_deposit_cause: {
        6: "转账_转入",
        8: "交易返佣",
        9: "返利转余额"
    },
    report_withdraw_cause: {
        101: "出金-银行卡",
        102: "出金-电汇",
        103: "转账_转出"
    },
    report_customer_sum_cause: {
        1: "入金-银行卡",
        2: "入金-微信",
        4: "入金-电汇",
        6: "转账_转入",
        7: "账户余额清零",
        10: "出金_退回",
        11: "跨系统转入",
        101: "出金-银行卡",
        102: "出金-电汇",
        103: "转账_转出"
    },
    report_ib_sum_cause: {
        6: "转账_转入",
        8: "交易返佣",
        9: "返利转余额",
        10: "出金_退回",
        101: "出金-银行卡",
        102: "出金-电汇",
        103: "转账_转出"
    },

    history_record: [

        {'key': "入金汇率", 'value': 'deposit_exchange_rate'},
        {'key': "出金汇率", 'value': 'withdraw_exchange_rate'},
        {'key': "默认杠杆", 'value': 'default_leverage'},
        {'key': "大额播报金额", 'value': 'large_amount_deposit_limit'},
        {'key': "大额播报邮箱", 'value': 'large_amount_deposit_email'},
        {'key': "电汇免费出金次数", 'value': 'withdraw_free_times'},
        {'key': "出金手续费", 'value': 'withdraw_poundage'},
        {'key': "最小入金金额", 'value': 'deposit_min_limit'},
        {'key': "最小出金金额", 'value': 'withdraw_min_limit'},
        {'key': "最大入金金额", 'value': 'deposit_max_limit'},
        {'key': "每日出金次数", 'value': 'withdraw_max_count'},
        {'key': "每日转账次数", 'value': 'transfer_max_count'}
    ],


    /* 工资奖金管理------------------------ */
    /*发放类型*/
    wages_type: {
        1: '底薪',
        2: '提成'
    },
    /*发放状态*/
    wages_status: {
        1: '未发放',
        2: '发放成功',
        3: '发放失败'
    },
    /*执行结果*/
    operation_state: {
        1: '操作成功',
        2: '操作失败'
    },
    /*操作类型*/
    operation_type: {
        1: '执行发放',
        2: '导入文件'
    },
    /*错误类型*/
    wages_err_code: {
        1: '证件号码不存在',
        2: '证件号码与姓名不匹配',
        3: '证件号码不能为空',
        4: '姓名不能为空',
        5: '金额不能为空',
        6: '金额格式有误',
        7: '数据有重复',
        8: '无对应产品',
        9: '无对应投资',
        10: '插入数据库失败'
    },
    log_type: {
        0: '登录',
        1: '退出',
        2: '新增',
        3: '修改',
        4: '删除',
        5: '授权',
        6: '查询列表',
        7: '查询ID详情',
        8: '踢出用户'
    },
    profit_type: {
        1: '按日计息',
        10: '到期还本付息'
    },
    /* 工资奖金管理------------------------ */

}

