<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="daterange">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable" v-model="filters.daterange" type="daterange" @change="getDateChange"
                                start-placeholder="返佣日期" end-placeholder="返佣日期" placeholder="请选择返佣日期范围"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input placeholder="账号" v-model.trim="filters.account_no"></el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input placeholder="姓名" v-model.trim="filters.full_name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchList" size="small">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetSearch('filters')" size="small">清空</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exportExcel" size="small">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--数据列表-->
        <el-table :data="datas" stripe v-loading="listLoading" style="width: 100%">
            <el-table-column prop="date" label="返佣日期"></el-table-column>
            <el-table-column prop="account_no" label="账号"></el-table-column>
            <el-table-column prop="full_name" label="姓名"></el-table-column>
            <el-table-column prop="sum" label="收益总计（USD）"></el-table-column>
            <el-table-column prop="sales_account_no" label="销售账号"></el-table-column>
            <el-table-column prop="sales_full_name" label="销售姓名"></el-table-column>
            <el-table-column prop="department_name" label="部门"></el-table-column>
            <el-table-column prop="team_name" label="组"></el-table-column>
            <el-table-column prop="level" label="档位"></el-table-column>
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
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import * as money_api from '../../api/bonus_api.js';
    import * as date from "../../common/js/date"
    import * as commons from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import * as sale_api from '../../api/sale_api';

    export default {
        props: ["params"],
        data() {
            return {
                listLoading: false,
                statistics: {},     //统计
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                datas: [],
                filters: {
                    "daterange": "",                         //日期
                    "start_time": '',                   //开始时间
                    "end_time": '',                     //结束时间
                    "account_no": "",                   //"账号",
                    "full_name": ""                     //客户姓名
                },
                clearable: false,
            }
        },
        methods: {
            //支付金额USD
            div(value, value2){
                return commons.accDiv(value, value2);
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
            getDateChange(val){
                this.filters.start_time = val[0];
                this.filters.end_time = val[1];
            },
            //查询列表
            getDepositList() {

                this.listLoading = true;
                let condition = {
                    start_date: this.filters.start_time,
                    end_date: this.filters.end_time,
                    account_no: this.filters.account_no,
                    full_name: commons.trimBlank(this.filters.full_name),
                    export: 0
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.ibActivityList(params).then((res) => {
                    if (res.data.status == 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.datas = datas.items;
                        this.pager.total = datas.total;
                        console.log(this.datas[0].date)
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
                    start_date: this.filters.start_time,
                    end_date: this.filters.end_time,
                    account_no: this.filters.account_no,
                    full_name: commons.trimBlank(this.filters.full_name),
                    export: 1
                };
                let params = {
                    condition: condition
                };
                money_api.ibActivityExport(params).then((res) => {
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
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.$refs[formName].resetFields();
                this.filters.start_time = '';
                this.filters.end_time = '';
                this.pager.page_no = 1;
                this.getDepositList();
            },
        },
        mounted() {
            this.$nextTick(function () {
                this.getDepositList();
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