<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="order_no">
                    <el-input
                            placeholder="订单号"
                            v-model.trim="filters.order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_from">
                    <el-input
                            placeholder="转出账号"
                            v-model.trim="filters.account_from">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_to">
                    <el-input
                            placeholder="转入账号"
                            v-model.trim="filters.account_to">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_type">
                    <el-select clearable  placeholder="转出账户类型" v-model="filters.account_type">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="target_account_type">
                    <el-select clearable  placeholder="转入账户类型" v-model="filters.target_account_type">
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable placeholder="订单状态" v-model="filters.order_status">
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
                    <el-button type="primary" size="small" @click="searchList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="resetSearch('filters')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="exportExcel">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--数据列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :data="datas"
                style="width: 100%"
                >
            <el-table-column
                    prop="full_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="account_no"
                    label="转出账号">
            </el-table-column>
            <el-table-column
                    label="转出账户类型">
                <template slot-scope="scope">
                    <span>{{ options.customer_ib_type[scope.row.account_type] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="poundage"
                    label="转出汇率">
                <template slot-scope="scope" v-if="scope.row.poundage != null && scope.row.rate != null">
                    {{ scope.row.poundage/10000 }}
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="poundage"-->
                    <!--label="转出汇率"-->
                    <!--v-if="dialogDetail.rate===dialogDetail.deposit_fixed_exchange_rate || dialogDetail.poundage===dialogDetail.withdraw_fixed_exchange_rate"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="pay_amount"
                    label="转出金额（USD）">

                <template slot-scope="scope">
                    <span>{{ cent2dollar(scope.row.pay_amount) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="target_account_no"
                    label="转入账号">
            </el-table-column>
            <el-table-column
                    label="转入账户类型">
                <template slot-scope="scope">
                    <span>{{ options.customer_ib_type[scope.row.target_account_type] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rate"
                    label="转入汇率"
            >
                <template slot-scope="scope" v-if="scope.row.poundage != null && scope.row.rate != null">
                    {{ scope.row.rate/10000 }}
                </template>
            </el-table-column>
            <el-table-column width="120"
                    prop="amount"
                    label="转入金额(USD)">
                <template slot-scope="scope">
                    <span>{{ cent2dollar(scope.row.amount) }}</span>
                </template>
            </el-table-column>
            <el-table-column width="160"
                    prop="gmt_create"
                    label="提交时间">
            </el-table-column>
            <!--     <el-table-column
                         prop="gmt_modified"
                         label="更新时间">
                 </el-table-column>-->
            <el-table-column
                    prop="order_status"
                    :formatter="tableStatusFormatter"
                    label="订单状态">
            </el-table-column>
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="transferDetails(scope.row.id)">查看
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="transferTransfer(scope.row.id)"
                               v-if="roleDisplay.completeDisplay && scope.row.completeDisplay">完成
                    </el-button>
                    <el-button size="mini"
                               @click="transferManualTransfer(scope.row.id)"
                               v-if="roleDisplay.manualDisplay && scope.row.manualDisplay">处理
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="transferIgnore(scope.row.id)"
                               v-if="roleDisplay.ignoreDisplay&& scope.row.ignoreDisplay">忽略
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
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData">
            <el-tabs>
                <el-tab-pane>
                    <span slot="label"><i class=""></i> 转账详情</span>
                    <el-form :model="dialog.dialogData" ref="userFormRef" :label-width="dialog.formLabelWidth" class="form_alert">
                        <el-form-item label="订单号：">
                            <span>{{ dialog.dialogData.order_no }}</span>
                        </el-form-item>
                        <el-form-item label="姓名：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.full_name }}</span>
                        </el-form-item>
                        <el-form-item label="转出账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item label="转出账户类型：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.customer_ib_type[dialog.dialogData.account_type] }}</span>
                        </el-form-item>
                        <!--<el-form-item label="转出账号分组" :label-width="dialog.formLabelWidth">
                            <el-input v-model="dialog.dialogData.from_account_group" auto-complete="off"></el-input>
                        </el-form-item>-->
                        <el-form-item label="转出账号余额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.account_balance) }}</span>
                        </el-form-item>
                        <el-form-item label="转出汇率：" :label-width="dialog.formLabelWidth" v-if="dialog.dialogData.poundage != null && dialog.dialogData.rate != null">
                            <span>{{ dialog.dialogData.poundage/10000 }}</span>
                        </el-form-item>
                        <el-form-item label="转出金额（USD）：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <!--<el-form-item label="转出账号可用余额" :label-width="dialog.formLabelWidth">
                            <el-input v-model="dialog.dialogData.account_balance" auto-complete="off"></el-input>
                        </el-form-item>-->

                        <el-form-item label="转入账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.target_account_no }}</span>
                        </el-form-item>
                        <el-form-item label="转入账户类型：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.customer_ib_type[dialog.dialogData.target_account_type] }}</span>
                        </el-form-item>
                        <!--<el-form-item label="转入账号分组" :label-width="dialog.formLabelWidth">
                            <el-input v-model="dialog.dialogData.to_account_group" auto-complete="off"></el-input>
                        </el-form-item>-->
                        <el-form-item label="转入账号余额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.target_account_balance) }}</span>
                        </el-form-item>
                        <el-form-item label="转入汇率：" :label-width="dialog.formLabelWidth" v-if="dialog.dialogData.poundage != null && dialog.dialogData.rate != null">
                            <span>{{ dialog.dialogData.rate/10000  }}</span>
                        </el-form-item>
                        <!-- <el-form-item label="转入账号可用余额" :label-width="dialog.formLabelWidth">
                             <el-input v-model="dialog.dialogData.to_account_can_use_balance" auto-complete="off"></el-input>
                         </el-form-item>-->

                        <el-form-item label="转入金额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.amount) }}</span>
                        </el-form-item>
                        <el-form-item label="当前状态：" :label-width="dialog.formLabelWidth">
                            <span>{{options.order_status[dialog.dialogData.order_status ] }}</span>
                        </el-form-item>
                        <el-form-item label="提交时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_create }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.gmt_modified }}</span>
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.remark }}</span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!--     <el-tab-pane label="持仓记录">
                         <span slot="label"><i class="el-icon-date"></i> 持仓记录</span>
                         <el-table :data="dialog.hold_record_data" style="width: 100%">
                             <el-table-column
                                     prop=""
                                     label="单号"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop=""
                                     label="账号"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop=""
                                     label="货币对"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop=""
                                     label="类型"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop=""
                                     label="交易量"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop=""
                                     label="开仓时间(格林威治)"
                                     width="180">
                             </el-table-column>
                         </el-table>
                         <el-col :span="24" class="toolbar">
                             <el-pagination
                                     background
                                     layout="prev, pager, next" :page-size="20"
                                     :total="dialog.hold_record_data_total" @current-change="changeHoldRecordPageNumber"
                                     style="float:right;">
                             </el-pagination>
                         </el-col>
                     </el-tab-pane>
                     <el-tab-pane label="出入金记录">
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
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop="money_type"
                                     label="类型"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop="payment_amount_usd"
                                     label="金额(USD)"
                                     width="100">
                             </el-table-column>
                             <el-table-column
                                     prop="status"
                                     label="状态"
                                     width="100">
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
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="resetDialogData">取 消</el-button>-->
            </div>
        </el-dialog>


        <!-- 统计列表 TODO -->

    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/money_api.js';
    import * as date from "../../common/js/date"

    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {dividedBy100 , centToDollar} from "../../common/js/commons"

    export default {
        props: ["params", "request_type"],
        data() {
            return {
                clearable:false,
                roleDisplay: {
                    completeDisplay: false,
                    ignoreDisplay: false,
                    manualDisplay: false,
                },
                listRateDisplay:false,
                listLoading: false,
                statistics: {},     //统计
                options: {
                    status: dict.transfer_status,
                    customer_ib_type: dict.customer_two_type,
                    order_status: dict.order_status,
                    type: dict.customer_type,
                    inIdType:dict.inIdType
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
                    full_name: '',
                    account_from: '',
                    account_to: '',
                    order_status: '',
                    account_type: '',
                    target_account_type:'',
                    order_time_from: '',
                    order_time_to: '',
                    update_time_from: '',
                    update_time_to: '',
                    createDate: '',
                    updateDate: '',
                    deposit_fixed_exchange_rate:'',
                    withdraw_fixed_exchange_rate:'',
                    pay_amount:'',
                    poundage:'',
                    rate:'',
                    amount:''



                },
                dialog: {
                    title: "查看详情",
                    dialogFormVisible: false,
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px',
                    in_withdraw_data: [],
                    in_withdraw_data_total: 100,
                    transfer_data: [],
                    transfer_data_total: 110,
                    hold_record_data: [],
                    hold_record_data_total: 110,

                },
                dialogDetail:{
                    withdraw_fixed_exchange_rate:'',
                    poundage:'',
                    rate:''

                }
            }
        },
        methods: {
            dividedBy100(val){
                return dividedBy100(val);
            },
            //美分变美元
            cent2dollar(row, column) {
                if (column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //汇率
            // getRate(row, column) {
            //     if (column) {
            //         return computeRate(row[column.property]);
            //     }
            //     return computeRate(row);
            // },
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
                this.getTransferList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getTransferList();
            },
            //查询列表
            getTransferList() {
                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    full_name: this.filters.full_name,
                    amount: this.filters.amount,
                    pay_amount: this.filters.pay_amount,
                    account_type: this.filters.account_type,
                    poundage: this.filters.poundage,
                    target_account_type: this.filters.target_account_type,
                    rate: this.filters.rate,
                    account_from: this.filters.account_from,
                    account_to: this.filters.account_to,
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
                money_api.transferList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }

                    this.listLoading = false;
                });
            },
            exportExcel() {

                let condition = {
                    order_no: this.filters.order_no,
                    full_name: this.filters.full_name,
                    poundage: this.filters.poundage,
                    amount: this.filters.amount,
                    pay_amount: this.filters.pay_amount,
                    account_from: this.filters.account_from,
                    account_to: this.filters.account_to,
                    account_type: this.filters.account_type,
                    target_account_type: this.filters.target_account_type,
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

                money_api.transferExport(condition).then((res) => {
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
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
            transferDetails(id) {
                let params = {order_id: id};
                money_api.transferDetails(params).then((res) => {
                    if (res.data.status === 200) {
                        let row = JSON.parse(res.data.datas);
                        this.dialog.dialogFormVisible = true;
                        this.dialog.dialogData = row;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }

                });
            },
            transferIgnore(id) {
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
                    inputErrorMessage: '请输入原因'
                }).then(({value}) => {
                    let params = {
                        order_id: id,
                        remark: value
                    };
                    money_api.transferIgnore(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已成功忽略该条入金记录，邮件已发送!'
                                message: "操作成功"
                            });
                            this.getTransferList();
                        } else {
                            this.$message.error(res.data.msg);
                            this.getTransferList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });
            },
            transferManualTransfer(id) {
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
                        remark: value
                    };
                    money_api.transferManualTransfer(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已处理完成！'
                                message: "操作成功"
                            });
                            this.getTransferList();
                        } else {
                            this.$message.error(res.data.msg);
                            this.getTransferList();
                        }
                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });
            },
            transferTransfer(id) {
                this.$confirm('确认处理此条转账记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        order_id: id
                    };
                    money_api.transferTransfer(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '转账成功！邮件发送成功！'
                                message: "操作成功"
                            });
                            this.getTransferList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                            this.getTransferList();
                        }

                    });

                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.dialogData = {};
                this.$refs['userFormRef'].resetFields();
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.filters.update_time_from = "";
                this.filters.update_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getTransferList();
            },
            //转出账户类型
            // transferStateFormatter(row){
            //     console.log(row.account_type)
            //    // return dict.outIdType[row.account_type];
            //     switch (row.account_type) {
            //         case 1:
            //             return 'BAPPTI账户_A';
            //         case 2:
            //             return 'BAPPTI账户_B';
            //         case 3:
            //             return 'ECN账户';
            //         default:
            //             return ' - - ';
            //     }
            //
            // },




            /*tableWithdrawTypeFormatter(row){
                return dict.balance_change_type[row.cause];
            },*/
            tableStatusFormatter(row) {
                row.completeDisplay = false;
                row.ignoreDisplay = false;
                row.manualDisplay = false;
                switch (row.order_status) {
                    case 2:
                        row.completeDisplay = true;
                        row.ignoreDisplay = true;
                        break;
                    case 101:
                        row.manualDisplay = true;
                        row.ignoreDisplay = true;
                        break;
                }
                return dict.order_status[row.order_status];
            },

            getInWithdrawListByUserId() {
                //TODO 根据用户id查询出入金记录
                this.dialog.in_withdraw_data = [];
            },
            getTransferDataByUserId() {
                //TODO 根据用户id查询转账记录
                this.dialog.transfer_data = [];
            },
            getHoldRecordDataByUserId() {
                //TODO 根据用户id查询转账记录
                this.dialog.hold_record_data = [];
            },
            //切换table
            handleTabsClick(tab, event) {
            },
            changeInWithdrawPageNumber() {
                this.getInWithdrawListByUserId();
            },
            changeTransferPageNumber() {
                this.getTransferDataByUserId();
            },
            changeHoldRecordPageNumber() {
                this.getHoldRecordDataByUserId();
            },
            setRoleDidsplay() {
                let user = this.$store.getters.getUserInfo;
                if(!user || !user.role_name){
                    let cuser=util.cookieMethod.getCookie('user')
                    user =  JSON.parse(cuser)
                }
                let role_name = user.role_name;
                if (!role_name) {
                    role_name = "";
                }
                if (role_name.indexOf("资金岗") > -1 || role_name.indexOf("admin") > -1 || role_name.indexOf("管理员") > -1) {
                    this.roleDisplay.completeDisplay = true;
                    this.roleDisplay.ignoreDisplay = true;
                    this.roleDisplay.manualDisplay = true;
                }

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getTransferList();
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