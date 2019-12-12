<template>
    <section>
        <!--资金信息标签-->
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="交易返佣信息" name="transactionRebateInfo">
                <transactionRebateInfo></transactionRebateInfo>
            </el-tab-pane>
            <el-tab-pane label="余额返利信息" name="balanceRebateInfo">
                <balanceRebateInfo></balanceRebateInfo>
            </el-tab-pane>
            <el-tab-pane label="提成信息" name="deductInfo">
                <deductInfo></deductInfo>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import transactionRebateInfo from './transactionRebateInfo'
    import balanceRebateInfo from './balanceRebateInfo'
    import deductInfo from './deductInfo'
    export default {
        //父级组件传过来的数据
        // props: ["sale_id"],
        data() {
            return {
                //当前tab的名称
                activeName: 'transactionRebateInfo',
            };
        },
        components: {
            transactionRebateInfo,
            balanceRebateInfo,
            deductInfo
        },
        methods: {
            
        },
        mounted() {
            this.$nextTick(function () {
//                this.initData();  //初始化页面数据
            })

        }
    };
</script>

<style scoped>

</style>