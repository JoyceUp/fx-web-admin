<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters"  size="medium">
                <el-form-item prop="order_no">
                    <el-input
                            placeholder="订单号"
                            v-model.trim="filters.order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="cause">
                    <el-select clearable  placeholder="出金类型" v-model="filters.cause">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.withdraw_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account_type">
                    <el-select clearable  placeholder="账户类型" v-model="filters.account_type">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable  placeholder="订单状态" v-model="filters.order_status">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.status"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.createDate" type="daterange" start-placeholder="提交时间"
                                end-placeholder="提交时间"
                                placeholder="选择时间范围" @change="handleCreateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="updateDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.updateDate" type="daterange" start-placeholder="更新时间"
                                end-placeholder="更新时间"
                                placeholder="选择时间范围" @change="handleUpdateDateChange"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small"  @click="searchList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="resetSearch('filters')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="exportExcel">导出</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="bankcardExportExcel">导出银行卡提款表</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="ttExportExcel">导出电汇提款表</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--数据列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :data="datas"
                style="width: 100%">
            <el-table-column
                    width="100"
                    prop="account_no"
                    label="账号">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="account_type"
                    :formatter="tableTypeFormatter"
                    label="账户类型">
            </el-table-column>
            <el-table-column
                    prop="cause"
                    :formatter="tableWithdrawTypeFormatter"
                    label="出金方式">
            </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="cent2dollar"
                    prop="amount"
                    label="申请金额(USD)">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="rate"
                    :formatter="getRate"
                    label="汇率">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="pay_amount"
                    :formatter="payAmountCNY"
                    label="支付金额(CNY)">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="pay_amount"
                    :formatter="payAmountUSD"
                    label="支付金额(USD)">
            </el-table-column>
            <el-table-column
                    width="80"
                    prop="poundage"
                    :formatter="cent2dollar"
                    label="手续费">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="gmt_create"
                    label="提交时间">
            </el-table-column>
            <el-table-column
                    prop="order_status"
                    :formatter="tableStatusFormatter"
                    label="订单状态">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                            @click="withdrawDetails(scope.row.id, scope.row.cause)">查看
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="withdrawDecrease(scope.row.id, scope.row.cause)" v-if="roleDisplay.decreaseDisplay && scope.row.decreaseDisplay">扣款
                    </el-button>
                    <el-button size="mini"
                            type="danger"
                            @click="withdrawManualDecrease(scope.row.id, scope.row.cause)" v-if="roleDisplay.manualDisplay&& scope.row.manualDisplay">处理
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                            @click="withdrawFinish(scope.row.id, scope.row.cause)" v-if="roleDisplay.completeDisplay && scope.row.completeDisplay">完成
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                            @click="withdrawBack(scope.row.id, scope.row.cause,scope.row.amount)" v-if="roleDisplay.backDisplay && scope.row.backDisplay">退回
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="withdrawIgnore(scope.row.id, scope.row.cause)" v-if="roleDisplay.ignoreDisplay&& scope.row.ignoreDisplay">忽略
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--分页-->
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :page-sizes="pager.sizes"
                    background
                    :current-page="pager.page_no"
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
        </el-col>


        <!-- 出金详情 -->
        <el-dialog :title="dialog.title"  :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData">
            <el-tabs v-model="dialog.activeName">
                <el-tab-pane name="1">
                    <span slot="label"><i class="el-icon-date"></i> 出金详情</span>
                    <el-form :model="dialog.dialogData" ref="userFormRef" :label-width="dialog.formLabelWidth">
                        <el-form-item label="订单号：">
                            <span>{{ dialog.dialogData.order_no }}</span>
                        </el-form-item>
                        <el-form-item label="账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item label="姓名：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.full_name }}</span>
                        </el-form-item>
                        <el-form-item label="出金类型：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.balance_change_type[dialog.dialogData.cause] }}</span>
                        </el-form-item>
                        <el-form-item label="出金金额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.amount) }}</span>
                        </el-form-item>
                        <el-form-item label="手续费(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.poundage) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause === 102" label="支付金额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause != 102" label="支付金额(CNY)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_create }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_modified }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态：" :label-width="dialog.formLabelWidth">
                            <span>{{options.order_status[dialog.dialogData.order_status ] }}</span>
                        </el-form-item>
                        <div v-if = "dialog.dialogData.cause === 102 ">
                        <el-form-item label="银行账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.card_no }}</span>
                        </el-form-item>
                        <el-form-item label="银行账户户名：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.card_user_name }}</span>
                        </el-form-item>
                        <el-form-item label="银行名称：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.bank_name }}</span>
                        </el-form-item>
                        <el-form-item label="银行国家：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.country }}</span>
                        </el-form-item>
                        <el-form-item label="地区(省)：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.province }}</span>
                        </el-form-item>
                        <el-form-item label="地区(市)：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.city }}</span>
                        </el-form-item>
                        <el-form-item label="银行开户行：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_name }}</span>
                        </el-form-item>
                        <el-form-item label="开户行地址：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_address }}</span>
                        </el-form-item>
                        <el-form-item label="银行Swift Code：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.branch_swift_code }}</span>
                        </el-form-item>
                        </div>
                        <div v-if = "dialog.dialogData.cause != 102 ">
                            <el-form-item label="开户行名称：" :label-width="dialog.formLabelWidth">
                                <span>{{ dialog.dialogData.bank_name }}</span>
                            </el-form-item>
                            <el-form-item label="开户行省：" :label-width="dialog.formLabelWidth">
                                <span>{{ dialog.dialogData.province }}</span>
                            </el-form-item>
                            <el-form-item label="开户行市：" :label-width="dialog.formLabelWidth">
                                <span>{{ dialog.dialogData.city }}</span>
                            </el-form-item>
                            <el-form-item label="开户行分行/支行：" :label-width="dialog.formLabelWidth">
                                <span>{{ dialog.dialogData.branch_name }}</span>
                            </el-form-item>
                            <el-form-item label="转入账号：" :label-width="dialog.formLabelWidth">
                                <span>{{ dialog.dialogData.card_no }}</span>
                            </el-form-item>
                        </div>
                        <el-form-item label="处理备注：" :label-width="dialog.formLabelWidth">
                            <span v-html="tableRemarkFormatter(dialog.dialogData.remark)"></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label"><i class="el-icon-date"></i> 图片资料</span>
                    <el-form :model="dialog.dialogData" :label-width="dialog.formLabelWidth">
                        <el-form-item label="证件正面：" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.identity1_path)" width="60%" :src="'/common/images/' + dialog.dialogData.identity1_path" />
                            </span>
                        </el-form-item>
                        <el-form-item label="证件反面：" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.identity2_path)" width="60%" :src="'/common/images/' + dialog.dialogData.identity2_path" />
                            </span>
                        </el-form-item>
                        <el-form-item label="银行卡：" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.photo_id)" width="60%" :src="'/common/images/' + dialog.dialogData.photo_id" />
                            </span>
                        </el-form-item>
                        <el-form-item label="地址证明：" :label-width="dialog.formLabelWidth">
                            <span>
                                <img @click="showBigImg('/common/images/' + dialog.dialogData.path)" width="60%" :src="'/common/images/' + dialog.dialogData.path" />
                            </span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
              <!--  <el-tab-pane label="出入金记录">
                    <span slot="label"><i class="el-icon-date"></i> 出入金记录</span>
                    <el-table :data="dialog.in_withdraw_data" style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="订单号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="done_date"
                                label="完成日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="money_type"
                                label="类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="payment_amount_usd"
                                label="金额(USD)"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                width="180">
                        </el-table-column>
                    </el-table>

                    <el-col :span="24" class="toolbar">
                        <el-pagination
                                background
                                layout="prev, pager, next" :page-size="20"
                                :total="dialog.in_withdraw_data_total" @current-change="changeInWithdrawPageNumber"
                                style="float:right;">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="转账记录">
                    <span slot="label"><i class="el-icon-date"></i> 转账记录</span>
                    <el-table :data="dialog.transfer_data" style="width: 100%">
                        <el-table-column
                                prop="done_date"
                                label="完成日期"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="from_account_no"
                                label="转出账号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="转出账户类型"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="转入账号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="转入账户类型"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="金额(USD)"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="状态"
                                width="100">
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination
                                background
                                layout="prev, pager, next" :page-size="20"
                                :total="dialog.transfer_data_total" @current-change="changeTransferPageNumber"
                                style="float:right;">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>-->
                <el-tab-pane name="3" label="账户余额">
                    <span slot="label"><i class="el-icon-date"></i> 账户余额</span>
                    <el-form :model="dialog.dialogData" :label-width="dialog.formLabelWidth">
                        <el-form-item label="账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item label="余额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.balance) }}</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
            </div>
        </el-dialog>

        <!--显示大图-->
        <el-dialog :title="dialog.imgTitle" :visible.sync="dialog.dialogImgVisible" class="text-from" width="90%">
            <img width="100%" :src="dialog.imgSrc"/>
        </el-dialog>

        <!-- 统计列表 TODO -->
        <!--退回-->
        <el-dialog :title="backDialog.title"    :visible.sync="backDialog.dialogFormVisible" :before-close="resetBackDialogData">
            <el-form :model="backForm" :rules="rule" ref="backForm">
                <el-input type="hidden" name="order_id" v-model="backForm.order_id"></el-input>
                <el-input type="hidden" name="cause" v-model="backForm.cause"></el-input>

                <el-form-item prop="back_amount" label="退回金额" @focus="true" :label-width="backDialog.formLabelWidth">
                    <el-input v-model="backForm.back_amount" :input-width="backDialog.formInputWidth" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="back_remark" label="退回原因" :label-width="backDialog.formLabelWidth">
                    <el-input  type="textarea" :rows="2" :input-width="backDialog.formInputWidth" v-model="backForm.back_remark" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backDialog.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="withdrawBackSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/money_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar,computeRate,accMul} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import ElInput from "element-ui/packages/input/src/input";

    export default {
        components: {ElInput},
        props: ["params"],
        data() {
            return {
                clearable:false,
                roleDisplay:{
                    backDisplay:false,
                    decreaseDisplay:false,
                    completeDisplay:false,
                    ignoreDisplay:false,
                    manualDisplay:false,
                },
                listLoading :false,
                statistics: {},     //统计
                options: {
                    type: dict.withdraw_type,
                    withdraw_type: dict.withdraw_withdraw_type,
                    status: dict.withdraw_status,
                    order_status: dict.order_status,
                    balance_change_type:dict.balance_change_type
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                filters: {
                    order_no: '',
                    account_no: '',
                    full_name: '',
                    cause: '',
                    account_type: '',
                    order_status: '',
                    order_time_from: '',
                    order_time_to: '',
                    update_time_from: '',
                    update_time_to: '',
                    createDate: '',
                    updateDate: ''
                },
                dialog: {
                    activeName:"1",
                    title: "查看详情",
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px',
                    imgTitle: "显示大图",
                    dialogImgVisible: false,
                    imgSrc: "",
                    in_withdraw_data: [],
                    in_withdraw_data_total: 100,
                    transfer_data: [],
                    transfer_data_total: 110,
                    balanceData: [{"account": '80875465', 'balance': '156.52'}]

                },
                backDialog:{
                    title:"退回",
                    dialogFormVisible:false,
                    formLabelWidth: '100px',
                    formInputWidth: '50%',
                    order_id:'',
                    cause:'',
                    amount:''
                },
                backForm:{
                    back_amount:'',
                    back_remark:'',
                    order_id:'',
                    cause:''
                },
                rule: {
                    back_amount: [
                        {required: true,validator:checkFields.backMoneyMustBeNumber,trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    back_remark: [
                        {required: true, message: '请输入退款原因'},
                        //{ validator: validaePass2 }
                    ]
                },
            }
        },
        methods: {
            //放大图片
            showBigImg(src) {
                this.dialog.imgSrc = src;
                this.dialog.dialogImgVisible = true;
            },
            //汇率
            getRate(row, column) {
                if (column) {
                    return computeRate(row[column.property]);
                }
                return computeRate(row);
            },
            //支付金额CNY
            payAmountCNY(row){
                if(row.cause === 102)
                {
                    return "";
                }
                return this.cent2dollar(row.pay_amount);
            },
            //支付金额USD
            payAmountUSD(row){
                if(row.cause === 102)
                {
                    return this.cent2dollar(row.pay_amount);
                }
                return "";
            },
            //美分变美元
            cent2dollar(row, column)
            {
                if(column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.filters.order_time_from = val[0];
                this.filters.order_time_to = val[1];
            },
            //更新时间发生改变
            handleUpdateDateChange(val) {
                this.filters.update_time_from = val[0];
                this.filters.update_time_to = val[1];
            },
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //page_no
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getWithdrawList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getWithdrawList();
            },
            //查询列表
            getWithdrawList() {
                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.withdrawList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            bankcardExportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)
                };

                money_api.withdrawExportBankcard(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            ttExportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)
                };

                money_api.withdrawExportTt(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            exportExcel() {
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: this.filters.cause,
                    account_type: this.filters.account_type,
                    order_status: this.filters.order_status,
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to),
                    update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)
                };
                /*let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };*/

                money_api.withdrawExport(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            withdrawDetails(id, cause) {
                let params = {
                    order_id: id,
                    cause: cause
                };
                money_api.withdrawDetails(params).then((res) => {
                    if (res.data.status === 200) {
                        let row = JSON.parse(res.data.datas);
                        this.dialog.dialogFormVisible = true;
                        this.dialog.dialogData = row;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            withdrawDecrease(id, cause) {
                this.$confirm('确认扣款？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        cause: cause,
                        order_id: id
                    };
                    money_api.withdrawDecrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '确认成功!'
                                message: "操作成功"
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }

                    });
                }).catch((e) => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawFinish(id, cause) {
                this.$confirm('确认处理完成？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        cause: cause,
                        order_id: id
                    };
                    money_api.withdrawFinish(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '出金完成，邮件已发送客户、级联销售!'
                                message: "操作成功"
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                            this.getWithdrawList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawIgnore(id, cause) {
                this.$prompt('请输入忽略原因（必填）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if (value) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    inputErrorMessage: '请输入忽略原因'
                }).then(({value}) => {

                    let params = {
                        order_id: id,
                        cause: cause,
                        remark: value
                    };
                    money_api.withdrawIgnore(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已成功忽略该条出金记录，邮件已发送!'
                                message: "操作成功"
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawManualDecrease(id, cause) {
                this.$prompt('请输入处理情况（必填）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    inputValidator: function (value) {
                        if (value) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    inputErrorMessage: '请输入处理情况'
                }).then(({value}) => {

                    let params = {
                        order_id: id,
                        cause: cause,
                        remark: value
                    };
                    money_api.withdrawManualDecrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已处理完成！'
                                message: "操作成功"
                            });
                            this.getWithdrawList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getWithdrawList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            withdrawBack(id, cause,amount){
                this.backDialog.dialogFormVisible = true;
                this.backForm.order_id = id;
                this.backForm.cause = cause;
                this.backDialog.amount = amount;
                this.backForm.back_amount='';
                this.backForm.back_remark='';

            },
            withdrawBackSubmit() {
                this.$refs.backForm.validate((valid) => {
                    if (valid) {
                        if(this.backDialog.amount < accMul(this.backForm.back_amount,100)){
                            this.$message.error("退回金额不能大于申请金额！");
                            return false;
                        }
                        var params = {
                            order_id: this.backForm.order_id,
                            cause: this.backForm.cause,
                            amount: accMul(this.backForm.back_amount,100),
                            remark: this.backForm.back_remark
                        }

                        money_api.withdrawBack(params).then((res) => {
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    //message: '已处理完成！'
                                    message: "操作成功"
                                });
                                this.resetBackDialogData();
                                this.getWithdrawList();
                            } else {
                                this.$message.error(res.data.status + " " + res.data.msg);
                                this.getWithdrawList();
                            }
                        });
                    } else {
                        return false;
                    }
                })
            },

            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.activeName = "1";
            },
            resetBackDialogData() {       //重置 表单
                this.backDialog.dialogFormVisible = false;
                this.backForm.back_amount='';
                this.backForm.back_ramark='';
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.filters.update_time_from = "";
                this.filters.update_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getWithdrawList();
            },
            tableTypeFormatter(row) {
                return dict.customer_two_type[row.account_type];
            },
            tableWithdrawTypeFormatter(row) {
                return dict.balance_change_type[row.cause];
            },
            tableRemarkFormatter(remark){
                if(remark)
                {
                    while(remark.indexOf('*') > -1)
                    {
                        remark = remark.replace("*", "<br />");
                    }
                    return remark;
                }
                return "";
            },
            tableStatusFormatter(row) {
                row.backDisplay=false;
                row.decreaseDisplay=false;
                row.completeDisplay=false;
                row.ignoreDisplay=false;
                row.manualDisplay=false;
                switch (row.order_status){
                    case 2:
                        row.decreaseDisplay=true;
                        row.ignoreDisplay = true;
                        break;
                    case 5:
                        row.completeDisplay=true;
                        row.backDisplay=true;
                        break;
                    case 101:
                        row.manualDisplay=true;
                        row.ignoreDisplay=true;
                        break;
                    case 204:
                        row.backDisplay=true;
                        break;
                }
                return dict.order_status[row.order_status];
            },

            //切换table
            handleTabsClick(tab, event) {

            },
            setRoleDidsplay(){
                let user= this.$store.getters.getUserInfo;

                if(!user || !user.role_name){
                    let cuser=util.cookieMethod.getCookie('user')
                    user =  JSON.parse(cuser)
                }

                let role_name=user.role_name;

                if(!role_name)
                {
                    role_name = "";
                }
                if(role_name.indexOf("资金岗") >-1 || role_name.indexOf("admin") >-1 || role_name.indexOf("管理员") > -1){
                    this.roleDisplay.backDisplay=true;
                    this.roleDisplay.decreaseDisplay=true;
                    this.roleDisplay.ignoreDisplay=true;
                    this.roleDisplay.manualDisplay=true;
                    this.roleDisplay.completeDisplay=true;
                }

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getWithdrawList();
                this.setRoleDidsplay();
            })
        }

    }
</script>
<style>
    .el-table .cell
    {
        padding-left:5px!important;
        padding-right:5px!important;
    }
</style>