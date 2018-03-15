<style lang="less">
@import "./login.less";

</style>
<style scoped>
.ivu-input-group .ivu-input{
    height:100%!important;
}
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con" v-if="!sUp">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <a href="#" slot="extra" @click.prevent="signUp">
                    <Icon type="person-add"></Icon>
                    注册
                </a>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="captcha" style="height:45px;" class="captcha">
                            <Input  v-model="form.captcha" placeholder="请输入图片验证码" style="height:100%;">
                                <span slot="prepend">
                                    <Icon :size="14" type="key"></Icon>
                                </span>
                                <span slot="append" style="padding:0;">
                                    <img :src="imgSrc" style="height:41px;background-size:contain;width:104px;">
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
        <div v-else>
            <component is="sign" :sUp="sUp"></component> 
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import Bus from "../eventBus";
import img from "./../images/logo.png";
import sign from './signIn.vue';

export default {
  components: {
      sign
  },
  created () {
    let vm = this;
    Bus.$on('returnLogin',target =>{
        vm.sUp = target;
        vm.getcaptchaPic();
    })  
    vm.getcaptchaPic();
  },
  data() {
    return {
      sUp:false,
      imgSrc: img,
      form: {
        userName: "iview_admin",
        password: "",
        captcha: "",
        
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "图片验证码错误", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    signUp(){
        this.sUp = !this.sUp;
    },
    getcaptchaPic(){
        let vm = this;
        vm.$http.get('http://192.168.1.14/index.php/index/common/captcha').then(response =>{
            let src = 'http://192.168.1.14' + response.data
            vm.imgSrc = src;
        }).catch(function(err){
            console.log(err);
        })
        vm.$nextTick(() =>{
            console.log(vm.imgSrc);
        var inp =  document.querySelector('.captcha .ivu-input-group .ivu-input')
        console.log(inp);
        inp.style.height = '100%';
        })
    },
    handleSubmit() {
      let vm = this;
      let params = {
         name: this.form.userName,
         pwd: this.form.password,
         captcha:this.form.captcha
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          vm.$http({
            method: "POST",
            url: 'http://192.168.1.14/index.php/index/login/login',
            // headers: {
            //     'Authorization': 'Bearer ' + cookies
            // },
            data:params
          })
            .then(response => {
                let len = response.data.split('>');
                let json = len[len.length-1]
                console.log(JSON.parse(json));
                var result = JSON.parse(json);
                if(result.code == 200){
                    Cookies.set("user", vm.form.userName);
                    Cookies.set("password", vm.form.password);
                    vm.$store.commit(
                        "setAvator",
                        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
                    );
                    if (vm.form.userName === "iview_admin") {
                        Cookies.set("access", 0);
                    } else {
                        Cookies.set("access", 1);
                    }
                    Bus.$emit("getMenu", localStorage.cookies);
                    vm.$router.push({
                        name: "welcome"
                    });
                }else{
                    vm.$Modal.warning({
                        title: "登录失败",
                        content: result.msg
                    });
                }
   
            })
            .catch(function(err) {
              console.log("catch", err);
          })
        //   Cookies.set("user", this.form.userName);
        //   Cookies.set("password", this.form.password);
        //   this.$store.commit(
        //     "setAvator",
        //     "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
        //   );
        //   if (this.form.userName === "iview_admin") {
        //     Cookies.set("access", 0);
        //   } else {
        //     Cookies.set("access", 1);
        //   }
        //   Bus.$emit("getMenu", localStorage.cookies);
        //   this.$router.push({
        //     name: "welcome"
        //   });
        }
      });
    }
  }
};
</script>

<style>

</style>
