/**
 * created by yuyz  date:2018-01-10
 */
let express = require('express');
let router =  express.Router();
let accounts = require("../../app/controller/prod/accounts.js");
router.post("/accounts/list",accounts.accountsList.customers);
router.post('/accounts/info',accounts.accountsList.customerInfo);
router.post('/accounts/enable',accounts.accountsList.enableAccount);
router.post('/accounts/customer/export',accounts.accountsList.exportCustomer);

router.post("/accounts/agent/list",accounts.accountsList.agents);
router.post("/accounts/agent/info",accounts.accountsList.agentInfo);
router.post('/accounts/agent/export',accounts.accountsList.exportAgent);
router.post("/accounts/deposit/list",accounts.accountsList.depositList);

module.exports = router;