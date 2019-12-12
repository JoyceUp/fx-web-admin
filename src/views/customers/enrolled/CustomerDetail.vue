<template>
    <section>
        <el-col>
            <el-tabs v-model="activeNames" type="card" style="height:110px;">
                <el-tab-pane label="用户信息" name="1"><div><customer-base-info></customer-base-info></div></el-tab-pane>
                <el-tab-pane label="账户信息" name="2"><div><customer-account-info></customer-account-info></div></el-tab-pane>
                <el-tab-pane label="资金信息" name="3"><div><customer-money-info></customer-money-info></div></el-tab-pane>
                <el-tab-pane label="关系信息" name="4"><div><customer-relation-info></customer-relation-info></div></el-tab-pane>
                <el-tab-pane label="沟通记录" name="5"><div><customer-communication-info></customer-communication-info></div></el-tab-pane>
                <br/><br/><br/><br/><br/><br/><br/>
            </el-tabs>
        </el-col>
        <el-col :span="1" :push="22" style="margin-top: -7%;">
            <el-button size="mini" @click="$router.back(-1)">返回</el-button>
        </el-col>
    </section>
</template>
<script>
    import {getCustomerById} from '../../../api/customers_api.js';
    import customerBaseInfo from './CustomerBaseInfo'
    import customerAccountInfo from './CustomerAccountInfo';
    import customerMoneyInfo from './CustomerMoneyInfo';
    import customerRelationInfo from './CustomerRelationInfo';
    import customerCommunicationInfo from './CustomerCommunicationInfo';


    export default {
        data () {
            return {
                activeNames:'1',//tabs 第一个tab展开
                customer_id: '',
            }
        },
        components:{
            'customer-base-info': customerBaseInfo,
           'customer-account-info':customerAccountInfo,
            'customer-money-info':customerMoneyInfo,
            'customer-relation-info':customerRelationInfo,
            'customer-communication-info':customerCommunicationInfo
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        methods: {
            fetchData(){
               this.customer_id = this.$route.params.id;
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$router': 'fetchData'
        },
        mounted(){}
    }
</script>
<style lang="scss" scoped>

</style>
