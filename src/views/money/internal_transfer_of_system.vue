<style>
    .table td{
        border: 1px solid;
    }

</style>
<template xmlns:el-col="http://www.w3.org/1999/html">

    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :model="dto" ref="dto" :rules="dto_rules">
                <el-form-item label="转出账号：" prop="account_from">
                    <el-input v-model="dto.account_from"></el-input>
                </el-form-item>
                <el-form-item label="转入账号：" prop="account_to">
                    <el-input v-model="dto.account_to"></el-input>
                </el-form-item>
                <el-form-item label="转账金额：" prop="amount">
                    <el-input v-model="dto.amount" @keyup.native="keepMoney()">
                        <span slot="prepend">$</span>
                    </el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary"  @click="getInfo">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--确认页-->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" :before-close="resetInfoDialogData1">
            <div>请仔细核对转出和转入信息，若无误，点击“确认”，完成跨系统转账。</div>
            <div>
                <table class="table">
                    <tr>
                        <td>
                            转出账号：{{ dialog.accountFromData.mt4_no }}
                            <br/>
                            客户姓名：{{ dialog.accountFromData.full_name }}
                            <br/>
                            证件号码：{{ dialog.accountFromData.identity_no }}
                            <br/>
                            开户邮箱：{{ dialog.accountFromData.email }}
                            <br/>
                            账户状态：{{ accountStatus(dialog.accountFromData.account_status) }}
                            <br/>
                            账户余额：${{ (dialog.accountFromData.balance / 100).toFixed(2) || "0.00" }}
                        </td>
                        <td>
                            转入账号：{{ dialog.accountToData.mt4_no }}
                            <br/>
                            客户姓名：{{ dialog.accountToData.full_name }}
                            <br/>
                            证件号码：{{ dialog.accountToData.identity_no }}
                            <br/>
                            开户邮箱：{{ dialog.accountToData.email }}
                            <br/>
                            账户状态：{{ accountStatus(dialog.accountToData.account_status) }}
                            <br/>
                            账户余额：${{ (dialog.accountToData.balance / 100).toFixed(2) || "0.00" }}
                        </td>
                    </tr>
                    <tr v-if="dialog.accountOtherData == null">
                        <td colspan="2">转账金额：&nbsp;&nbsp;&nbsp;${{ parseFloat(dialog.amount).toFixed(2) }}</td>
                    </tr>
                    <tr v-else>
                        <td colspan="2">
                            <span style="color: red;padding-right: 26px">
                                转出汇率：${{ dialog.accountOtherData.transfer_from_rate  / 10000 }}
                            </span>
                            <span style="color: red;padding-right: 26px">
                                转出金额：${{ parseFloat(dialog.accountOtherData.transfer_from_amount / 100).toFixed(2) }}
                            </span>
                            <span style="color: red;padding-right: 26px">
                                转入汇率：${{ dialog.accountOtherData.transfer_to_rate  / 10000 }}
                            </span>
                            <span style="color: red">
                                转入金额：${{ parseFloat(dialog.accountOtherData.transfer_to_amount / 100).toFixed(2) }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">提示：<span style="color: red">{{ dialog.msg }}</span></td>
                    </tr>
                </table>
                <el-button type="primary" @click="confirm" :disabled="option.confirmButtonDisabled">确认</el-button>
                <el-button @click="resetInfoDialogData1">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
    import * as money_api from '../../api/money_api.js';
    import dict from '../../common/js/dict';
    import * as commons from '../../common/js/commons';
    import * as date from "../../common/js/date"

    export default {
        props:["params"],
        data() {
            var checkAmount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入金额'));
                } else if (value <= 0) {
                    callback(new Error('转账金额必须大于0'));
                } else {
                    callback();
                }
            };
            return {
                dto: {
                    account_from: '',
                    account_to: '',
                    amount: '',
                    lastValue: ''
                },
                dto_rules: {
                    account_from: [{required: true, message: '转出账号不能为空', trigger: 'blur'}],
                    account_to: [{required: true, message: '转入账号不能为空', trigger: 'blur'}],
                    amount: [{validator: checkAmount,  trigger: 'blur'}]
                },
                dialog: {
                    title: "跨系统内部转账确认",
                    dialogVisible: false,
                    accountFromData: {},
                    accountOtherData: {},
                    accountToData: {},
                    amount: '',
                    msg: ''
                },
                option:{
                    account_status: dict.account_state,
                    confirmButtonDisabled: false
                }
            }
        },
        methods: {
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.dto.order_time_from = val[0];
                this.dto.order_time_to = val[1];
            },
            getInfo() {
                this.$refs["dto"].validate((valid) => {
                    if (valid) {
                        let params = {
                            account_from: this.dto.account_from.trim(),
                            account_to: this.dto.account_to.trim(),
                            amount: commons.accMul(this.dto.amount, 100)
                        };
                        money_api.internalTransferOfSystemAccountInfo(params).then((res) => {
                            this.dialog.msg = "";
                            if(res.data.status == 200) {
                                //老系统账户
                                if(res.data.old.datas){
                                    var old_data = JSON.parse(res.data.old.datas);
                                    if(old_data){
                                        this.dialog.accountFromData = old_data;
                                        this.option.formButton = false;
                                    }else{
                                        this.dialog.msg = "老系统账户不存在";
                                        this.option.formButton = true;
                                    }
                                }else{
                                    this.dialog.msg = "老系统账户不存在";
                                    this.option.formButton = true;
                                }
                                if(res.data.new.datas){
                                    //新系统账户
                                    var new_data = JSON.parse(res.data.new.datas);
                                    var otherdata = null;
                                    if(res.data.new.otherdata){
                                        otherdata = JSON.parse(res.data.new.otherdata);
                                    }
                                    if(new_data){
                                        this.dialog.accountToData = new_data;
                                        this.dialog.accountOtherData = otherdata;
                                        this.option.toButton = false;
                                    }else{
                                        this.dialog.msg += "   新系统账户不存在";
                                        this.option.toButton = true;
                                    }
                                }else{
                                    this.dialog.msg += "   新系统账户不存在";
                                    this.option.toButton = true;
                                }
                                //金额
                                this.dialog.amount = this.dto.amount;

                                //提示信息
                                if(old_data && new_data){
                                    this.option.confirmButtonDisabled = false;
                                    if(old_data.identity_no.toLowerCase() != new_data.identity_no.toLowerCase()){
                                        this.dialog.msg += "   证件号码不一致";
                                        this.option.confirmButtonDisabled = true;
                                    }
                                    if(old_data.full_name != new_data.full_name){
                                        this.dialog.msg += "   客户姓名不一致";
                                    }
                                    if(old_data.email != new_data.email){
                                        this.dialog.msg += "   开户邮箱不一致";
                                    }
                                }

                                //显示弹框
                                this.dialog.dialogVisible = true;
                            }else{
                                if(res.data.status == 401){
                                    // this.$router.push('/login');
                                }
                                this.$message.error(res.data.msg);
                            }
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: e.message
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            confirm(){
                this.$alert('确认转账？', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if(action == "confirm"){
                            this.submit();
                        }
                    }
                });
            },
            //转账
            submit(){
                let params = {
                    old_account: this.dto.account_from.trim(),
                    new_account: this.dto.account_to.trim(),
                    amount: commons.accMul(this.dto.amount, 100)
                };
                money_api.internalTransferOfSystemOutIn(params).then((res) => {
                    if(res.data.status == 200) {
                        this.option.toButton = true;
                        this.$alert('转入成功<br><span style="color: red">注：账户余额同步会有延迟，请以Manager上的金额为准</span>', '提示', {
                            confirmButtonText: '确定',
                            dangerouslyUseHTMLString: true,
                            callback: action => {
                                this.reset();
                            }
                        });
                    }else{
                        if(res.data.status == 401){
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            resetInfoDialogData1() {       //重置 表单
                this.dialog.dialogVisible = false;
                this.dialog = {
                    accountFromData: {},
                    accountToData: {},
                    amount: '',
                    msg: ''
                };
            },
            accountStatus(status){
                let val = '';
                this.option.account_status.forEach((item)=>{
                    if(item.value == status){
                        val = item.key;
                    }
                });
                return val;
            },
            keepMoney(){
                var value = this.dto.amount;
                if (value == "-" || value == "") {
                    this.dto.lastValue = "";
                    this.dto.amount = "";
                    return true;
                }
                var reg = new RegExp(/^\d{1,12}(\.\d{0,2}$|$)/);
                var lastValue = this.dto.lastValue;
                var flag = reg.test(value);
                if (flag) {
                    lastValue = value;
                    this.dto.lastValue = lastValue;
                    return lastValue;
                } else {
                    this.dto.amount = lastValue;
                    return lastValue;
                }
            },
            reset(){
                this.dto = {
                    account_from: '',
                    account_to: '',
                    amount: '',
                    lastValue: ''
                };
                this.dialog = {
                    dialogVisible: false,
                    accountFromData: {},
                    accountToData: {},
                    amount: '',
                    msg: ''
                };
            }

        },
        mounted() {
        }

    }
</script>

<style>
    .table{margin:20px 0; width:100%;border-collapse: collapse;}
    .table td{border-color: #ddd;padding:10px;line-height: 30px}

</style>