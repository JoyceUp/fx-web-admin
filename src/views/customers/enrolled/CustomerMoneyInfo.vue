<template>
    <section  style="margin-left:10px">
        <el-tabs v-model="activeNames" type="card">
            <el-tab-pane label="出入金信息" name="1"><div><customerMoneyInfo1></customerMoneyInfo1></div></el-tab-pane>
            <el-tab-pane label="转账信息" name="2"><div><customerMoneyInfo2></customerMoneyInfo2></div></el-tab-pane>
            <el-tab-pane label="余额清零信息" name="3"><div><customerMoneyInfo3></customerMoneyInfo3></div></el-tab-pane>
            <el-tab-pane label="交易信息" name="4"><div><customerMoneyInfo4></customerMoneyInfo4></div></el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
    import customerMoneyInfo1 from './moneyinfo/CustomerMoneyInfo1.vue';
    import customerMoneyInfo2 from './moneyinfo/CustomerMoneyInfo2.vue';
    import customerMoneyInfo3 from './moneyinfo/CustomerMoneyInfo3.vue';
    import customerMoneyInfo4 from './moneyinfo/CustomerMoneyInfo4.vue';
    export default {
        components: {
            'customerMoneyInfo1':customerMoneyInfo1,
            'customerMoneyInfo2':customerMoneyInfo2,
            'customerMoneyInfo3':customerMoneyInfo3,
            'customerMoneyInfo4':customerMoneyInfo4,
        },
        data() {
            return {
                activeNames: '1'
            }
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .container .main .content-container{
        background-color:#F7F7F7;
        font-size:12px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
        background-color:#F7F7F7;
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
