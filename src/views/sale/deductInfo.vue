<template>
    <section>
        <!--提成信息-->
        <el-table :header-row-style="headerRowStyle" v-loading="listLoading" :data="deductInfoData" stripe style="width: 100%;">
            <el-table-column label="提成日期" align="center"><template slot-scope="scope">{{isBirthDate(scope.row.change_time)}}</template></el-table-column>
            <el-table-column label="提成金额" align="center">
                <template slot-scope="scope"> <el-button type="text" @click="alertDetail(isBirthDate(scope.row.change_time),1)">{{centToDollar(scope.row.amount)}}</el-button></template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination style="text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pager.page_size"
                    :page-sizes="pager.sizes" background :current-page="pager.page_no" layout="prev,pager,next,sizes,total" :total="pager.total">
            </el-pagination>
        </el-col>

        <!-- 弹框 -->
        <el-dialog title="提成明细" :visible.sync="dialogTableVisible">
            <el-table :data="dialogList" stripe>
                <el-table-column prop="company" label="公司" width="150"></el-table-column>
                <el-table-column prop="department" label="部门" width="200"></el-table-column>
                <el-table-column prop="team" label="组别"></el-table-column>
                <el-table-column label="职位"><template slot-scope="scope"> <span>{{positionMapOptions[scope.row.position]}}</span></template></el-table-column>
                <el-table-column label="提成金额(USD)"><template slot-scope="scope"> <span>{{centToDollar(scope.row.amount)}}</span></template></el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination style="text-align: center;" @size-change="handleDialogSizeChange" @current-change="handleDialogCurrentChange" :page-size="dialogPager.page_size"
                               :page-sizes="dialogPager.sizes" background :current-page="dialogPager.page_no" layout="prev,pager,next,sizes,total" :total="dialogPager.total">
                </el-pagination>
            </el-col>
            <br/><br/><br/>
        </el-dialog>

    </section>
</template>

<script>
//    import * as api from '../../api/sale'
    import * as api from '../../api/sale_api';
    import {centToDollar,isBirthDate} from '../../common/js/commons';
    import dict from '../../common/js/dict';

    export default {
        // props: ["sale_id"],
        data() {
            return {
                listLoading:false,
                dialogTableVisible: false,
                sale_id: '',
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                //分页设置
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                dialogPager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                dialogFilter:{
                    sales_id:"",
                    date:""
                },
                //提成信息
                deductInfoData: [],
                dialogList: [],
                positionMapOptions: dict.sales_position_map
            }
        },
        methods: {
            //分页page_size发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.showDeductInfo();
            },
            //分页page_no发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.showDeductInfo();
            },
            /* 弹框分页 */
            //分页page_size发生改变
            handleDialogSizeChange(val) {
                this.dialogPager.page_no = 1;
                this.dialogPager.page_size = val;
                this.alertDetail();
            },
            //分页page_no发生改变
            handleDialogCurrentChange(val) {
                this.dialogPager.page_no = val;
                this.alertDetail();
            },
            // 显示提成列表
            showDeductInfo() {

                this.listLoading = true;
                let condition = {};
                condition.sales_id = this.sale_id;
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no
                };
                api.getDeductionList(params).then((res) => {

                    if (res.data.status == 200) {
                        this.listLoading = false;
                        let data = JSON.parse(res.data.datas);
                        this.deductInfoData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            centToDollar(val){
                return centToDollar(val);
            },
            //弹框
            alertDetail(ddate, num){
                if(ddate)
                {
                    this.dialogFilter.sales_id = this.$route.params.id;
                    this.dialogFilter.date = ddate;
                    if(num)
                    {
                        this.dialogPager.page_no = num;
                    }
                }
                this.dialogTableVisible = true;
                let condition = {};
                condition.sales_id = this.dialogFilter.sales_id;
                condition.start_time = this.dialogFilter.date + ' 00:00:00';
                condition.end_time = this.dialogFilter.date + ' 23:59:59';
                let params = {
                    condition: condition,
                    order_column: '',
                    order_by: '',
                    page_size: this.dialogPager.page_size,
                    page_no: this.dialogPager.page_no
                };
                api.getDeductionDialogsList(params).then((res)=>{
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status == 200){
                        this.dialogList = result.items;
                        this.dialogPager.total = result.total;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            isBirthDate(val){
                return isBirthDate(val);
            },
            //页面初始化，显示当前销售的基本信息
            initData() {
                this.sale_id = this.$route.params.id;

                this.showDeductInfo();
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData();  //初始化页面数据
            })

        }
    }
</script>

<style scoped>

</style>