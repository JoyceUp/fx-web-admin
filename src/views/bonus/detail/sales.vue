<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>

        <el-tabs v-model="activeNames" type="card">
            <el-tab-pane label="非直客ECN账户交易提成" name="1"><div><sales_ecn ref="sales_ecn" :start_time="start_time" :owner_id="owner_id"></sales_ecn></div></el-tab-pane>
            <el-tab-pane label="非直客BAPPEBTI账户提成" name="2"><div><sales_standard ref="sales_standard" :start_time="start_time" :role_id="owner_id"></sales_standard></div></el-tab-pane>
        </el-tabs>
    </section>

</template>

<script>
    import sales_ecn from './sales_ecn'
    import sales_standard from './sales_standard'

    export default {
        components:{
            'sales_ecn': sales_ecn,
            'sales_standard': sales_standard
        },
        //父页面传来的数据
        props: ["start_time", "owner_id"],
        data() {
            return {
                activeNames: "1",
            }
        },
        methods: {
            init(start_time, owner_id){
                this.$nextTick(function () {
                    this.$refs.sales_ecn.getList(start_time, owner_id);
                    this.$refs.sales_standard.getList(start_time, owner_id);
                })
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