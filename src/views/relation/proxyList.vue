<template>
    <section>
        <!--搜索工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
            <el-form :inline="true" :model="filters" ref="filters"  size="medium">

                <el-form-item label="" prop="full_name">
                    <el-input placeholder="代理姓名"  v-model.trim="filters.full_name">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input placeholder="电子邮箱"  v-model.trim="filters.email">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="mobile">
                    <el-input placeholder="手机号码"  v-model.trim="filters.mobile">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="identity_no">
                    <el-input placeholder="证件号码"  v-model.trim="filters.identity_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="sales_account_no">
                    <el-input placeholder="销售账号"  v-model.trim="filters.sales_account_no">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="sales_full_name">
                    <el-input placeholder="销售姓名"  v-model.trim="filters.sales_full_name">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="getProxy">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small"  @click="resetForm('filters')">重置</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--主要功能按钮-->
        <el-col :span="24" class="toolbar" size="small"  >
            <el-button type="primary"  @click="saleChange">更换销售</el-button>
        </el-col>
        <!--代理列表-->
        <el-table
                stripe
                v-loading="listLoading"
                :header-row-style="headerRowStyle"
                ref="multipleTable"
                :data="proxyData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    align="center"
                    label="代理姓名">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    align="center"
                    label="手机号码">
            </el-table-column>
            <el-table-column
                    prop="email"
                    align="center"
                    label="电子邮箱">
            </el-table-column>
            <el-table-column
                    prop="identity_no"
                    align="center"
                    label="证件号码">
            </el-table-column>
            <el-table-column
                    prop="sales_account_no"
                    align="center"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    prop="sales_full_name"
                    align="center"
                    label="销售姓名">
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

        <!--详细操作对话框-选择销售-->
        <el-dialog title="选择销售" fullscreen :visible.sync="dialogSaleVisible" @open="dialogSaleOpen">
            <proxySale :receiverCount="dialogReceiverCount" :selectedProxy="multipleSelection" v-on:closeDialog="dialogSaleInvisible"></proxySale>
        </el-dialog>
    </section>
</template>

<script>
    import * as api from '../../api/relation'
    import proxySale from './proxySale'

    export default {
        data() {
            return {
                listLoading :false,
                name: "proxy-list",
                // 分页信息
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                // 被选中的代理
                multipleSelection: [],
                // 修改销售对话框显示
                dialogSaleVisible: false,
                dialogReceiverCount:0,
                //列表header样式
                headerRowStyle: {
                    backgroundColor: "#ddd",
                    color: "#333",
                    textAlign: "center"
                },
                // 搜索条件
                filters: {
                    full_name: "",
                    email: "",
                    mobile: "",
                    identity_no: "",
                    sales_account_no: "",
                    sales_full_name: ""
                },
                // 代理列表数据
                proxyData: []
            }
        },
        components: {
            proxySale
        },
        methods: {
            // 选择代理
            handleSelectionChange(val) {
                this.multipleSelection = [];
                if (val.length > 0) {
                    for (let i = 0; i < val.length; i++) {
                        this.multipleSelection.push(val[i].ib_id);
                    }
                }
            },
            // 分页page_size改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            // 分页page_no改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getProxyListByFilter();
            },
            // ====主要操作====[修改选中的代理的销售信息]
            saleChange() {
                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'error',
                        message: '请至少选择一个客户'
                    });
                }
                else {
                    this.dialogSaleVisible = true;
                }
            },
            //监听子控件的操作，关掉修改销售对话框
            dialogSaleInvisible() {
                this.dialogSaleVisible = false;
                this.getProxyListByFilter();
            },
            // 根据条件搜索代理
            getProxy() {
                this.pager.page_no = 1;
                this.getProxyListByFilter();
            },
            // 根据条件搜索代理-实体方法
            getProxyListByFilter() {

                this.listLoading = true;
                let condition = {
                    full_name: this.filters.full_name,
                    email: this.filters.email,
                    mobile: this.filters.mobile,
                    identity_no: this.filters.identity_no,
                    sales_account_no: this.filters.sales_account_no,
                    sales_full_name: this.filters.sales_full_name
                };
                let params = {
                    page_size: this.pager.page_size,
                    page_no: this.pager.page_no,
                    condition: condition
                };
                api.getProxyList(params).then((res) => {

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
            //弹出修改销售对话框时事件
            dialogSaleOpen() {
                this.dialogReceiverCount++;
            },
            // 重置搜索表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.filters.page_no = 1;
                this.getProxyListByFilter();
            },
            // 初始化页面数据
            initData() {
                //默认显示所有代理数据
                this.getProxyListByFilter();
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