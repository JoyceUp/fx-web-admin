<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>

        <el-tabs v-model="activeNames" type="card">
            <el-tab-pane label="ECN账户交易提成" name="1"><div><chief_inspector_ecn ref="chief_inspector_ecn" :start_time="start_time" :owner_id="owner_id"></chief_inspector_ecn></div></el-tab-pane>
            <el-tab-pane label="BAPPEBTI账户提成" name="2"><div><chief_inspector_standard ref="chief_inspector_standard" :start_time="start_time" :role_id="owner_id"></chief_inspector_standard></div></el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import chief_inspector_ecn from './chief_inspector_ecn'
    import chief_inspector_standard from './chief_inspector_standard'

    export default {
        components:{
            'chief_inspector_ecn': chief_inspector_ecn,
            'chief_inspector_standard': chief_inspector_standard
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
                    this.$refs.chief_inspector_ecn.getList(start_time, owner_id);
                    this.$refs.chief_inspector_standard.getList(start_time, owner_id);
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