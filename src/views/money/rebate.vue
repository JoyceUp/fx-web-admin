<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--//################################################## AA 返利列表 [start]##############################################-->
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" ref="filters">
                <el-form-item prop="updateDate">
                    <div class="block">
                        <el-date-picker
                                v-model="filters.rebate_date"
                                type="date" @change="handleUpdateDateChange"
                                placeholder="返利日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="操作人姓名"
                            v-model="filters.operator">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"  @click="getRebateList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="resetSearch('filters')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--数据列表-->
        <el-table
                :data="datas"
                style="width: 100%">
            <el-table-column
                    prop="rebate_date"
                    :formatter="tableDateFormatter"
                    label="返利日期">
            </el-table-column>
            <el-table-column label="查看">
                <template slot-scope="scope">
                    <el-button
                            @click="getOneDayInfoList(scope.row.rebate_date)">查看返利
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="operator"
                    label="操作人">
            </el-table-column>
            <el-table-column
                    prop="operate_date"
                    label="操作时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    :formatter="tableStatusFormatter"
                    label="状态">
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--分页-->
            <el-pagination
                    style="text-align: right;"
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

        <!--//################################################## AA 返利列表 [end]##############################################-->

        <!--//################################################## CC onday info [start]##############################################-->
        <!-- 返利详情列表 -->
        <el-dialog :title="dialogListInfo.title" fullscreen :visible.sync="dialogListInfo.dialogFormListVisible" :before-close="resetInfoDialogData">
            <span slot="label"><i class="el-icon-date"></i> 详情</span>
            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

                <el-form :inline="true" :model="filters" ref="list_info_filters" >
                    <el-form-item prop="account_no">
                        <el-input
                                placeholder="客户账号"
                                v-model="filters2.account_no">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="account_no">
                        <el-input
                                placeholder="收利账号"
                                v-model="filters2.parent_account">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="order_status">
                        <el-select clearable  placeholder="角色" v-model="filters2.role_type">
                            <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options.role_type" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary"  @click="getOneDayInfoList(null)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="resetSearch('list_info_filters')">重置</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="exportOneDayInfoExcel">导出</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="rebateConfirmOneDay">审核通过</el-button>
                    </el-form-item>
                    <!--<el-form-item>
                        <el-button type="primary"  @click="rebateRepeatOneDay">重新读取余额</el-button>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button @click="resetInfoDialogData">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>


            <!--数据列表-->
            <el-table
                    :data="dialogListInfo.dialogData"
                    style="width: 100%">
                <el-table-column
                        :formatter="tableDateShow"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="role_type"
                        :formatter="tableRoleTypeFormatter"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="account_no"
                        label="收利账号">
                </el-table-column>
                <el-table-column
                        prop="source_account_no"
                        label="客户账号">
                </el-table-column>
                <el-table-column
                        label="客户余额">
                    <template slot-scope="scope">
                        {{scope.row.source_account_balance / 100}}
                    </template>
                </el-table-column>
                <el-table-column
                        :formatter="tableRateFormatter"
                        label="返利比例">
                </el-table-column>
                <el-table-column
                        label="余额返利(USD)">
                    <template slot-scope="scope">
                        {{scope.row.amount / 100}}
                    </template>
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <!--分页-->
                <el-pagination
                        style="text-align: right;"
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :page-size="pager2.page_size"
                        :page-sizes="pager2.sizes"
                        background
                        :current-page="pager2.page_no"
                        layout="prev,pager,next,sizes,total"
                        :total="pager2.total">
                </el-pagination>
            </el-col>
        </el-dialog>
        <!--//################################################## CC onday info [end]##############################################-->
        <!-- 统计列表 TODO -->
    </section>
</template>
<script>
    import * as money_api from '../../api/money_api.js';

    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download'

    export default {
        props:["params"],
        data() {
            return {
                loading:"",
                statistics: {},     //统计
                options: {
                    role_type: dict.role_type_select,
                    order_status: dict.rebate_order_status_select
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                //分页设置
                pager2: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                filters: {
                    rebate_date: '',
                    operator: ''
                },
                filters2: {
                    rebate_date: '',
                    account_no: '',
                    parent_account: '',
                    role_type: ''
                },
                dialogListInfo: {
                    title: "查看返利",
                    dialogFormListVisible: false,
                    dialogData: [],
                    formLabelWidth: '150px',
                    formInputWidth:'80px',
                    hold_record_data: [],
                    hold_record_data_total: 110,
                }
            }
        },
        methods: {
            openLoading(txt) {
                let text =   txt || "Loading";
                this.loading = this.$loading({
                    lock: true,
                    text: text,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // loading.close();
            },
            //################################################## AA 返利列表 [start]##############################################
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
                this.getRebateList();
            },
            //返利列表
            getRebateList() {
                let condition = {
                    rebate_date: this.filters.rebate_date ? this.filters.rebate_date + " 00:00:00" : "",
                    operator: this.filters.operator
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.rebateList(params).then((res) => {
                    if(res.data.status == 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                    }else{
                        if(res.data.status == 401){
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }

                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            //################################################## AA 返利列表 [end]##############################################

            //审核通过
            rebateConfirmOneDay(){
                this.$confirm('确认审核通过？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,   //不通过点击遮罩关闭弹框
                    type: 'info'
                }).then(() => {
                    this.openLoading("审核中");
                    let condition = {
                        rebate_date: this.filters2.rebate_date
                    };
                    let params = {
                        page_size: this.pager2.page_size,
                        page_no: this.pager2.page_no,
                        condition: condition
                    };

                    money_api.rebateConfirmOneDay(params).then((res) => {
                        this.loading.close();
                        if(res.data.status == 200) {
                            this.$message({message:'审核通过成功', type: 'success'});
                            //重新请求返利列表
                            this.getRebateList();
                            //重新请求one day 列表
                            this.getOneDayInfoList(this.filters2.rebate_date);
                        }else{
                            if(res.data.status == 401){
                                // this.$router.push('/login');
                            }
                            this.$message.error(res.data.status+" "+res.data.msg);
                        }
                    }).catch((e) => {
                        this.$message({
                            type: 'info',
                            message: e.message
                        });
                    });
                }).catch((e) => {

                });
            },
            //################################################## CC onday info [start]##############################################

            //分页page_size发生改变
            handleSizeChange2(val) {
                this.pager2.page_no = 1;
                this.pager2.page_size = val;
                this.handlePagerChange2();
            },
            //page_no
            handleCurrentChange2(val) {
                this.pager2.page_no = val;
                this.handlePagerChange2();
            },
            //分页引起的页面数据更改
            handlePagerChange2() {
                this.getOneDayInfoList();
            },
            //one day 详情列表，客户列表
            getOneDayInfoList(rebate_date) {
                if(rebate_date){
                    this.filters2.rebate_date = rebate_date;
                }
                let condition = {
                    rebate_date: this.filters2.rebate_date,
                    account_no: this.filters2.account_no,
                    parent_account: this.filters2.parent_account,
                    role: this.filters2.role_type
                };
                let params = {
                    page_size: this.pager2.page_size,
                    page_no: this.pager2.page_no,
                    condition: condition
                };

                money_api.rebateOneDayInfoList(params).then((res) => {
                    if(res.data.status == 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.dialogListInfo.dialogFormListVisible = true;
                        this.dialogListInfo.dialogData = datas.items;
                        this.pager2.total = datas.total;
                        //获取统计信息
                        money_api.rebateOneDayInfoListSummary(params).then((res) => {
                            let datas = JSON.parse(res.data.datas);
                            this.dialogListInfo.dialogData.push(datas);
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: e.message
                            });
                        });
                    }else{
                        if(res.data.status == 401){
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            //导出客户列表
            exportOneDayInfoExcel() {
                let params = {
                    rebate_date: this.filters2.rebate_date,
                    account_no: this.filters2.account_no,
                    parent_account: this.filters2.parent_account,
                    role: this.filters2.role_type
                };
                money_api.rebateExportOneDayInfoList(params).then((res) => {
                    fileDownload(res, this);
                    /*if (res.data.status == 200 && !res.data.status) {
                        fileDownload(res);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }*/
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            //################################################## CC onday info [end]##############################################
            resetInfoDialogData() {       //重置 表单
                this.dialogListInfo.dialogFormListVisible = false;
                this.dialogListInfo.dialogData = [];
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                if(formName == 'filters'){
                    this.filters = {};
                    this.pager.page_no = 1;
                    this.getRebateList();
                }else{
                    this.filters2.account_no = "";
                    this.filters2.parent_account = "";
                    this.filters2.role_type = "";
                    this.pager2.page_no = 1;
                    this.getOneDayInfoList(null);
                }
                this.$refs[formName].resetFields();
            },
            //状态
            tableStatusFormatter(row){
                return dict.rebate_order_status_map[row.status];
            },
            //角色
            tableRoleTypeFormatter(row){
                return dict.role_type_map[row.role_type];
            },
            //日期格式化
            tableDateFormatter(row){
                return row.rebate_date.substring(0, 10);
            },
            tableRateFormatter(row){
                if(row.rate){
                    return (row.rate / 10000) + "%";
                }
                return ""
            },
            tableDateShow(row){
                if(row.account_no){
                    return this.filters2.rebate_date.substring(0, 10);
                }
                return "查询结果合计";
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getRebateList();
            })
        }

    }
</script>