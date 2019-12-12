<template>
    <section>
        <!--销售信息标签-->
        <el-col :span="1" :push="22">
            <el-button type="primary" @click="cancle">返 回</el-button>
        </el-col>
        <el-col >
            <el-tabs type="card" v-model="activeName">
                <el-tab-pane label="基本信息" name="baseInfo">
                    <div class="base-Info">
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content grid-right">基本信息</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content grid-right"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>

                            <el-col :span="3">
                                <div class="grid-content grid-right">销售账号：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.account_no }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">姓名：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.full_name }}</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">性别：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.gender }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">证件类型：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.identity_type }}</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">证件号码：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.identity_no }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">手机号码：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.mobile }}</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">电子邮箱：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.email }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">出生日期：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ isBirthDate(baseInfoData.date_of_birth) }}</div>
                            </el-col>

                            <el-col :span="3">
                                <div class="grid-content grid-right">销售状态：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.sales_state | statechange }}</div>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">创建时间：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.create_date }}</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">更新时间：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.update_date }}</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right">MT4账号(暂无提供该字段)：</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content">{{ baseInfoData.employee_no }}</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content grid-right"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="4">
                                <div class="grid-content grid-right">职位信息</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content grid-right"></div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                        <el-row v-for="item in baseInfoData.organization_list" v-bind:key="item.company_id +'-' + item.department_id + '-' + item.team_id + '-' + item.position" :gutter="20">
                            <el-col :span="3">
                                <div class="grid-content"></div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content grid-right">公司：</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content">{{ item.company_name }}</div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content grid-right">部门：</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content">{{ item.department_name }}</div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content grid-right">组别：</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content">{{ item.team_name }}</div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content grid-right">职位：</div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content" >{{ item.position | change }}</div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content"></div>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="客户信息" name="customerInfo">
                    <customerInfo :sale_id="sale_id"></customerInfo>
                </el-tab-pane>
                <el-tab-pane label="代理信息" name="proxyInfo">
                    <proxyInfo :sale_id="sale_id"></proxyInfo>
                </el-tab-pane>
                <el-tab-pane label="资金信息" name="fundInfo">
                    <fundInfo :sale_id="sale_id"></fundInfo>
                </el-tab-pane>
            </el-tabs>
        </el-col>

    </section>
</template>

<script>
//    import * as api from "../../api/sale";
    import * as api from "../../api/sale_api";
    import {isBirthDate} from '../../common/js/commons';

    import customerInfo from "./customerInfo";
    import dict from "../../common/js/dict";
    import proxyInfo from "./proxyInfo";
    import fundInfo from "./fundInfo";
import ElCol from "element-ui/packages/col/src/col";

    export default {
        data() {
            return {
                //当前tab的名称
                activeName: "baseInfo",
                //销售id
                sale_id: "",
                //基本信息
                baseInfoData: ''
            };
        },
        filters: {
            statechange:function(value){
                return dict.sales_state[value];
            },
            change: function (value) {
                if(value==1){
                    return '客户总监';
                }else if (value==2){
                    return '团队经理';
                }else if(value==3){
                    return '客户经理';
                }
            }
        },
        components: {
            ElCol,
            customerInfo,
            proxyInfo,
            fundInfo
        },
        methods: {

            //打开销售基本信息标签页，显示销售基本信息
            showBaseInfo() {
                let params = {
                    sale_id: this.sale_id
                };
                api.getSalerBaseInfo(params).then(res => {
                    if (res.data.status == 200) {
                        let data = JSON.parse(res.data.datas);

                        this.baseInfoData = data;
                        if(this.baseInfoData.identity_type ==1){
                            this.baseInfoData.identity_type ="身份证";
                        }else if(this.baseInfoData.identity_type==2 ){
                            this.baseInfoData.identity_type ="驾照";
                        }else if(this.baseInfoData.identity_type ==3){
                            this.baseInfoData.identity_type ="护照";
                        }

                        if(data.gender==1){
                            this.baseInfoData.gender = '男';
                        }else if(data.gender==2){
                            this.baseInfoData.gender = '女';
                        }

                    } else {
                        if (res.data.status == 401) {
                            this.$router.push("/login");
                        }
                        this.$message(res.data.msg);
                    }
                });
            },
            //从URL中获取当前销售ID
            getSaleID() {
                return this.$route.params.id;
            },
            cancle(){
                this.$router.push("/sale/list");
            },
            //页面初始化，显示当前销售的基本信息
            initData() {
                this.sale_id = this.getSaleID();
                this.showBaseInfo();
            },
            isBirthDate(val){
                return isBirthDate(val);
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.initData(); //初始化页面数据
            });
        }
    };
</script>

<style lang="scss" scoped>
    .base-Info {
        margin-top: 20px;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .grid-content {
        border-radius: 4px;
        min-height: 16px;
    }

    .grid-right {
        text-align: right;
    }
</style>