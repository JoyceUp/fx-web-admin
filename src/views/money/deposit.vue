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
                    <el-select clearable placeholder="入金类型" v-model="filters.cause">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.deposit_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="account_type">
                    <el-select clearable placeholder="账户类型" v-model="filters.account_type">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="order_status">
                    <el-select clearable placeholder="订单状态" v-model="filters.order_status">
                        <el-option key="" label="全部" value=" "></el-option>
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

                <el-form-item>
                    <el-button type="primary" @click="searchList" size="small">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetSearch('filters')" size="small">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exportExcel" size="small">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--数据列表-->
        <el-table
                :data="datas"
                stripe
                v-loading="listLoading"
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
                    width="120"
                    prop="amount"
                    :formatter="cent2dollar"
                    label="入金金额(USD)">
            </el-table-column>
            <el-table-column
                    prop="cause"
                    :formatter="tableDepositTypeFormatter"
                    label="入金类型">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="rate"
                    :formatter="getRate"
                    label="汇率">
            </el-table-column>
             <el-table-column
                     width="120"
                     :formatter="payAmountCNY"
                     prop="pay_amount"
                     label="支付金额(CNY)">
             </el-table-column>
            <el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="支付金额(USD)">
            </el-table-column>
            <el-table-column
                    prop="order_status"
                    :formatter="tableStatusFormatter"
                    label="订单状态">
            </el-table-column>
            <el-table-column
                    width="160"
                    prop="gmt_create"
                    label="提交时间">
            </el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="depositDetails(scope.row.id, scope.row.cause)">查看
                    </el-button>
                    <el-button size="mini"
                               @click="depositIncrease(scope.row.id, scope.row.cause)"
                               v-if="roleDisplay.increaseDisplay && scope.row.increaseDisplay">入账
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="depositConfirm(scope.row.id, scope.row.cause)"
                               v-if="roleDisplay.confirmDisplay && scope.row.confirmDisplay">确认
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="depositManualIncrease(scope.row.id, scope.row.cause)"
                               v-if="roleDisplay.manualDisplay&& scope.row.manualDisplay">处理
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="depositIgnore(scope.row.id, scope.row.cause)"
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


        <!-- 入金详情 -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" :before-close="resetDialogData"
                   class="text-from">
            <el-tabs>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 入金详情</span>
                    <el-form :model="dialog.dialogData" ref="userFormRef" :label-width="dialog.formLabelWidth">
                        <el-form-item label="订单号：">
                            <span>{{ dialog.dialogData.order_no }}</span>
                        </el-form-item>
                        <el-form-item label="MT4账号：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.account_no }}</span>
                        </el-form-item>
                        <el-form-item label="入金类型：" :label-width="dialog.formLabelWidth">
                            <span>{{ options.balance_change_type[dialog.dialogData.cause] }}</span>
                        </el-form-item>
                        <el-form-item label="入金金额(USD)：" :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.amount) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause != 4" label="汇率："
                                      :label-width="dialog.formLabelWidth">
                            <span>{{ getRate(dialog.dialogData.rate) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause != 4" label="支付金额(CNY)："
                                      :label-width="dialog.formLabelWidth">
                            <span>{{ cent2dollar(dialog.dialogData.pay_amount) }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause === 4" label="支付金额(USD)："
                                      :label-width="dialog.formLabelWidth">
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
                            <!-- <el-input v-model="dialog.dialogData.order_status" auto-complete="off"></el-input>-->
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="dialog.formLabelWidth">
                            <span>{{ dialog.dialogData.remark }}</span>
                        </el-form-item>
                        <el-form-item v-if="dialog.dialogData.cause === 4" label="汇票单据："
                                      :label-width="dialog.formLabelWidth">
                            <span><img @click="showBigImg('/common/images/' + dialog.dialogData.proof_photo_id)"
                                       width="60%" :src="'/common/images/' + dialog.dialogData.proof_photo_id"/></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- <div slot="footer" class="dialog-footer">
               <el-button @click="resetDialogData">取 消</el-button>
                </div>-->

            </el-tabs>
        </el-dialog>
        <!--显示大图-->
        <el-dialog :title="dialog.imgTitle" :visible.sync="dialog.dialogImgVisible" class="text-from" width="90%">
            <img width="100%" :src="dialog.imgSrc"/>
        </el-dialog>
        <!-- 统计列表 TODO -->

    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/money_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar, computeRate,trimBlank} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        props: ["params"],
        data() {
            return {
                clearable:false,
                roleDisplay: {
                    isCaiWu: false,
                    isZiJinGang: false,
                    increaseDisplay: false,
                    confirmDisplay: false,
                    ignoreDisplay: false,
                    manualDisplay: false,
                },
                listLoading: false,
                statistics: {},     //统计
                options: {
                    type: dict.deposit_type,
                    deposit_type: dict.deposit_deposit_type,
                    status: dict.deposit_status,
                    order_status: dict.order_status,
                    balance_change_type: dict.balance_change_type
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
                    createDate: ''
                },
                dialog: {
                    title: "入金详情",
                    dialogFormVisible: false,
                    imgTitle: "显示大图",
                    dialogImgVisible: false,
                    imgSrc: "",
                    dialogData: {},
                    formLabelWidth: '150px',
                    formInputWidth: '80px'
                }
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
                if(row.cause === 4)
                {
                    return "";
                }
                return this.cent2dollar(row.pay_amount);
            },
            //支付金额USD
            payAmountUSD(row){
                if(row.cause === 4)
                {
                    return this.cent2dollar(row.pay_amount);
                }
                return "";
            },
            //美分变美元
            cent2dollar(row, column) {
                if (column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //提交时间发生改变
            handleCreateDateChange(val) {
                this.filters.order_time_from = val[0];
                this.filters.order_time_to = val[1];
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
                this.getDepositList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getDepositList();
            },
            //查询列表
            getDepositList() {

                this.listLoading = true;
                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: trimBlank(this.filters.cause),
                    account_type: trimBlank(this.filters.account_type),
                    order_status: trimBlank(this.filters.order_status),
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to)
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.depositList(params).then((res) => {
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
            exportExcel() {

                let condition = {
                    order_no: this.filters.order_no,
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    cause: trimBlank(this.filters.cause),
                    account_type: trimBlank(this.filters.account_type),
                    order_status: trimBlank(this.filters.order_status),
                    order_time_from: date.dateStart(this.filters.order_time_from),
                    order_time_to: date.dateEnd(this.filters.order_time_to)
                };
                money_api.depositExport(condition).then((res) => {
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
            depositDetails(id, cause) {
                let params = {
                    order_id: id,
                    cause: cause
                };
                money_api.depositDetails(params).then((res) => {
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
            depositConfirm(id, cause) {
                this.$confirm('确认已到账？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        order_id: id,
                        cause: cause
                    };
                    money_api.depositConfirm(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '确认成功!'
                                message: "操作成功"
                            });
                            this.getDepositList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getDepositList();
                        }

                    });
                }).catch((e) => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            depositIgnore(id, cause) {
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
                    money_api.depositIgnore(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已成功忽略该条入金记录，邮件已发送!'
                                message: "操作成功"
                            });
                            this.getDepositList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getDepositList();
                        }
                    });

                }).catch((e) => {
         /*           this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });
            },
            depositIncrease(id, cause) {
                this.$confirm('确认处理此条入金记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {

                    let params = {
                        cause: cause,
                        order_id: id
                    };
                    money_api.depositIncrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '处理入金记录成功。已成功入账!'
                                message: "操作成功"
                            });
                            this.getDepositList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                            this.getDepositList();
                        }

                    });

                }).catch((e) => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            depositManualIncrease(id, cause) {
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
                    money_api.depositManualIncrease(params).then((res) => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: 'success',
                                //message: '已处理完成！'
                                message: "操作成功"
                            });
                            this.getDepositList();
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                            this.getDepositList();
                        }
                    });

                }).catch((e) => {
                    /*this.$message({
                        type: 'info',
                        message: e.message
                    });*/
                });

            },
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                /*  this.dialog.dialogData = {};
                this.$refs['userFormRef'].resetFields();*/
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_time_from = "";
                this.filters.order_time_to = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getDepositList();
            },
            tableTypeFormatter(row, column) {
                return dict.customer_two_type[row.account_type];
            },
            tableDepositTypeFormatter(row, column) {
                return dict.balance_change_type[row.cause];
            },
            tableStatusFormatter(row, column) {
                row.increaseDisplay = false;
                row.confirmDisplay = false;
                row.ignoreDisplay = false;
                row.manualDisplay = false;
                switch (row.order_status) {
                    case 2://待审核   资金岗有忽略，财务无忽略
                        row.increaseDisplay = true; //入账
                        row.ignoreDisplay = this.roleDisplay.isZiJinGang;//忽略
                        break;
                    case 3://待到账确认  资金岗无忽略，财务有忽略
                        row.confirmDisplay = true;//确认
                        row.ignoreDisplay = this.roleDisplay.isCaiWu;//忽略
                        break;
                    case 101:
                        row.manualDisplay = true;
                        break;
                }
                return dict.order_status[row.order_status];
            },
            setRoleDidsplay() {

                let user = this.$store.getters.getUserInfo;
                // console.log(user)
                if(!user || !user.role_name){
                    let cuser=util.cookieMethod.getCookie('user')

                   user =  JSON.parse(cuser)

                }
                let role_name = user.role_name;

                if (!role_name) {
                    role_name = "";
                }
                if (role_name.indexOf("资金岗") > -1) {
                    this.roleDisplay.isZiJinGang = true;
                    this.roleDisplay.increaseDisplay = true;
                    this.roleDisplay.ignoreDisplay = true;
                    this.roleDisplay.manualDisplay = true;

                } else if (role_name.indexOf("财务") > -1) {
                    this.roleDisplay.isCaiWu = true;
                    this.roleDisplay.confirmDisplay = true;
                    this.roleDisplay.ignoreDisplay = true;
                } else if (role_name.indexOf("admin") > -1 || role_name.indexOf("管理员") > -1) {
                    this.roleDisplay.isZiJinGang = true;
                    this.roleDisplay.isCaiWu = true;
                    this.roleDisplay.increaseDisplay = true;
                    this.roleDisplay.ignoreDisplay = true;
                    this.roleDisplay.manualDisplay = true;
                    this.roleDisplay.confirmDisplay = true;
                }

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getDepositList();
                this.setRoleDidsplay();
            })
        }

    }
</script>

<style lang="scss">
    .el-button {
        margin: 4px !important
    }
    .el-table .cell
    {
        padding-left:5px!important;
        padding-right:5px!important;
    }
</style>