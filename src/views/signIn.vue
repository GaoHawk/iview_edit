<template>
    <div class="login-con" v-if="sUp">
        <Card :bordered="false">
            <p slot="title">
                <Icon type="person"></Icon>
                填写注册信息
            </p>
            <a href="#" slot="extra" @click.prevent="returnLogin">
                <Icon type="arrow-return-left"></Icon>
                返回登录
            </a>
            <div class="form-con">
                <Form ref="signForm" :model="form" :rules="ruleCustom">
                    <FormItem prop="userName">
                        <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="passwd">
                        <Input type="password" v-model="form.passwd" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="passwdCheck">
                        <Input type="password" v-model="form.passwdCheck" placeholder="请再次输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="phone">
                        <Input  v-model="form.phone" placeholder="请输入手机">
                            <span slot="prepend">
                                <!-- <Icon :size="16" type="andriod-call"></Icon> -->
                                <Icon :size="16" type="android-call"></Icon>
                            </span>
                            
                        </Input>
                    </FormItem>
                     <FormItem prop="email">
                        <Input  v-model="form.email" placeholder="请输入邮箱">
                            <span slot="prepend">
                                <Icon :size="16" type="ios-email"></Icon>
                            </span>
                        </Input>
                    </FormItem>
                    <FormItem style="text-align:center;">
                        <!-- <Button @click="handleSubmit" type="primary" long>登录</Button> -->
                          <Button type="primary" @click="handleSubmit('signForm')">注册</Button>
                          <Button type="ghost" @click="handleReset('signForm')" style="margin-left: 8px">清空</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
import Bus from "../eventBus";
export default {
  props: {
    sUp: {
      type: Boolean
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的密码! "));
      } else {
        // if (this.formCustom.passwdCheck !== "") {
        //   // 对第二个密码框单独验证

        // }
        var expression = /^[A-Za-z0-9]{1}(\w){5,19}$/;
        var objExp = new RegExp(expression);
        if (objExp.test(value) === true) {
          this.$refs.signForm.validateField("passwdCheck");
          callback();
        } else {
          callback(new Error("密码由6到20位的字母、数字、下划线组成"));
        }
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请重新输入您的密码! "));
      } else if (value !== this.form.passwd) {
        callback(new Error("两次输入的密码不一致，请重新输入! "));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入您的手机号"));
      }
      var expression = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
      var objExp = new RegExp(expression);
      if (objExp.test(value) === true) {
        callback();
      } else {
        callback(new Error("用户输入的手机号不合法"));
      }
    };

    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入您额邮箱"));
      }
      var expression = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
      var objExp = new RegExp(expression);
      if (objExp.test(value) === true) {
        callback();
      } else {
        callback(new Error("邮箱格式不合法!"));
      }
    };

    const validateName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入你的用户名"));
      }
      var expression = /^[A-Za-z]{1}([A-Za-z0-9]|[._]){3,19}$/;
      var objExp = new RegExp(expression);
      if (objExp.test(value) === true) {
        callback();
      } else {
        callback(new Error("用户名由4到20位的字母、数字、下划线和点组成"));
      }
    };
    return {
      form: {
        userName: "",
        passwd: "",
        passwdCheck: "",
        phone: "",
        email: ""
      },
      ruleCustom: {
        userName: [{ validator: validateName, trigger: "blur" }],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    returnLogin() {
      Bus.$emit("returnLogin", false);
    },
    handleSubmit(name) {

      var params = {
         name:this.form.userName,
         pwd:this.form.passwd,
         mobile:this.form.phone,
         email:this.form.email
      }
      let vm = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          vm.$http({
            method: "POST",
            url: 'http://192.168.1.14/index.php/index/login/reg',
            // headers: {
            //     'Authorization': 'Bearer ' + cookies
            // },
            data: params
          })
            .then(response => {
              console.log(response);
              this.$Modal.success({
                title: "注册成功",
                content: "返回登录页,登录账号"
              });
              Bus.$emit("returnLogin", false);
            })
            .catch(function(err) {
              reject(new Error(err));
              console.log("catch", err);
            });

        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
