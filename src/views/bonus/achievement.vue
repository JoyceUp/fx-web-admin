<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="createDate">
                    <div class="block">
                        <el-date-picker
                                v-model="filters.date"
                                type="month"
                                placeholder="选择日期"
                                value-format="yyyy-MM">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item prop="account_no">
                    <el-input
                            placeholder="销售账号"
                            v-model.trim="filters.account_no">
                    </el-input>
                </el-form-item>
                <el-form-item prop="full_name">
                    <el-input
                            placeholder="销售姓名"
                            v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="cause">
                    <el-select clearable placeholder="销售类别" v-model="filters.type">
                        <el-option key="" label="全部" value=" "></el-option>
                        <el-option :key="key" :label="val" :value="key"
                                   v-for="(val, key) in options.deposit_type"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="" prop="department">
                    <!--v-if="departmentTree != ''||departmentTree.length>0"-->
                    <el-select clearable placeholder="部门" @change="changeDepartmenty" v-model="filters.department" @clear="clearGroup">
                        <el-option :key="item.id" :label="item.department_name" :value="item.id" v-for="item in departmentTree" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="group">
                    <!--v-if="teamTree != ''||teamTree.length>0"-->
                    <el-select clearable placeholder="组别" v-model="filters.group">
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

        <!-- ==================================================数据列表--------------------------------- -->
        <el-table
                :data="datas"
                stripe
                v-loading="listLoading"
                style="width: 100%">
            <el-table-column
                    width="100"
                    prop="performance_date"
                    label="年月">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="account_no"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="销售姓名">
            </el-table-column>
            <el-table-column
                    prop="sales_state"
                    :formatter="salesStateFormatter"
                    label="销售类别">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="position"
                    :formatter="positionFormatter"
                    label="职位名称">
            </el-table-column>
            <el-table-column
                    prop="dept_name"
                    label="部门">
            </el-table-column>
            <el-table-column
                    width="60"
                    prop="team_name"
                    label="组别">
            </el-table-column>
             <el-table-column
                     width="120"
                     prop="rebate"
                     :formatter="sToFixed"
                     label="余额返利(USD)">
             </el-table-column>
            <el-table-column
                    width="120"
                    prop="commission"
                    :formatter="sToFixed"
                    label="交易返佣(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="sales_reward"
                    :formatter="sToFixed"
                    label="销售提成(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="leader_reward"
                    :formatter="sToFixed"
                    label="总监提成(USD)">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="total"
                    :formatter="sToFixed"
                    label="本月合计(USD)">
            </el-table-column>
            <el-table-column label="查看" width="80">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="achievementDetails(scope.row.performance_date, scope.row.account_no, scope.row.owner_id)">明细
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

        <!-- ==============================业绩详情---------------------------------- -->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" fullscreen :before-close="resetDialogData"
                   class="text-from">
            <!--数据列表-->
            <el-table
                    :data="dialog.dialogData"
                    stripe
                    v-loading="dialog.listLoading"
                    style="width: 100%">
                <el-table-column
                        width="100"
                        prop="performance_date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="account_no"
                        label="销售账号">
                </el-table-column>
                <el-table-column
                        prop="full_name"
                        label="销售姓名">
                </el-table-column>
                <el-table-column
                        prop="sales_state"
                        :formatter="salesStateFormatter"
                        label="销售类别">
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="position"
                        :formatter="positionFormatter"
                        label="职位名称">
                </el-table-column>
                <el-table-column
                        prop="dept_name"
                        label="部门">
                </el-table-column>
                <el-table-column
                        width="60"
                        prop="team_name"
                        label="组别">
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="rebate"
                        label="余额返利(USD)">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="rebate(scope.row.performance_date, scope.row.account_no)"
                        >{{ scope.row.rebate }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="commission"
                        label="交易返佣(USD)">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="commission(scope.row.performance_date, scope.row.account_no)"
                        >{{ scope.row.commission }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="sales_reward"
                        label="销售提成(USD)">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="salesReward(scope.row.performance_date, scope.row.owner_id)"
                        >{{ scope.row.sales_reward }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="leader_reward"
                        label="总监提成(USD)">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="leaderReward(scope.row.performance_date, scope.row.owner_id)"
                        >{{ scope.row.leader_reward }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        width="120"
                        prop="total"
                        :formatter="sToFixed"
                        label="本日合计(USD)">
                </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <!--分页-->
                <el-pagination
                        style="text-align: center;"
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :page-size="dialog.pager.page_size"
                        :page-sizes="dialog.pager.sizes"
                        background
                        :current-page="dialog.pager.page_no"
                        layout="prev,pager,next,sizes,total"
                        :total="dialog.pager.total">
                </el-pagination>
            </el-col>
        </el-dialog>

        <!-- ==============================余额返利明细---------------------------------- -->
        <el-dialog :title="dialog1.title" :visible.sync="dialog1.dialogFormVisible" :before-close="resetDialog1Data"
                   class="text-from">
            <rebate ref="rebate" :start_time="dialog.condition.start_time" :account_no="dialog.condition.account_no"></rebate>
        </el-dialog>
        <!-- ==============================交易返佣明细---------------------------------- -->
        <el-dialog :title="dialog2.title" :visible.sync="dialog2.dialogFormVisible" :before-close="resetDialog2Data"
                   class="text-from">
            <commission ref="commission" :start_time="dialog.condition.start_time" :account_no="dialog.condition.account_no"></commission>
        </el-dialog>
        <!-- ==============================销售提成---------------------------------- -->
        <el-dialog :title="dialog3.title" :visible.sync="dialog3.dialogFormVisible" :before-close="resetDialog3Data"
                   class="text-from">
            <sales ref="sales" :start_time="dialog.condition.start_time" :owner_id="dialog.condition.owner_id"></sales>
        </el-dialog>
        <!-- ==============================总监提成---------------------------------- -->
        <el-dialog :title="dialog4.title" :visible.sync="dialog4.dialogFormVisible" :before-close="resetDialog4Data"
                   class="text-from">
            <chief_inspector ref="chief_inspector" :start_time="dialog.condition.start_time" :owner_id="dialog.condition.owner_id"></chief_inspector>
        </el-dialog>
    </section>

</template>

<script>
    import rebate from './detail/rebate'
    import commission from './detail/commission'
    import sales from './detail/sales'
    import * as sale_api from '../../api/sale_api';
    import chief_inspector from './detail/chief_inspector'

    import util from '../../common/js/util'
    import * as money_api from '../../api/bonus_api.js';
    import * as date from "../../common/js/date"
    import {centToDollar, computeRate, trimBlank, getnewjson} from "../../common/js/commons"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        components:{
            'rebate': rebate,
            'commission': commission,
            'sales': sales,
            'chief_inspector': chief_inspector
        },
        props: ["params"],
        data() {
            return {
                listLoading: false,
                statistics: {},     //统计
                options: {
                    type: dict.deposit_type,
                    deposit_type: dict.sales_state,
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
                    date: '',
                    account_no: '',
                    full_name: '',
                    type: '',
                    department: '',
                    group: ''
                },
                dialog: {
                    listLoading: false,
                    title: "查看明细",
                    dialogFormVisible: false,
                    dialogData: {},
                    condition: {
                        start_time: "",
                        account_no: "",
                        owner_id: ""
                    },
                    formLabelWidth: '150px',
                    formInputWidth: '80px',
                    //分页设置
                    pager: {
                        sizes: [10, 20, 30, 40, 50],
                        total: 0,
                        page_size: 10,
                        page_no: 1
                    }
                },
                dialog1: {
                    title: "查看返利明细",
                    dialogFormVisible: false
                },
                dialog2: {
                    title: "查看交易返佣",
                    dialogFormVisible: false
                },
                dialog3: {
                    title: "查看销售提成",
                    dialogFormVisible: false
                },
                dialog4: {
                    title: "查看总监提成",
                    dialogFormVisible: false
                },
                //部门/组
                companyTree: '',
                departmentTree:'',
                teamTree:'',
                tree_data:''
            }
        },
        methods: {
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
                var start_time = this.filters.date ? this.filters.date + "-01 00:00:00" : "";
                this.listLoading = true;
                let condition = {
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    sales_state: trimBlank(this.filters.type),
                    department_id: trimBlank(this.filters.department),
                    team_id: trimBlank(this.filters.group),
                    start_time: start_time,
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };

                money_api.achievementList(params).then((res) => {
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
                var start_time = this.filters.date ? this.filters.date + "-01 00:00:00" : "";
                let condition = {
                    account_no: this.filters.account_no,
                    full_name: this.filters.full_name,
                    sales_state: trimBlank(this.filters.type),
                    department_id: trimBlank(this.filters.department),
                    team_id: trimBlank(this.filters.group),
                    start_time: start_time,
                    export: 1
                };
                let params = {
                    condition: condition
                };
                money_api.achievementExport(params).then((res) => {
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
                this.dialog.dialogData = [];
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters = {
                    date: '',
                    account_no: '',
                    full_name: '',
                    type: '',
                    department: '',
                    group: ''
                };
                this.$refs[formName].resetFields();
                this.getDepositList();
                this.teamTree = "";
            },
            //分页page_size发生改变
            handleSizeChange1(val) {
                this.dialog.pager.page_no = 1;
                this.dialog.pager.page_size = val;
                this.handlePagerChange1();
            },
            //page_no
            handleCurrentChange1(val) {
                this.dialog.pager.page_no = val;
                this.handlePagerChange1();
            },
            //分页引起的页面数据更改
            handlePagerChange1() {
                this.achievementDetails();
            },
            achievementDetails(start_time, account_no, owner_id) {
                if(start_time){
                    this.dialog.condition.start_time = start_time + "-01 00:00:00";
                }
                if(account_no){
                    this.dialog.condition.account_no = account_no;
                }
                if(owner_id){
                    this.dialog.condition.owner_id = owner_id;
                }

                let params = {
                    condition:{
                        start_time: this.dialog.condition.start_time,
                        account_no: this.dialog.condition.account_no
                    },
                    page_size: this.dialog.pager.page_size,
                    page_no: this.dialog.pager.page_no
                };

                money_api.achievementDetails(params).then((res) => {
                    if (res.data.status === 200) {
                        let row = JSON.parse(res.data.datas);
                        this.dialog.dialogFormVisible = true;
                        this.dialog.dialogData = row.items;
                        this.dialog.pager.total = row.total;
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            salesStateFormatter(row, column) {
                return dict.sales_state[row[column.property]];
            },
            positionFormatter(row, column) {
                return dict.sales_position_map[row[column.property]];
            },
            sToFixed(row, column) {
                return Number(row[column.property]).toFixed(2);
            },
            rebate(start_time, account_no){
                this.dialog1.dialogFormVisible = true;
                this.$nextTick(function () {
                    this.$refs.rebate.getList(start_time, account_no);
                })
            },
            resetDialog1Data() {       //重置 表单
                this.dialog1.dialogFormVisible = false;
                this.dialog1.dialogData = [];
                this.$nextTick(function () {
                    this.$refs.rebate.resetSearch("filters");
                });
            },
            commission(start_time, account_no){
                this.dialog2.dialogFormVisible = true;
                this.$nextTick(function () {
                    this.$refs.commission.getList(start_time, account_no);
                });
            },
            resetDialog2Data() {       //重置 表单
                this.dialog2.dialogFormVisible = false;
                this.dialog2.dialogData = [];
                this.$nextTick(function () {
                    this.$refs.commission.resetSearch("filters");
                });
            },
            salesReward(start_time, owner_id){
                this.dialog3.dialogFormVisible = true;
                this.$nextTick(function () {
                    this.$refs.sales.init(start_time, owner_id);
                });
            },
            resetDialog3Data() {       //重置 表单
                this.dialog3.dialogFormVisible = false;
                this.dialog3.dialogData = [];
                this.$nextTick(function () {
                    this.$refs.sales.resetSearch("filters");
                });
            },
            leaderReward(start_time, owner_id){
                this.dialog4.dialogFormVisible = true;
                this.$nextTick(function () {
                    this.$refs.chief_inspector.init(start_time, owner_id);
                })
            },
            resetDialog4Data() {       //重置 表单
                this.dialog4.dialogFormVisible = false;
                this.dialog4.dialogData = [];
                this.$nextTick(function () {
                    this.$refs.chief_inspector.resetSearch("filters");
                });
            },
            toMoney(row, column) {
                return (row[column.property] / 100) || 0 ;
            },
            //部门/组联动
            initTreeData() {     //从 服务器获取数据
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);

                        if(raw_tree_list){
                            this.tree_data = raw_tree_list;
                            this.companyTree = raw_tree_list.children;
                            this.departmentTree = getnewjson(this.companyTree);
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
                this.filters.group = "";
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