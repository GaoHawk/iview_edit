<style lang="less">

</style>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  margin-right: 10%;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

</style>

<template>
<div id="app" style="height:100%;">
        <div class="header">
          <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="layout-logo"></div>
              <MenuItem name="1">
                  <Icon type="ios-home-outline"></Icon>
                  首页
              </MenuItem>
              <MenuItem name="2">
                  <Icon type="ios-folder-outline"></Icon>
                  资源
              </MenuItem>
              <MenuItem name="3">
                  <Icon type="paper-airplane"></Icon>
                  广告
              </MenuItem>
          </Menu>
     </div>
      <Row type="flex"  style="height:100%;">
          <Col  class="layout-menu-left" style="width:200px;overflow:auto;background:white;">
              <Menu :active-name="activeName"   theme="light" width="auto"   ref="left_side"
              @on-select="click" v-if="menu.length>0"  style="padding-top:20px;">
                  <MenuGroup v-for="(item,index) in menu" :title="item.title" >
                     <MenuItem v-for="(child,childInd) in item.children" :name="item.title+'-'+child.title" v-if="item.children">
                       <Icon type="document-text"></Icon>
                       {{child.title}}
                     </MenuItem>
                  </MenuGroup>
                  <!-- <Submenu v-for="(item,index) in menu" :name="item.title" >
                      <template slot="title">
                          <Icon type="ios-navigate"></Icon>

                          <span class="layout-text">{{item.title}}</span>
                      </template>
                      <MenuItem :name="item.title+'-'+child.title" v-if="item.children" v-for="(child,childInd) in item.children" >{{child.title}}</MenuItem>
                  </Submenu> -->
              </Menu>
          </Col>
          <Col  style="overflow:auto;z-index:1;width:calc(100% - 200px);">
              <!-- <div style="clear:both;"></div> -->
              <div class="layout-content">
                    <Breadcrumb>
                        <BreadcrumbItem >{{pt}}</BreadcrumbItem>
                        <!-- <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem> -->
                        <BreadcrumbItem>{{chd}}</BreadcrumbItem>
                    </Breadcrumb>
                  <div class="layout-content-main">
                      <component :is="which_to_show" :asyncData="asyncData"></component>
                  </div>
              </div>
              <!-- <div class="layout-copy">
                  2011-2016 &copy; TalkingData
              </div> -->
          </Col>
      </Row>
   </div>
</template>

<script>
import Cookies from "js-cookie";
import util from "../libs/util";
import { mapState, mapGetters } from "vuex";
import tt from "./table/table";
import tt2 from "./table/table2";
import ad from "./fabu/uplaodad";
import Uedtior from "./fabu/ceshieditor";
// import { LOGOUT } from "./serverApi";
import Bus from "../eventBus.js";

export default {
  name: "HelloWorld",
  components: {
    Uedtior,
    tt,
    tt2
    // tagsPageOpened,
    // breadcrumbNav,
    // fullScreen,
    // lockScreen,
    // messageTip,
    // themeSwitch
  },
  created() {
    let vm = this;
    this.$store.dispatch("getListdataAsync", "menu").then(function(result) {
      console.log(result);
      vm.activeName = window.localStorage.activeName
      ? window.localStorage.activeName
      : "";
      let defMenu = [
        {
          group_name: "广告",
          lst: [{ title: "广告发布" }, { title: "广告列表" }]
        },
        {
          group_name: "资源",
          lst: [{ title: "资源" }, { title: "资源管理" }]
        }
      ];

      let list = result ? result : defMenu;
      let menuList = [];
      // vm.menu = vm.$store.getters.ajaxDataSetMenuTree;
      list.forEach((item, index) => {
        if (item.lst && item.lst.length === 1) {
          menuList.push({
            title: item.group_name
          });
        } else {
          let len = menuList.push({
            title: item.group_name
          });
          let childrenArr = [];

          childrenArr = item.lst.filter(child => {
            if (child.access !== undefined) {
              if (child.access === accessCode) {
                return child;
              }
            } else {
              return child;
            }
          });
          menuList[len - 1].children = childrenArr;
        }
      });
      vm.$store.menuList = menuList;
      vm.menu = menuList;
      

        vm.$nextTick(() => {
          console.log(vm.activeName)
          console.log(vm.$refs)
          // vm.$refs.left_side.updateActiveName();
        });
    });

  },
  // created() {
  //   let vm = this;
  //   // Bus.$on("getMenu", target => {
  //   //   console.log(target);
  //   // });
  //   //  this.$store.commit('setOpenedList');

  // },
  data() {
    return {
      which_to_show: "",
      activeName: "",
      open:[],
      theme3: "light",
      shrink: false,
      userName: "",
      isFullScreen: false,
      // openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      menu: [],
      pt: "",
      chd: "",
      asyncData: ""
    };
  },
  computed: {},
  methods: {
    init() {
      console.log(this.$store);
      this.$store.commit("app/updateMenulist");
    },
    userAction() {},
    click(val) {
      console.log(val);
      let pt = val.split("-")[0];
      let child = val.split("-")[1];
      window.localStorage.activeName = val;
      window.localStorage.open = pt;
      this.pt = pt;
      this.chd = child;
      let vm = this;
      if (child == "广告列表") {
        this.which_to_show = tt2;
      } else if (child == "广告发布") {
        this.which_to_show = ad;
      } else if (child == "管理资源") {
        this.which_to_show = tt;
        this.$store
          .dispatch("getTabledataAsync", "menu")
          .then(function(result) {
            console.log(result);
            let list = result;
            let menuList = [];
            // vm.menu = vm.$store.getters.ajaxDataSetMenuTree;
            vm.asyncData = result;
            Bus.$emit("asyncData", result);
          });
      }
      // let route = "";
      // if (val == "3-1") {
      //   route = "userlist";
      //   this.$store.commit("ROUT_PATH", route);
      // }
    }
  },
  mounted() {
    // this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
  float: left;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
</style>
