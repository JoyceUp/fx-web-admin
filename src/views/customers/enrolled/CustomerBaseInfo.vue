<template>
    <section>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-button type="primary" size="mini" @click="updateInfo('custInfo')">更新</el-button>
                <el-button type="primary" size="mini" @click="deleteInfo('custInfo')">删除</el-button>
            </el-col>
        </el-row>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
                <div class="div-padd">
                    <el-form label-position="left" inline class="demo-table-expand" :model="custInfo" ref="custInfo" :rules="info_rules">
                        <el-input type="hidden" v-model="custInfo.customer_id" ></el-input>
                        <el-form-item label="姓:" prop="family_name"><el-input v-model="custInfo.family_name"  autofocus></el-input></el-form-item>
                        <el-form-item label="名:" prop="given_name"><el-input v-model="custInfo.given_name" ></el-input></el-form-item>
                        <el-form-item label="称呼:">
                            <el-select clearable placeholder="称呼:" v-model="custInfo.gender">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in genderOptions" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <div class="block">
                                <el-date-picker v-model="custInfo.date_of_birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" size="mini"
                                                :clearable='false' :editable="false" default-value></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="电子邮箱:" prop="email"><el-input v-model="custInfo.email" ></el-input></el-form-item>
                        <el-form-item label="手机号码:"><span>{{custInfo.mobile}}</span></el-form-item>
                        <el-form-item label="证件类型:" prop="identity_type">
                            <el-select clearable placeholder="证件类型:" v-model="custInfo.identity_type">
                                <el-option :key="item.value" :label="item.key" :value="item.value" v-for="item in identityTypeOptions" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号码:" v-if="custInfo.identity_type != 1"  prop="identity_no"
                                      :rules="{ required: true, message: '证件号码不能为空', trigger: 'blur' }">
                            <el-input v-model="custInfo.identity_no" ></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码:" prop="identity_no" v-if="custInfo.identity_type == 1"
                                      :rules="[{ required: true, message: '证件号码不能为空', trigger: 'blur' },
                                            { validator: checkFields.identity_no, message: '身份证号格式错误', trigger: 'blur' }]">
                            <el-input v-model="custInfo.identity_no" ></el-input>
                        </el-form-item>

                        <el-form-item label="证件正面:">
                            <el-upload class="avatar-uploader" action="ss" :show-file-list="false" :http-request="httpRequest"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="custInfo.identity1_path" :src="'/common/images/'+custInfo.identity1_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <!--<span><img v-if="custInfo.identity1_path" :src="'/common/images/'+custInfo.identity1_path" class="avatar"-->
                                       <!--@click="showPicBig(custInfo.identity1_path)"></span>-->
                            <el-button v-if="custInfo.identity1_path" size="mini" @click="showPicBig(custInfo.identity1_path)">查看大图</el-button>
                        </el-form-item>
                        <el-form-item label="证件反面:">
                            <el-upload class="avatar-uploader" action="ss" :show-file-list="false" :http-request="httpRequest2"
                                       :before-upload="beforeAvatarUpload">
                                <img v-if="custInfo.identity2_path" :src="'/common/images/'+custInfo.identity2_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-button v-if="custInfo.identity2_path" size="mini" @click="showPicBig(custInfo.identity2_path)">查看大图</el-button>
                            <!--<span><img v-if="custInfo.identity2_path" :src="'/common/images/'+custInfo.identity2_path" class="avatar"-->
                                       <!--@click="showPicBig(custInfo.identity2_path)"></span>-->
                        </el-form-item>

                        <el-form-item label="国家:"> <span>{{address_info.country}}</span> </el-form-item>
                        <el-form-item label="城市:"> <span>{{address_info.city}}</span> </el-form-item>
                        <el-form-item label="居住地址:"> <span>{{address_info.address}}</span> </el-form-item>
                        <el-form-item label="邮政编码:"> <span>{{address_info.zip_code}}</span> </el-form-item>
                        <el-form-item label="地址证明:">
                            <img v-if="address_info.path" :src="'/common/images/'+address_info.path" class="avatar">
                            <el-button v-if="address_info.path" size="mini" @click="showPicBig(address_info.path)">查看大图</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="银行信息" name="2">
                <el-table stripe :data="brand_cards" style="width: 100%" >
                    <el-table-column prop="country" label="银行国家"></el-table-column>
                    <el-table-column prop="province" label="银行省"></el-table-column>
                    <el-table-column prop="city" label="银行城市"></el-table-column>
                    <el-table-column prop="bank_name" label="银行名称"></el-table-column>
                    <el-table-column prop="branch_name" label="支行名称"></el-table-column>
                    <el-table-column prop="card_no" label="银行账号"></el-table-column>
                    <el-table-column label="银行卡图片">
                        <template slot-scope="scope"><img @click="showPicBig(scope.row.path)" v-if="scope.row.path" :src="'/common/images/'+scope.row.path" class="avatar" style="width: 36px;height: 36px;"/></template>
                    </el-table-column>
                    <!--<el-table-column label="状态"><template slot-scope="scope"> <span>{{changeStatus(scope.row.state, brandStateOptions)}}</span></template></el-table-column>-->
                </el-table>
            </el-collapse-item>

            <el-collapse-item title="电汇信息" name="3">
                <el-row>
                    <el-col :span="12"><div class="bg-purple-light grid-content">银行账号</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_no)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行账户户名</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.card_user_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行名称</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.bank_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行国家</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.country)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">地区(省)</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.province)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">地区(市)</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.city)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">银行开户行</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_name)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">开户行地址</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(tts.branch_address)}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light bg-purple-bottom">国际汇款代码</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right bg-purple-bottom">{{isNull(tts.branch_swift_code)}}</div></el-col>
                </el-row>
            </el-collapse-item>
            <el-collapse-item title="投资者信息" name="4">
                <el-row>
                    <el-col :span="12"><div class="bg-purple-light grid-content">就业情况</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(jobOptions[custInfo.job])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">资金来源</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(capital_sourceOptions[custInfo.capital_source])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">年收入</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(annual_incomeOptions[custInfo.annual_income])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">总资产</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(total_assetOptions[custInfo.total_asset])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">外汇，差价合约（CFDs）以及其他金融衍生品经验 。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(experienceOptions[custInfo.experience])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light">我了解金融衍生品是我投资目标和风险投资的一部分，因此我能评估交易所涉及的风险，包括我所有投资资金的损失。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right">{{isNull(assess_riskOptions[custInfo.assess_risk])}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light bg-purple-bottom">我了解金融衍生品是我投资目标和风险投资的一部分，因此我能评估交易所涉及的风险，包括我所有投资资金的损失。</div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-right bg-purple-bottom ">{{isNull(professionalOptions[custInfo.professional])}}</div></el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
        <el-dialog title="放大图" :visible.sync="imgDialogVisible" width="50%" center>
            <span><img @click="imgDialogVisible = false" style="text-align: center" v-if="img_big" class="avatar_big" :src="'/common/images/'+ img_big"></span>
        </el-dialog>
    </section>
</template>
<script>
    import {customersInfo, customersAddressInfo, updateCustomer, removeCustomer, customerBankcardList, customerTel_transferList} from '../../../api/customers_api';
    import {update_img} from '../../../api/common';
    import dict from '../../../common/js/dict';
    import {isNull} from '../../../common/js/commons';
    import * as checkFields from '../../../common/js/checkFields';

    export default {
        data() {
            return {
                checkFields:checkFields,
                cid:'',
                isNull:isNull,
                activeNames:['1'],
                custInfo: {
                    customer_id: '',
                    customer_name: '',
                    create_date: '',//注册时间
                    mobile: '',//手机号码
                    email: '',//电子邮箱
                    account_balance: '',//账户余额
                    state: '',//状态
                    family_name:'',//姓
                    given_name:'',//名
                    gender:'',//性别
                    date_of_birth:'',//出生日期
                    identity_type:'',//证件类型
                    identity_no:'',//证件号码
                    identity1_path:'',//身份证正面
                    identity2_path:'',//身份证反面

                    job:'',             //就业情况
                    capital_source:'',   //资金来源
                    annual_income:'',   //年收入
                    total_asset:'',     //总资产
                    experience:'',      //是否有交易经验
                    assess_risk:'',     //是否有评估风险能力
                    professional:'',    //是否是专业人士
                },
                info_rules: {
                    family_name: [{ required: true, message: '姓不能为空', trigger: 'blur' }],
                    given_name: [{ required: true, message: '名不能为空', trigger: 'blur' }],
                    identity_type: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
                    email: [
                        { required: true, message: '电子邮箱不能为空', trigger: 'blur' },
                        { validator: checkFields.email, message: '电子邮箱格式错误', trigger: 'blur,change' }
                    ]
                },
                address_info: {
                    country: '', //国家
                    province: '',//省
                    zip_code: '',//邮政编码
                    address: '', //地址
                    path: ''     //地址证明
                },
                brand_cards:[],
                //电汇
                tts: {
                    card_no: '',
                    card_user_name: '',
                    bank_name: '',
                    country: '',
                    province: '',
                    city: '',
                    branch_name: '',
                    branch_address: '',
                    branch_swift_code: '',
                },
                uploadUser: {
                    // 角色类型：1：客户2：代理3：销售
                    roleType: "1",
                    roleId: ''
                },
                //投资者
                investor_info: [],
                img_big: '',
                imgDialogVisible: false,
                stateOptions: dict.potential_state_map,
                identityTypeOptions: dict.identity_type,
                genderOptions: [ {'value': 1, 'key': '先生'}, {'value': 2, 'key': '女士'}],
                jobOptions: dict.job_map,             //就业情况
                capital_sourceOptions: dict.capital_source_map,   //资金来源
                annual_incomeOptions: dict.annual_income_map,   //年收入
                total_assetOptions: dict.total_asset_map,     //总资产
                experienceOptions:dict.experience_map,      //是否有交易经验
                assess_riskOptions:dict.assess_risk_map,     //是否有评估风险能力
                professionalOptions: dict.professional_map,    //是否是专业人士

                brandStateOptions: dict.band_state  //银行状态

            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData(){
                this.uploadUser.roleId = this.$route.params.id;
            },
            getUserInfoDetail() {
                let params = {
                    id: this.$route.params.id,
                };
                customersInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        if(result == null){
                            this.$router.push({name:'注册客户'});
                        }
                        this.custInfo = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
                customersAddressInfo(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.address_info = result;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            changeStatus(row,options){
                let val = '';
                options.forEach((item)=>{
                    if(item.value == row){ val = item.key; }
                });
                return val;
            },
            updateInfo(formName){//更新信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: this.custInfo.id,
                            family_name: this.custInfo.family_name,
                            given_name: this.custInfo.given_name,
                            gender: this.custInfo.gender,
                            date_of_birth: this.custInfo.date_of_birth + ' 00:00:00',
                            email: this.custInfo.email,
                            identity_type: this.custInfo.identity_type,
                            identity_no: this.custInfo.identity_no,
                            identity1_path: this.custInfo.identity1_path,
                            identity2_path: this.custInfo.identity2_path
                        };
                        updateCustomer(params).then((res)=>{
                            let result = JSON.parse(res.data.datas);
                            if(res.data.status === 200) {
                                this.$message("更新成功！");
                                this.getUserInfoDetail();
                            }else{
                                if(res.data.status === 401){
                                    this.$router.push('/login');
                                }
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            deleteInfo() {
                let params = {
                    id: this.$route.params.id,
                };
                this.$confirm('确定删除该用户？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then((res)=>{
                    removeCustomer(params).then((res) => {
                        let result = JSON.parse(res.data.datas);
                        if(res.data.status === 200) {
                            this.$message("删除成功！");
                            this.$router.push({name:'注册客户'});
                        }else{
                            if(res.data.status === 401){
                                this.$router.push('/login');
                            }
                            this.$message.error(res.data.msg);
                        }
                    })

                })

            },

            customerBankcardList() {
                let params = {
                    id: this.$route.params.id,
                };

                customerBankcardList(params).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        if(result != null){
                            this.brand_cards = result;
                        }
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },
            getTtList() {
                let params = {
                    id: this.$route.params.id,
                };

                customerTel_transferList(params).then((res) => {
                    if(res.data.status === 200) {
                        let result = JSON.parse(res.data.datas);
                        if(result != null){
                            this.tts = result;
                        }
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                })
            },


            httpRequest(item){      //证件正面
                let formData = new FormData();
                formData.append('file', item.file);
                formData.append('roleType', this.uploadUser.roleType);
                formData.append('roleId', this.uploadUser.roleId);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.custInfo.identity1_path = result.id;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },
            httpRequest2(item){      //证件反面
                let formData = new FormData();
                formData.append('file', item.file);
                formData.append('roleType', this.uploadUser.roleType);
                formData.append('roleId', this.uploadUser.roleId);
                update_img(formData).then((res) => {
                    let result = JSON.parse(res.data.datas);
                    if(res.data.status === 200) {
                        this.custInfo.identity2_path = result.id;
                    }else{
                        if(res.data.status === 401){
                            this.$router.push('/login');
                        }
                        this.$message.error(res.data.msg);
                    }
                });
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },
            showPicBig(val){
                this.imgDialogVisible = true;
                this.img_big = val;
            }

        },
        mounted(){
            this.$nextTick(function(){
                this.getUserInfoDetail();
                this.customerBankcardList();
                this.getTtList();
            });
        }
    }
</script>
<style lang="scss" scoped>
    .el-row {
        text-align: right;
    }
    .div-padd{
        padding: 10px 180px;
    }
    .div-form{
        padding: 10px 180px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 20px;
        width: 50%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 20px;
        width: 40%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
    }
    .avatar_big{
        width: 100%;
        height: auto;
        display: block;
    }

    /*电汇 ，投资样式*/
    .bg-purple-bottom{
        border-bottom:0.1px solid #DCDCDC;
    }
    .bg-purple-light {
        background: #f0f0f0;
        border-left:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
    }
    .grid-content {
        min-height: 36px;
        line-height: 46px;
        text-align: center;
    }
    .bg-purple-right {
        border-left:0.1px solid #DCDCDC;
        border-right:0.1px solid #DCDCDC;
        border-top:0.1px solid #DCDCDC;
    }
</style>
