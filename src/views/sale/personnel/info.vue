

<template xmlns:el-col="http://www.w3.org/1999/html">
    <section>
        <div>
            <el-row>
                <el-col :span="24">
                    <el-button @click="removeSale" type="danger" class="fr" v-if="user_id != ''">删除</el-button>
                    <el-button @click="comfire" type="warning" class="fr" v-if="user_id != ''">重置密码</el-button>

                </el-col>
            </el-row>

            <el-form :model="userForm" :inline="true" :rules="userFormRules" ref="userFormRef"   label-position="left" label-width="95px" >
                <el-col>
                    <h4>基本信息</h4>
                </el-col>
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px; ">


                    <el-form-item label="姓" prop="family_name" style="margin-top: 10px">
                        <el-input placeholder="请输入姓" v-model="userForm.family_name" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="名字" prop="given_name" style="margin-top: 10px">
                        <el-input placeholder="请输入名" v-model="userForm.given_name" auto-complete="off"></el-input>
                    </el-form-item>


                    <el-form-item label="性别" prop="gender" style="margin-top: 10px">
                        <el-select clearable placeholder="请选择" v-model="userForm.gender">
                            <el-option key="1" label="女" :value="2"></el-option>
                            <el-option key="2" label="男" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile" style="margin-top: 10px">
                        <el-input placeholder="请输入手机号" v-model.number="userForm.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email" style="margin-top: 10px">
                        <el-input placeholder="请输入电子邮箱" v-model="userForm.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型" prop="identity_type" style="margin-top: 10px">
                        <el-select clearable placeholder="证件类型" v-model="userForm.identity_type">
                            <el-option key="1" label="身份证" :value="1"></el-option>
                            <!--<el-option key="2" label="驾照" :value="2"></el-option>-->
                            <el-option key="3" label="护照" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="identity_no" style="margin-top: 10px">
                        <el-input placeholder="请输入证件号" v-model="userForm.identity_no" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="date_of_birth" style="margin-top: 10px">
                        <el-date-picker
                                v-model="userForm.date_of_birth"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="销售状态" prop="sales_state" style="margin-top: 10px">
                        <el-select clearable placeholder="销售状态" v-model="userForm.sales_state">
                            <el-option key="1" label="在职" :value="1"></el-option>
                            <el-option key="2" label="离职" :value="2"></el-option>
                            <el-option key="3" label="兼职" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="密码" prop="password" v-if="user_id == 'add'" style="margin-top: 10px">-->
                    <!--<el-input placeholder="请输入密码" v-model="userForm.password" auto-complete="off"></el-input>-->
                    <!--</el-form-item>-->
                </el-col>
            </el-form>
            <el-col v-if="userForm.sales_state!=3" :span="24" class="" style="padding-bottom: 0px;">
                <el-row type="flex" justify="space-between">
                    <el-col :span="6" style="font-size: 14px;font-weight: bold;">职位信息</el-col>
                    <el-col :span="2" >
                        <el-button type="primary" @click="addPositionDom" >增加职位</el-button>
                    </el-col>
                </el-row>
                <el-col v-for="(position, index) in userForm.sales_organization" :key="index" :span="24" class="toolbar" style="padding-bottom: 0px;" :inline="true">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="* 公司">
                            <el-select clearable placeholder="公司名称"  @change="changeCompany(position.company,index)" v-model="position.company">
                                <el-option :key="item.id" :label="item.company_name" :value="item.id" v-for="item in tree[index].companyTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="* 部门">
                            <el-select clearable placeholder="部门名称"  @change="changeDepartmenty(position.department,index)" v-model="position.department">
                                <el-option :key="item.id" :label="item.department_name" :value="item.id" v-for="item in tree[index].departmentTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="组别" v-if="position.position != 1" >
                            <el-select clearable placeholder="组名称" @change="changeTame(position.team,index)"  v-model="position.team">
                                <el-option :key="item.id" :label="item.team_name" :value="item.id" v-for="item in tree[index].teamTree" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="* 职位">
                            <el-select clearable placeholder="职位名称" @change="changeName(position.name,index)" v-model="position.name">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in options.position" ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click.prevent="removePositionDom(position)" v-if="index != 0">删除</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
            <el-col class="dialog-footer">
                <!--      <div slot="footer" class=" el-col">-->
                <el-button @click="cancle">取 消</el-button>

                <el-button type="primary" @click="submitForm()">确 定</el-button>
                <!--     </div>-->
            </el-col>


            <!--<el-dialog title="修改密码" :visible.sync="dialogFormVisible"  v-if="user_id != 'add'">-->
            <!--<el-form :model="passWprd_form" :rules="rules" ref="resource_form_ref">-->

            <!--<el-form-item label="新密码" prop="newPassWord"  :label-width="formLabelWidth">-->
            <!--<el-input v-model="passWprd_form.newPassWord" type="password" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="确认密码" prop="repeatPassWord" :label-width="formLabelWidth" style="margin-top: 25px">-->
            <!--<el-input v-model="passWprd_form.repeatPassWord" type="password" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->

            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer" >-->
            <!--<el-button @click="restForm('resource_form_ref')">取 消</el-button>-->
            <!--<el-button type="primary" @click="comfire('resource_form_ref')">确 定</el-button>-->
            <!--</div>-->
            <!--</el-dialog>-->

        </div>
    </section>


</template>

<script>
    import * as sale_api from '../../../api/sale_api.js';
    import * as checkFields from "../../../common/js/checkFields"
    import dict from '../../../common/js/dict';
    import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";
    import ElCol from "element-ui/packages/col/src/col";

    export default {
        components: {
            ElCol,
            ElForm},
        props:["params"],
        data() {
            var newPass = (rule, value, callback) => {
                let passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//正则：密码 //长度 6 -20，必须字母与数字组合
                if(rule.required){
                    if(!value){
                        callback(new Error("请填写新密码"));
                    }

                    if(!passwordReg.test(value)){
                        callback(new Error("密码要求长度6-20位的字母与数字组合"));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var repeat = (rule, value, callback) => {
                if(rule.required){
                    if(!value){
                        callback(new Error("请确认密码"));
                    }

                    if(this.passWprd_form.newPassWord !== value){
                        callback(new Error("两次输入的密码不一致!"));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            var  identity_no= (rule, value, callback) => {
                if(rule.required){

                    if(!value){
                        callback(new Error("请填写证件号码"));
                    }
                    if(this.userForm.identity_type==1){
                        let identityNoReg = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)$/
                        if(!identityNoReg.test(value)){
                            callback(new Error("身份证号格式错误"));
                        }else {
                            if(value.length == '15')
                            {
                                var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                                var arr_data = obj.match(re_fifteen);
                                var year = arr_data[2];
                                var month = arr_data[3];
                                var day = arr_data[4];
                                this.userForm.date_of_birth ='19'+year+'-'+month+'-'+day;
                            }
                            //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                            if(value.length == '18')
                            {
                                var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                                var arr_data = value.match(re_eighteen);
                                var year = arr_data[2];
                                var month = arr_data[3];
                                var day = arr_data[4];
                                this.userForm.date_of_birth =year+'-'+month+'-'+day;
                            }


                            callback();
                        }
                    }else {
                        callback();
                    }

                }else {
                    callback();
                }
            }

            return {

                user_id: "",
                options: {
                    position:'',
                },
                type: 1,    //1添加 2修改
                dialogFormVisible:false,
                passWprd_form:{
                    newPassWord:'',
                    repeatPassWord:'',
                },

                tree:[{
                    companyTree:'',
                    departmentTree:'',
                    teamTree:'',
                }],

                formLabelWidth:'100px',
                userForm: {
                    full_name:'',
                    gender:'',
                    mobile:'',
                    email:'',
                    identity_type:'',
                    identity_no:'',
                    date_of_birth:'',
                    sales_state:'',
                    sales_organization: [
                        {
                            company:'',
                            department:'',
                            position:'',
                            team:'',
                            name:''
                        }
                    ]
                },
                userFormRules:{
                    family_name: [
                        { required: true,message:"请输入姓!", trigger: 'blur'}
                    ],
                    given_name:[
                        { required: true,message:"请输入名!",trigger: 'blur'}
                    ],
                    gender: [
                        { required: true,message:"请选择性别!",trigger: 'change'}
                    ],
                    mobile:[
                        {validator:checkFields.phone, required: true,trigger: 'blur'}
                    ],
                    email: [
                        {validator:checkFields.email, required: true,trigger: 'blur'}
                    ],
                    identity_type:[
                        { required: true,message:"请选择证件类型!",trigger: 'change' }
                    ],
                    date_of_birth:[
                        { required: true,message:"请选择出生日期!",trigger: 'change'}
                    ],
                    identity_no:[
                        {validator:identity_no, required: true,trigger: 'blur'}
                    ],
                    sales_state:[
                        { required: true,message:"请选择销售状态!",trigger: 'change'}
                    ],
//                    password:[
//                        { required: true,message:"请设置销售密码!",trigger: 'blur'}
//                    ]
                },
//                rules: {                //表单过滤
//                    repeatPassWord: [
//                        {validator:repeat, required: true,trigger: 'blur'}
//                    ],
//                    newPassWord:[
//                        {validator:newPass, required: true,trigger: 'blur'}
//                    ],
//                },

            }
        },
        methods: {
            //获取基本信息
            getPersonnelInfo(user_id) {
                sale_api.getSalesHRInfo({"id": user_id}).then((res) => {
                    if(res.data.status == 200){
                        this.userForm = JSON.parse(res.data.datas);
                        let organization = this.userForm.sales_organization
                        for(let e = 0; e < organization.length; e++){
                            if(organization[e].position == 1){
                                organization[e].team_id = "";
                                organization[e].team = "";
                            }

                        }
                        for(let i=0;i< organization.length-1; i++){
                            this.tree.push({
                                companyTree:this.tree[0].companyTree,
                                departmentTree:'',
                                teamTree:'',
                            })
                        }
                    }else{
                        this.$message.error(res.data.msg);
                    }
                });
            },
            //提交表单
            submitForm() {
                this.$refs["userFormRef"].validate((valid) => {
                    if (valid) {
                        this.addOrUpdate();
                    } else {

                        return false;
                    }
                });
            },
            //新增或更新销售
            addOrUpdate: function () {
                let positionList = this.userForm.sales_organization;

                for (let index in positionList){
                    if(this.userForm.sales_state!=3 && this.userForm.sales_organization[index].position != 1){
                        if(!positionList[index].company_id){
                            this.$message.error('请选择第'+(index*1+1)+'组职位信息的公司名称!');
                            return;
                        }else  if(!positionList[index].department_id){
                            this.$message.error('请选择第'+(index*1+1)+'组职位信息的部门名称!');

                            return;
                        }else  if(!positionList[index].team_id){
                            this.$message.error('请选择第'+(index*1+1)+'组职位信息的组别名称!');

                            return;
                        }else  if(!positionList[index].position){
                            this.$message.error('请选择第'+(index*1+1)+'组职位信息的职位名称!');

                            return;
                        }
                    }
                }
                this.userForm.sales_organization = positionList;
                //生日日期格式补齐
                this.userForm.date_of_birth += " 00:00:00";
                if(this.type == 1){
                    sale_api.addSalesHR(this.userForm).then((res) => {
                        if (res.data.status === 200) {
                            this.$message("添加成功!");
                            this.$router.push('/personnel');
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });
                }else{
                    sale_api.updateSalesHR(this.userForm).then((res) => {
                        if (res.data.status === 200) {
                            this.$message("修改成功!");
                            this.$router.push('/personnel');
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });
                }
            },
            //增加职位
            addPositionDom(){
                this.userForm.sales_organization.push({
                    company:'',
                    department:'',
                    team:'',
                    name:''
                });

                this.tree.push({
                    companyTree:this.tree[0].companyTree,
                    departmentTree:'',
                    teamTree:'',
                })

            },
            removePositionDom(item){
                if(this.userForm.sales_organization.length > 1){
                    var index = this.userForm.sales_organization.indexOf(item);
                    if (index !== -1) {
                        this.userForm.sales_organization.splice(index, 1);
                    }
                }
            },
            //返回上级
            cancle(){
                this.$router.push('/personnel');
            },
            restForm(formName){
                this.passWprd_form.newPassWord = '';
                this.passWprd_form.repeatPassWord='';
                this.$refs[formName].resetFields();
                this.dialogFormVisible = false;
            },
//            //更新密码
//            updatePassWord(){
//                this.dialogFormVisible = true;
//            },
            //修改密码
            comfire(formName){
//                this.$refs[formName].validate((valid) => {
//                    if (valid) {
                this.$confirm('此操作将重置该销售密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sale_api.updatePasswordSalesHR({"id":this.$route.params.id}).then((res) =>{
                        if (res.data.status === 200) {
                            this.$message("修改成功!");
//                            this.passWprd_form.newPassWord = '';
//                            this.passWprd_form.repeatPassWord='';
//                            this.$refs[formName].resetFields();
//                            this.dialogFormVisible = false;
                        } else {
                            this.$message.error(res.data.status + " " + res.data.msg);
                        }
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消!'
                    });
                });

//                    }
//                });

            },
            removeSale(){

                this.$confirm('此操作删除该销售, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let dic = {
                        id: this.user_id,
                    };
                    sale_api.removeSalesHR(dic).then(res => {
                        if (res.data.status == 200) {

                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                            this.$router.push("/list")
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            });
                        }
                        //刷界面

                    });})
            },
            //获取公司树
            initTreeData(){     //从 服务器获取数据
                sale_api.getDepartmentList().then((res) => {
                    if(res.data.status == 200){
                        let raw_tree_list = JSON.parse(res.data.datas);
                        if(raw_tree_list){
                            this.tree[0].tree_data = raw_tree_list;
                            this.tree[0].companyTree = raw_tree_list.children;
                            if(this.$route.params.id){
                                this.user_id = this.$route.params.id;
                                this.type = 2;
                                this.getPersonnelInfo(this.user_id);
                            }
                        }
                    }else{
                        if(res.data.status == 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.status+" "+res.data.msg);
                    }
                });
            },
            changeCompany(val,index){
                this.userForm.sales_organization[index].company_id = val;
                for(var j = 0,  len= this.tree[index].companyTree.length; j < len; j++) {
                    let company = this.tree[index].companyTree[j];
                    if(company.id == val){
                        if(company.children){
                            this.tree[index].departmentTree = company.children
                        }else {
                            this.tree[index].departmentTree =""
                        }
                        //this.teamTree = '';
                    }
                }
            },
            changeDepartmenty(val,index){
                this.userForm.sales_organization[index].department_id = val;
                for(var j = 0,len= this.tree[index].departmentTree.length; j < len; j++) {
                    let department = this.tree[index].departmentTree[j];
                    if(department.id==val){
                        if(department.children){
                            this.tree[index].teamTree = department.children;
                        }else {
                            this.tree[index].teamTree = ""
                        }
                    }
                }
            },
            changeTame(val,index){
                if(val.length < 30){
                    this.userForm.sales_organization[index].team_id = ""
                }else{
                    this.userForm.sales_organization[index].team_id = val;
                    for(var j = 0,len= this.tree[index].teamTree.length; j < len; j++) {
                        let team = this.tree[index].teamTree[j];

                        if(team.id==val){
                            if(team.children){
                                this.tree[index].teamTree = team.children;
                            }else {
                                this.tree[index].teamTree = ""
                            }
                        }
                    }

                }
            },
            changeName(val,index){
                if (val == 1){
                    this.userForm.sales_organization[index].team = "";
                    this.userForm.sales_organization[index].team_id = "";
                }
                this.userForm.sales_organization[index].position = val;
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.options.position = dict.position;
                this.initTreeData();

            })
        }
    }
</script>

<style>
    .dialog-footer{padding-top:50px;text-align: center}
    .demo-form-inline {
        width: auto;
    }
    .demo-form-inline .el-input {
        width: 150px;
    }
    .fr{float:right}
</style>