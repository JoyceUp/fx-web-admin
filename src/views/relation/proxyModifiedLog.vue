<template>
    <section>
        <!--搜索工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
            <el-form :inline="true" :model="filters" ref="filters"  size="medium">
                <el-form-item label="" prop="full_name">
                    <el-input placeholder="代理姓名"  v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="update_time">
                    <el-date-picker
                            :clearable="clearable"
                            v-model="filters.update_time"
                            type="daterange"
                            @change="handleUpdateDateChange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="变更开始日期"
                            end-placeholder="变更结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="getLog">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small"  @click="resetForm('filters')">重置</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--客户列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :header-row-style="headerRowStyle"
                ref="proxyData"
                :data="proxyData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                    prop="full_name"
                    label="代理姓名"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_account_no_from"
                    label="变更前销售账号"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_full_name_from"
                    label="变更前销售姓名"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_account_no_to"
                    label="变更后销售账号"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="sales_full_name_to"
                    label="变更后销售姓名"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="update_time"
                    label="变更时间"
                    align="center"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-col :span="24" class="toolbar">
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
    import * as api from '../../api/relation'
    import * as date from "../../common/js/date"

    export default {
        data() {
            return {
                clearable:false,
                listLoading :false,
                //分页信息
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                //表单header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                //搜索客户条件
                filters: {
                    full_name: "",
                    update_time_from: "",
                    update_time_to: "",
                    update_time:""
                },
                //客户列表数据
                proxyData: []
            }
        },
        methods: {
            handleUpdateDateChange(val){
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
                this.getProxyModifiedLog();
            },
            getLog(){
                this.pager.page_no = 1;
                this.getProxyModifiedLog();
            },
            //根据条件搜索客户列表
            getProxyModifiedLog() {
                this.getProxyModifiedLogByFilter();
            },
            //根据条件搜索客户列表-实体方法
            getProxyModifiedLogByFilter() {
                this.listLoading = true;
                let condition = {
                    full_name: this.filters.full_name,
                    update_time_from: date.dateStart(this.filters.update_time_from),
                    update_time_to: date.dateEnd(this.filters.update_time_to)
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };
                api.getProxyModifiedLog(params).then((res) => {

                    if (res.data.status == 200) {
                        let data = JSON.parse(res.data.datas);
                        this.proxyData = data.items;
                        this.pager.total = data.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message(res.data.msg);
                    }
                    this.listLoading = false;
                });
            },
            //重置搜索表单
            resetForm(formName) {
                this.filters.update_time_from="";
                this.filters.update_time_to="";
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getProxyModifiedLogByFilter();
            },
            //初始化页面数据
            initData() {
                // 默认显示所有客户
                this.getProxyModifiedLogByFilter();
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