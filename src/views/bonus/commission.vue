<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                :clearable="clearable"
                                v-model="filters.date"
                                type="daterange" @change="getDateChange"
                                start-placeholder="返佣日期" end-placeholder="返佣日期" placeholder="请选择返佣日期范围"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="mt4_order_no">
                    <el-input
                            placeholder="单号"
                            v-model.trim="filters.mt4_order_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="收佣账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="owner_role">
                    <el-select clearable placeholder="角色" v-model="filters.owner_role">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="item.value" :label="item.key" :value="item.value"
                                   v-for="item in options.deposit_type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="source_account_no">
                    <el-input
                            placeholder="客户账号"
                            v-model.trim="filters.source_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="source_account_full_name">
                    <el-input
                            placeholder="客户姓名"
                            v-model.trim="filters.source_account_full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="sale_account">
                    <el-input
                            placeholder="销售账号"
                            v-model.trim="filters.sale_account">
                    </el-input>
                </el-form-item>
                <el-form-item prop="sale_full_name">
                    <el-input
                            placeholder="销售姓名"
                            v-model.trim="filters.sale_full_name">
                    </el-input>
                </el-form-item>

                <el-form-item label="" prop="department">
                    <!--v-if="departmentTree != ''||departmentTree.length>0"-->
                    <el-select clearable placeholder="部门" @change="changeDepartmenty" v-model="filters.dept_id" @clear="clearGroup">
                        <el-option :key="item.id" :label="item.department_name" :value="item.id" v-for="item in departmentTree" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="group">
                    <!--v-if="teamTree != ''||teamTree.length>0"-->
                    <el-select clearable placeholder="组别" v-model="filters.team_id">
                        <el-option :key="item.id" :label="item.team_name" :value="item.id" v-for="item in teamTree" ></el-option>
                    </el-select>
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
        <el-table
                :data="datas"
                stripe
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    width="90"
                    prop="gmt_create"
                    label="返佣日期">
                <template slot-scope="scope">
                    <!--<span>{{ scope.row.gmt_create.substring(0, 10) }}</span>-->
                    <span>{{ scope.row.gmt_create}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="mt4_order_no"
                    label="单号">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="account_no"
                    label="收佣账号">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="owner_role"
                    :formatter="roleTypeFormatter"
                    label="角色">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="source_account_no"
                    label="客户账号">
            </el-table-column>
            <el-table-column
                    prop="source_account_full_name"
                    label="客户姓名">
            </el-table-column>
            <el-table-column
                    prop="source_account_type"
                    :formatter="tableTypeFormatter"
                    label="账户类型">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="trading_symbol"
                    label="交易品种">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="trading_volume"
                    label="手数">
                <template slot-scope="scope">
                    <span>{{ div(scope.row.trading_volume, 100) || 0 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="commission_rate"
                    label="返佣比例">
                <template slot-scope="scope">
                    <span>{{ scope.row.commission_rate || 0 }}USD/手</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="amount"
                    label="返佣金额(USD)">
                <template slot-scope="scope">
                    <span>{{ div(scope.row.amount, 100) || 0 }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column
                    width="120"
                    :formatter="payAmountUSD"
                    prop="pay_amount"
                    label="平仓时间">
            </el-table-column>-->
            <el-table-column
                    width="100"
                    prop="sale_account"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    prop="sale_full_name"
                    label="销售姓名">
            </el-table-column>
            <el-table-column
                    prop="dept_name"
                    label="部门">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="team_name"
                    label="组">
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
                options: {
                    type: dict.deposit_type,
                    deposit_type: dict.role_type_select,
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
                    "date": "",                         //日期
                    "start_time": '',                   //开始时间
                    "end_time": '',                     //结束时间
                    "mt4_order_no": "",                 //"单号",
                    "account_no": "",                   //"收佣账号",
                    "owner_role": "",
                    "source_account_no": "",            //"客户账号",
                    "source_account_full_name": "",     //客户姓名
                    "sale_account": "",                 //"销售账号",
                    "sale_full_name": "",               //"销售姓名"
                    "dept_id": "",                      //"部门Id"
                    "team_id": "",                      //"组id",
                },
                //部门/组
                companyTree: '',
                departmentTree:'',
                teamTree:'',
                tree_data:'',
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
                    start_created_date: date.dateStart(this.filters.start_time),
                    end_created_date: date.dateEnd(this.filters.end_time),
                    mt4_order_no: this.filters.mt4_order_no,
                    account_no: this.filters.account_no,
                    owner_role: this.filters.owner_role,
                    source_account_no: commons.trimBlank(this.filters.source_account_no),
                    source_account_full_name: commons.trimBlank(this.filters.source_account_full_name),
                    sale_account: commons.trimBlank(this.filters.sale_account),
                    sale_full_name: commons.trimBlank(this.filters.sale_full_name),
                    dept_id: this.filters.dept_id,
                    team_id: this.filters.team_id
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.commissionList(params).then((res) => {
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
                    start_created_date: date.dateStart(this.filters.start_time),
                    end_created_date: date.dateEnd(this.filters.end_time),
                    mt4_order_no: this.filters.mt4_order_no,
                    account_no: this.filters.account_no,
                    owner_role: this.filters.owner_role,
                    source_account_no: commons.trimBlank(this.filters.source_account_no),
                    source_account_full_name: commons.trimBlank(this.filters.source_account_full_name),
                    sale_account: commons.trimBlank(this.filters.sale_account),
                    sale_full_name: commons.trimBlank(this.filters.sale_full_name),
                    dept_id: this.filters.dept_id,
                    team_id: this.filters.team_id
                };
                money_api.commissionExport(condition).then((res) => {
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
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.dialogData = {};
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.$refs[formName].resetFields();
                this.filters = {
                    "date": "",                         //日期
                    "start_time": '',                   //开始时间
                    "end_time": '',                     //结束时间
                    "mt4_order_no": "",                 //"单号",
                    "account_no": "",                   //"收佣账号",
                    "owner_role": "",
                    "source_account_no": "",            //"客户账号",
                    "source_account_full_name": "",     //客户姓名
                    "sale_account": "",                 //"销售账号",
                    "sale_full_name": "",               //"销售姓名"
                    "dept_id": "",                      //"部门Id"
                    "team_id": "",                      //"组id",
                };
                this.getDepositList();
                this.pager.page_no = 1;
                this.teamTree = "";
            },
            tableTypeFormatter(row, column) {
                if(row.bappti_type != undefined && row.bappti_type != null) {
                    return dict.bappti_type[row.bappti_type];
                }
                return dict.customer_ib_type[row[column.property]];
            },
            roleTypeFormatter(row, column) {
                return dict.role_type_map[row[column.property]];
            },
            //部门/组联动
            initTreeData() {     //从 服务器获取数据
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);

                        if(raw_tree_list){
                            this.tree_data = raw_tree_list;
                            this.companyTree = raw_tree_list.children;
                            this.departmentTree = commons.getnewjson(this.companyTree);
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeDepartmenty(val){
                this.filters.team_id = "";
                for(var j = 0,len= this.departmentTree.length; j < len; j++) {
                    let department = this.departmentTree[j];

                    if(department.id==val){
                        if(department.children){
                            this.teamTree = department.children;
                            this.filters.group = '';
                        }else {
                            this.teamTree ='';
                        }
                    }
                }
            },clearGroup(){
                this.teamTree = "";
            }
        },
        mounted() {
            this.$nextTick(function () {
                //初始化部门和组
                this.initTreeData();
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