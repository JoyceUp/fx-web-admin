<template>
    <section>
        <!--转账记录-->
        <el-table stripe :data="transfer" style="width: 100%" size="small">
            <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
            <el-table-column prop="order_no" label="订单编号"></el-table-column>
            <el-table-column prop="account_no" label="转出账号"></el-table-column>
            <el-table-column
                    prop="poundage"
                    label="转出汇率">
                <template slot-scope="scope" v-if="scope.row.poundage != null && scope.row.rate != null">
                    {{ scope.row.poundage/10000 }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="pay_amount"
                    label="转出金额（USD）">

                <template slot-scope="scope">
                    <span>{{ dividedBy100(scope.row.pay_amount) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="target_account_no" label="转入账号"></el-table-column>
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
                    <span>{{ dividedBy100(scope.row.amount) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态"><template slot-scope="scope"> <span>{{ changeStatus(scope.row.status, statusOptions) }}</span></template></el-table-column>
            <el-table-column prop="remark" label="处理备注"></el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                           :current-page="pager.page_no" :page-sizes="pager.sizes" background layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

    </section>
</template>
<script>
    import {transferCustomersList} from '../../../../api/customers_api';
    import dict from '../../../../common/js/dict';
    import {dividedBy100 , centToDollar} from '../../../../common/js/commons';

    export default {
        data() {
            return {
                listLoading:false,
                order_column: "",
                order_by: "",
                //转账记录
                transfer:[{
                    gmt_create: '',  //创建时间
                    order_no: '',    //订单编号
                    account_no: '',  //转出账号
                    target_account_no: '', //转入账号
                    amount: '',      //转账金额
                    status: '',  //状态
                    remark: '',  //处理备注
                }],
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    pageSize: 10,
                    currentPage: 1
                },
                statusOptions: dict.funds_status
            }
        },
        methods: {
            //美分变美元
            cent2dollar(row, column) {
                if (column) {
                    return centToDollar(row[column.property]);
                }
                return centToDollar(row);
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.currentPage = 1;
                this.pager.pageSize = val;
                this.handlePagerChange();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.currentPage = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange(){this.getUserInfoDetail();},
            getUserInfoDetail() {
                this.listLoading=true;
                let condition = {};
                condition.customer_id = this.$route.params.id;
                let params = {
                    condition: condition,
                    order_column: "gmt_create",
                    order_by: "desc",
                    page_no: this.pager.currentPage,
                    page_size: this.pager.pageSize
                };
                transferCustomersList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        if(result != null){
                            this.listLoading=false;
                            this.transfer = result.items;
                            this.pager.total = result.total;
                        }
                    } else{
                        this.$message.error(res.data.msg);
                    }
                })
            },
            dividedBy100(val){
                return dividedBy100(val);
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
        },
        mounted()
        {
            this.$nextTick(function(){
                this.getUserInfoDetail();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .container .main .content-container{
        background-color:#F7F7F7;
        font-size:12px;
    }

    .el-row {
        text-align: right;
    }
    .el-row {
        margin-bottom: 2px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
