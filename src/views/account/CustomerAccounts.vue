<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <el-row>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">
                <el-form :inline="true" :model="filters" ref="filtersFrom" size="medium">
                    <el-form-item prop="account_no">
                        <el-input placeholder="客户账号" v-model.trim="filters.account_no"></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input placeholder="客户姓名" v-model.trim="filters.name" ></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input placeholder="邮箱" v-model.trim="filters.email" ></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input placeholder="手机号" v-model.trim="filters.mobile" ></el-input>
                    </el-form-item>
                    <el-form-item prop="identity_no">
                        <el-input placeholder="证件号码" v-model.trim= "filters.identity_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="ib_account_no">
                        <el-input placeholder="代理账号"  v-model.trim="filters.ib_account_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="ib_name">
                        <el-input placeholder="代理姓名"  v-model.trim="filters.ib_name"></el-input>
                    </el-form-item>

                    <el-form-item prop="sales_account_no">
                        <el-input placeholder="销售账号" v-model.trim="filters.sales_account_no"></el-input>
                    </el-form-item>

                    <el-form-item prop="sales_name">
                        <el-input placeholder="销售姓名"  v-model.trim="filters.sales_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select clearable placeholder="账户状态" clearable  prop="state" v-model="filters.state">
                            <el-option v-for="item in selectOptions.account_state"
                                       :key="item.value"
                                       :label="item.key"
                                       :value="item.value">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select clearable placeholder="账户类型" v-model="filters.account_type">
                            <el-option v-for="item in selectOptions.account_type"
                                       :key="item.value"
                                       :label="item.key"
                                       :value="item.value">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="start_time">
                        <el-date-picker
                                v-model="filters.times"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleCreateDateChange">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getAccounts(1)" size="small">查询</el-button>
                        <el-button @click="resetSearch('filtersFrom')" size="small">清空</el-button>
                        <el-button type="primary" @click="exportCustomer()" size="small">导出</el-button>

                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- table -->
        <el-table
                :data="accounts"
                stripe
                v-loading="listLoading"
                style="width: 100%">

            <el-table-column
                    prop="account_no"
                    label="客户账号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="account_type"
                    label="账户类型"
                    :formatter="accountTypeFormatter"
            >
            </el-table-column>
            <el-table-column
                    prop="full_name"
                    label="客户姓名">
            </el-table-column>

            <el-table-column
                    prop="balance"
                    label="账户余额" :formatter="balanceFormatter">
            </el-table-column>
            <el-table-column
                    prop="ib_account_no"
                    label="代理账号">
            </el-table-column>
            <el-table-column
                    prop="sales_account_no"
                    label="销售账号">
            </el-table-column>
            <el-table-column
                    :formatter="accountStatueFormatter"
                    label="账号状态">
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="注册时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="showDetail(scope.$index, scope.row) " size="mini">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pager.page_size"
                    :current-page="pager.page_no"
                    :page-sizes="pager.sizes"
                    background
                    layout="prev,pager,next,sizes,total"
                    :total="pager.total">
            </el-pagination>
        </el-col>

        <el-dialog title="账号信息" :visible.sync="dialogFormVisible" width="800px">

            <el-tabs v-model="activeName"><!--@tab-click="handleClick"-->
                <el-tab-pane label="基本信息" name="first">
                    <el-form :model="itemInfo" inline ref="itemInfoRef" class="demo-table-expand">
                        <input type="hidden" id="account_id" :value='itemInfo.id'/>
                        <el-form-item label="客户账号:"><span>{{ itemInfo.account }}</span></el-form-item>
                        <el-form-item label="账户类型:"><span>{{ options.account_type[itemInfo.account_type] }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间:"><span>{{ itemInfo.account_gmt_create }}</span></el-form-item>
                        <el-form-item label="账户状态:"><span>{{ options.account_state[itemInfo.account_state] }}</span>
                        </el-form-item>
                        <el-form-item label="客户姓名:"><span>{{ itemInfo.full_name }}</span></el-form-item>
                        <el-form-item label="客户性别:"><span>{{ options.gender[itemInfo.gender] }}</span></el-form-item>
                        <el-form-item label="证件类型:"><span>{{ options.identity_type[itemInfo.identity_type] }}</span>
                        </el-form-item>
                        <el-form-item label="证件号码:"><span>{{ itemInfo.identity_no }}</span></el-form-item>
                        <el-form-item label="电子邮箱:"><span>{{ itemInfo.email }}</span></el-form-item>
                        <el-form-item label="手机号码:"><span>{{ itemInfo.mobile }}</span></el-form-item>
                        <el-form-item label="国家:"><span>{{ itemInfo.country }}</span></el-form-item>
                        <el-form-item label="城市:"><span>{{ itemInfo.city }}</span></el-form-item>
                        <el-form-item label="居住地址:"><span>{{ itemInfo.address }}</span></el-form-item>
                        <el-form-item label="邮政编码:"><span>{{ itemInfo.zip_code }}</span></el-form-item>
                        <el-form-item label="代理账号:"><span>{{ itemInfo.ib_account }}</span></el-form-item>
                        <el-form-item label="代理姓名:"><span>{{ itemInfo.ib_full_name }}</span></el-form-item>
                        <el-form-item label="销售账号:"><span>{{ itemInfo.sales_account_no }}</span></el-form-item>
                        <el-form-item label="销售姓名:"><span>{{ itemInfo.sales_full_name }}</span></el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="图片信息" name="second">
                    <el-form :model="itemInfo" inline class="demo-table-expand">
                        <el-form-item label="证件正面:"><span><img width="60%"
                                                               :src="'/common/images/'+itemInfo.identity1_path" @click="showPicBig(itemInfo.identity1_path)"/></span>
                        </el-form-item>
                        <el-form-item label="证件反面:"><span><img width="60%"
                                                               :src="'/common/images/' + itemInfo.identity2_path" @click="showPicBig(itemInfo.identity2_path)"/></span>
                        </el-form-item>
                        <el-form-item label="地址证明:"><span><img v-if="itemInfo.path" width="60%"
                                                               :src="'/common/images/' + itemInfo.path" @click="showPicBig(itemInfo.path)"/></span>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="入金记录" name="third">
                    <el-table
                            :data="deposits"
                            stripe
                            show-summary
                            :summary-method="getSummaries"
                            v-loading="listLoading"
                            style="width: 100%">

                        <el-table-column
                                prop="gmt_create"
                                label="时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="account_no"
                                label="账号">
                        </el-table-column>
                        <el-table-column
                                prop="channel_type"
                                :formatter="fundTypeFormatter"
                                label="资金类型">
                        </el-table-column>

                        <el-table-column
                                prop="amount"
                                label="入金金额(USD)" :formatter="amountFormtter">
                        </el-table-column>

                    </el-table>

                    <el-col :span="24" class="toolbar">
                        <el-pagination
                                style="text-align: center;"
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :page-size="pager2.page_size"
                                :current-page="pager2.page_no"
                                :page-sizes="pager2.sizes"
                                background
                                layout="prev,pager,next,sizes,total"
                                :total="pager2.total">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>
            </el-tabs>

            <!--当账户状态 是禁用时，显示-->
            <div slot="footer" v-if="itemInfo.account_state == 51 || itemInfo.account_state == 50" class="dialog-footer">
                <el-button type="primary" @click="enableAccount(itemInfo.id,itemInfo.account_no)" size="medium ">激活</el-button>
            </div>


        </el-dialog>

        <el-dialog title="放大图" :visible.sync="imgDialogVisible" width="63%" center>
            <span><img @click="imgDialogVisible = false" v-if="img_big" class="avatar_big" width="33%" :src="'/common/images/'+ img_big"></span>
        </el-dialog>


    </section>
</template>
<script>
    import {accountsList, accountDetail, enableAccount, exportCustomer,getDepositList} from '../../api/accounts_api.js';
    import ElInput from "element-ui/packages/input/src/input";
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import baseInfo from "./accountdetail/BaseInfo"
    import imagePath from "./accountdetail/AccountImage"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';

    export default {
        components: {
            ElFormItem,
            ElForm,
            ElInput,
            baseInfo,
            imagePath
        },
        data() {
            return {
                listLoading: false,
                page_size: 20,
                page_no: 1,
                total: 0,
                activeName: 'first',
                dialogFormVisible: false,
                centerDialogVisible: true,
                img_big: '',
                imgDialogVisible: false,
                pager: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                //详情页 --- 分页
                pager2: {
                    sizes: [10, 20, 30, 40, 50],
                    total: 0,
                    page_size: 10,
                    page_no: 1
                },
                options: {
                    gender: dict.gender_map,
                    account_type: dict.customer_two_type,
                    account_state: dict.account_state_map,
                    identity_type: dict.identity_type_map
                },
                selectOptions: {
                    account_type: dict.customer_type,
                    account_state: dict.account_state
                },
                accounts: [{
                    account_no: '',//MT4账号
                    account_type: '',//账户类型
                    full_name: '',//客户姓名
                    balance: '',//账户余额
                    ib_account_no: '',//代理账号
                    sales_account_no: '',//销售账号
                    state: '',//账号状态
                    gmt_create: '',//注册时间
                }],
                deposits:[{
                    gmt_create:'',//时间
                    account_no:'',//账号
                    channel_type:'',//资金类型
                    amount:'',//入金金额
                }],
                statistics:0,
                itemInfo: {
                    id: '',
                    account: '',
                    account_type: '',
                    account_gmt_create: '',
                    account_state: '',
                    full_name: '',
                    gender: '',
                    identity_type: '',
                    identity_no: '',
                    email: '',
                    mobile: '',
                    country: '',
                    city: '',
                    address: '',
                    zip_code: '',
                    ib_account: '',
                    ib_full_name: '',
                    sales_account_no: '',
                    sales_full_name: ''
                },
                filters: {
                    full_name: '',//客户姓名
                    state: '',//账号状态
                    account_no: '',//mt4号
                    account_type: '',//账号类型
                    email: '',//点子邮箱
                    mobile: '',//手机号码
                    identity_no: '',//证件号码
                    ib_account_no: '',//代理账号
                    ib_name: '',//代理姓名
                    sales_account_no: '',//销售账号
                    sales_name: '',//销售姓名
                    start_time: '',//注册开始时间
                    end_time: ''//注册结束时间
                }
            }
        },
        methods: {
            //清空筛选表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //分页pageSize发生改变
            handleSizeChange(val) {
                this.pager.page_no = 1;
                this.pager.page_size = val;
                this.handlePagerChange();
            },
            //分页currentPage发生改变
            handleCurrentChange(val) {
                this.pager.page_no = val;
                this.handlePagerChange();
            },
            //分页引起的页面数据更改
            handlePagerChange() {
                this.getAccounts();
            },
            //详情页 --- 分页pageSize发生改变
            handleSizeChange2(val) {
                this.pager2.page_no = 1;
                this.pager2.page_size = val;
                this.handlePagerChange2();
            },
            //详情页 ---  分页currentPage发生改变
            handleCurrentChange2(val) {
                this.pager2.page_no = val;
                this.handlePagerChange2();
            },
            //详情页 --- 分页引起的页面数据更改
            handlePagerChange2() {
                this.getDepositList();
            },
            handleCreateDateChange(val) {
                this.filters.start_time = val[0]+" 00:00:00";
                this.filters.end_time = val[1]+" 23:59:59";
            },
            accountTypeFormatter(row, column) {
                return dict.customer_two_type[row.account_type];
            },
            accountStatueFormatter(row, column) {
                return dict.account_state_map[row.state];
            },
            fundTypeFormatter(row,column){

                return dict.funds_type[row.channel_type]
            },
            balanceFormatter(row,column){
                if(row.balance){
                    return row.balance / 100;
                }else{
                    return 0;
                }
            },
            amountFormtter(row,colum){
                if(row.amount){
                    return row.amount / 100;
                }else{
                    return 0;
                }
            },
            changePageNumber(val) {
                this.page_no = val;
                this.getAccounts();
            },

            //清空查询条件
            resetSearch(formName) {
                this.filters.account_no = "";
                this.filters.name = "";
                this.filters.email = "";
                this.filters.mobile = "";
                this.filters.ib_account_no = "";
                this.filters.ib_name = '';
                this.filters.sales_account_no = '';
                this.filters.sales_name = '';
                this.filters.state = '';
                this.filters.start_time = '';
                this.filters.end_time = '';
                this.filters.times = '';
                this.filters.account_type = '';
                this.filters.identity_no = '';
                this.filters.identity_type = '';
                this.getAccounts();
            },
            getAccounts(num) {//获取客户列表
                this.listLoading = true
                if (num) {
                    this.pager.page_no = 1;
                }
                this.listLoading = true;
                let params = {
                    "condition": {
                        account_no: this.filters.account_no,//mt4号
                        name: this.filters.name,//客户姓名
                        account_type: this.filters.account_type,
                        email: this.filters.email,//点子邮箱
                        mobile: this.filters.mobile,//手机号码
                        identity_no: this.filters.identity_no,//证件号码
                        ib_account_no: this.filters.ib_account_no,//代理账号
                        ib_name: this.filters.ib_name,//代理姓名
                        sales_account_no: this.filters.sales_account_no,//销售账号
                        sales_name: this.filters.sales_name,//销售姓名
                        state: this.filters.state,//状态
                        start_time: this.filters.start_time,//注册开始时间
                        end_time: this.filters.end_time//注册结束时间
                    },
                    "page_size": this.pager.page_size,
                    "page_no": this.pager.page_no,
                    "order_column": "",
                    "order_by": ""
                };
                accountsList(params).then((res) => {
                    if (res.data.status === 200) {
                        let datas = JSON.parse(res.data.datas);
                        this.listLoading = false
                        this.accounts = datas.items;
                        this.pager.total = datas.total;
                    } else {
                        if (res.data.status == 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }

                });
            },
            showDetail(index, row) {//弹出详情页
                this.dialogFormVisible = true;
                this.activeName= 'first';
                accountDetail({"account_no": row.account_no}).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.itemInfo = result;
                        this.getDepositList(1);
                      } else {
                          if (res.data.status === 401) {
                               this.$router.push('/login');
                           }
                           this.$message.error(res.data.status + " " + res.data.msg);
                      }

                });
            },
            getDepositList(num,account_no){
                //入金记录
                this.listLoading = true;
                if (num) {
                    this.pager2.page_no = 1;
                }
                let params2 = {
                    "condition": {
                        account_no:this.itemInfo.account
                    },
                    "page_size": this.pager2.page_size,
                    "page_no": this.pager2.page_no,
                    "order_column": "",
                    "order_by": ""
                };
                getDepositList(params2).then((res) =>{
                    this.listLoading = false;
                    let result = JSON.parse(res.data.datas);
                    if (res.data.status == 200) {
                        this.deposits = result.items;
                        this.pager2.total = result.total;

                        var statistics = result.statistics.sum_deposit_amount;
                        if(statistics) {
                            this.statistics = statistics / 100 ;
                        }

                    } else {
                        if (res.data.status === 401) {
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status + " " + res.data.msg);
                    }
                });

            },
            getSummaries(param){
                const { columns } = param;
                const sums = [];
                sums[0] = '合计';
                sums[columns.length - 1] = this.statistics;
                return sums;
            },
            //激活账号
            enableAccount(id,account_no) {
                enableAccount({"account_id": id}).then((res) => {
                    if(res.data.status == 200){

                       this.$message({
                              type: 'success',
                              message: "操作成功"
                          });

                        this.dialogFormVisible = false;
                        this.getAccounts();
                    }

            });
            },
            //导出客户账号
            exportCustomer() {
                let condition = {
                    account_no: this.filters.account_no,//mt4号
                    name: this.filters.name,//客户姓名
                    account_type: this.filters.account_type,
                    email: this.filters.email,//点子邮箱
                    mobile: this.filters.mobile,//手机号码
                    identity_no: this.filters.identity_no,//证件号码
                    ib_account_no: this.filters.ib_account_no,//代理账号
                    ib_name: this.filters.ib_name,//代理姓名
                    sales_account_no: this.filters.sales_account_no,//销售账号
                    sales_name: this.filters.sales_name,//销售姓名
                    state: this.filters.state,//状态
                    start_time: this.filters.start_time,//注册开始时间
                    end_time: this.filters.end_time//注册结束时间
                };
                this.listLoading = true;
                exportCustomer(condition).then((res) => {
                    this.listLoading = false;
                    if (res.status == 200) {
                        fileDownload(res, this);
                    } else {
                        if (res.data.status == 401) {
                            // this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                }).catch((e) => {
                    this.$message({
                        type: 'info',
                        message: e.message
                    });
                });
            },
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.getAccounts();
            })
        }
    }
</script>
<style scoped>
    .container .main .content-container {
        background: #f7f7f7;
    }

    .form .form-left {
        width: 10%;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 1rem;
        margin-bottom: 2px;
    }

    .el-form-item {
        margin-bottom: 2px;
    }

    .el-dialog__body {
        padding: 10px 20px;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
    }
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }

</style>