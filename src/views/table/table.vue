<style scoped>
.search-group {
  float: left;
  height: 30px;
  margin-left: 6px;
  line-height: 30px;
}
</style>

<template>
    <div>
        <div class="layout-header" style="margin-bottom:6px;">
            <label class="search-group">姓名</label>
            <Input v-model="value4"  placeholder="Enter name..." style="width: 200px;left:25px;">
                <Button slot="append" icon="ios-search" @click="click"></Button>
            </Input>
        </div>
        <div style="clear:both;"></div>
        <Table :columns="columns1" :data="data1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="1" :page-size="limit" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "../../eventBus";
export default {
    props:{
      limit: {
        type: Number
      },
      total:{
        type:Number
      }
  },
  data() {
    return {
      value4: "",
      columns1: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "创建日期",
          key: "created_at"
        },
        {
          title: "最后登录",
          key: "last_login"
        },
        {
          title: "手机",
          key: "mobile"
        },
        {
          title: "金额",
          key: "money"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "操作",
          key: "action",
          width: 140,
          align: "center",
          render: (h, params) => {
            // debugger

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  created() {
    let vm = this;

    Bus.$on("asyncData", target => {
      console.log(target);
      vm.data1 = target;
    });
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `姓名：${this.data1[index].name}<br>电话：${
          this.data1[index].moblie
        }<br>状态：${this.data1[index].status}`
      });
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    click() {},
    changePage() {}
  }
};
</script>
