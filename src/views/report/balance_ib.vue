<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">

            <el-form :inline="true" :model="filters" :rules="filterRules" ref="filters" size="medium">
                <el-form-item prop="date">
                    <div class="block">
                        <el-date-picker
                                v-model="filters.date" placeholder="GMT时间"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="exportExcel">报表导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>


    </section>


</template>

<script>
    import util from '../../common/js/util'
    import * as report_api from '../../api/report_api.js';
    import * as date from "../../common/js/date"
    import * as checkFields from "../../common/js/checkFields"
    import dict from '../../common/js/dict';
    import {fileDownload} from '../../common/js/download';
    import {centToDollar} from "../../common/js/commons"

    export default {
        props: ["params"],
        data() {
            return {
                clearable: false,
                filters: {
                    date: ''
                },
                filterRules: {
                    date: [
                        {required: true, message: '请选择GMT时间'},
                    ]
                }
            }
        },
        methods: {
            exportExcel() {

                this.$refs['filters'].validate((valid) => {
                    if (valid) {
                        let condition = {
                            date: this.filters.date,
                            export: "1",
                            user_type: '2' // 代理
                        };


                        let params = {
                            condition: condition
                        };
                        report_api.balanceExport(params).then((res) => {
                            //res.data有可能是字符串，即正常获取的文件内容, 不含stauts信息
                            //也可能是错误信息，含有res.data.status
                            if (res.status == 200) {
                                fileDownload(res, this);
                            } else {
                                if (res.data.status == 401) {
                                    // this.$router.push('/login');
                                }
                                this.$message.error(res.data.status + " " + res.data.msg);
                            }
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: e.message
                            });
                        });

                    }
                });
            },
        },
        mounted() {
            this.$nextTick(function () {
            })
        }

    }
</script>