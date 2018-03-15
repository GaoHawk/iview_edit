<template>
    <div>
       <div v-if="!amountT">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="上传" >
                <Upload action="//jsonplaceholder.typicode.com/posts/"
                  ref="upload"
                  :on-success="handleSuccess"
                  :format="['doc','xls','docx']"
                  :on-format-error="handleFormatError"
                >
                    <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
              </FormItem>
              <FormItem label="标题" prop="mail">
                  <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
              </FormItem>
              <FormItem label="内容" >
                <div class="components-container">
                  <div class="editor-container">
                    <Uediter :defaultMsg=defaultMsg :config=config ref="ue"></Uediter>
                  </div>
                </div>
              </FormItem>
              <FormItem style="text-align:center;">
                  <Button type="primary" size="large" @click="handleSubmit('formValidate')">保存草稿</Button>
                  <Button type="ghost" size="large" @click="next()" style="margin-left: 8px">下一步</Button>
              </FormItem>
          </Form>
        </div>
        <div v-else>
          <amountList></amountList>
        </div>
 
        <!-- <Uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></Uediter> -->
        <!-- <input type="button" value="显示编辑器内容（从控制台查看）" @click="returnContent"> -->
    </div>
</template>
<script>
import Uediter from "../my_components/ue.vue";
import amountList from "./amoutnList";

export default {
  components: {
    Uediter,
    amountList
  },
  data() {
    return {
      amountT: false,
      defaultMsg: "这里是UE测试",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      dat: {
        content: ""
      },
      ueditor: {
        value: "编辑器默认文字",
        config: {}
      },
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSuccess (res, file) {
        console.log(res,file);
        // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '格式错误',
            desc: '该文件 ' + file.name + ' 不是可支持文档格式.'
        });
    },
    next() {
      this.amountT = !this.amountT;
    },
    returnContent() {
      this.dat.content = this.$refs.ue.getUEContent();
      console.log(this.dat.content);
    },
    handleSubmit(name) {
      let content = this.$refs.ue.getUEContent();
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
