<template>
   <div>
     <ul v-for="(item,index) in chanelArr" style="margin-top:10px;">
       <label style="float:left;width: 55px;height:30px;line-height:30px;">{{item.title }}:</label>
       <li>
         <radioGroup :options="['不限','北京','上海','深圳','杭州']" :group="index" ></radioGroup>
       </li>
       <div style="clear:both;"></div>
     </ul>
      <tb :columns="columns1" :data="data1" :limit="20" :total="150" :searchGroup="searchG"></tb>
   </div>
</template>
<style scoped>
li {list-style-type:none;}
</style>

<script>
  let defaultChanel = [
    {
      title:'频道类型',
      val:'不限'
    },
    {
      title:'综合门户',
      val:'不限'
    },
        {
      title:'覆盖区域',
      val:'不限'
    },
        {
      title:'新闻源',
      val:'北京'
    },
        {
      title:'入口级别',
      val:'不限'
    },
        {
      title:'链接类型',
      val:'杭州'
    },
        {
      title:'发稿速度',
      val:'不限'
    },
        {
      title:'周末可发',
      val:'上海'
    },
        {
      title:'收录情况',
      val:'不限'
    },
        {
      title:'价格分类',
      val:'不限'
    }]
  import radioGroup from './radioGroup';
  import Bus from '../../eventBus';
  import tb from '../table/table';
    export default {
        components: {
          radioGroup,
          tb
        },
        created () {
          Bus.$on('searchChange',target =>{
             console.log(target);
          })
        },
        data () {
            return {
              columns1:[],
              data1:[],
              searchG:['name','amount'],
              chanelArr:defaultChanel
            }
        },
        methods:{
          radioClick(val){
             console.log(val);
          }
        }
    }
</script>
