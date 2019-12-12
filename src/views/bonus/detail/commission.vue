<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

            <el-form :inline="true" :model="filters" ref="filters" size="medium">
                <el-form-item prop="mt4_order_no">
                    <el-input
                            placeholder="订单号"
                            v-model.trim="filters.mt4_order_no">
                    </el-input>
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
                <el-form-item>
                    <el-button type="primary" @click="searchList" size="small">查询</el-button>
                </el-form-item>
                <!--<el-form-item>
                    <el-button type="primary" @click="resetSearch('filters')" size="small">清空</el-button>
                </el-form-item>-->
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
                    prop="mt4_order_no"
                    label="订单号">
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
                    :formatter="accountTypeFormatter"
                    label="账户类别">
            </el-table-column>
            <el-table-column
                    prop="trading_symbol"
                    label="交易品种">
            </el-table-column>
            <el-table-column
                    prop="trading_volume"
                    :formatter="toMoney"
                    label="交易手数">
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="commission_rate"
                    label="返佣比例">
                <template slot-scope="scope">
                    {{ scope.row.commission_rate }}USD/手
                </template>
            </el-table-column>
            <el-table-column
                    width="120"
                    prop="amount"
                    :formatter="toMoney"
                    label="返佣金额(USD)">
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
    import * as money_api from '../../../api/bonus_api.js';
    import * as date from "../../../common/js/date"
    import dict from '../../../common/js/dict';

    export default {
        //父页面传来的数据
        props: ["start_time", "account_no"],
        data() {
            return {
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
                parents_data:{
                    start_time: '',
                    account_no: ''
                },
                filters: {
                    mt4_order_no: '',
                    source_account_no: '',
                    source_account_full_name: ''
                }
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
                this.getList();
            },
            searchList(){
                this.pager.page_no = 1;
                this.getList();
            },
            //查询列表
            getList(start_time, account_no) {
                if(start_time){
                    this.parents_data.start_time = start_time;
                }
                if(account_no){
                    this.parents_data.account_no = account_no;
                }

                this.listLoading = true;
                let condition = {
                    start_time: date.dateStart(this.parents_data.start_time),
                    account_no: this.parents_data.account_no,
                    mt4_order_no: this.filters.mt4_order_no,
                    source_account_no: this.filters.source_account_no,
                    source_account_full_name: this.filters.source_account_full_name
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };
                money_api.saleCommission(params).then((res) => {
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
            resetDialogData() {       //重置 表单
                this.dialog.dialogFormVisible = false;
                this.dialog.dialogData = [];
            },
            //清空查询条件，页面恢复显示两日内数据
            resetSearch(formName) {
                this.filters.order_no = "";
                this.filters.source_account_no = "";
                this.filters.source_account_full_name = "";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getList();
            },
            accountTypeFormatter(row, column) {
                if(row.bappti_type != undefined && row.bappti_type != null) {
                    return dict.bappti_type[row.bappti_type];
                }
                return dict.customer_ib_type[row[column.property]];
            },
            toMoney(row, column) {
                return (row[column.property] / 100) || 0 ;
            }
        },
        mounted() {
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