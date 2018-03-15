<template>
   <div>
     <ul v-for="item in 3">
       <li>
         <radioGroup :options="[1,2]"></radioGroup>
       </li>
     </ul>


      <Table :columns="columns1" :data="data1"></Table>
   </div>

 
</template>
<script>
  import radioGroup from './radioGroup';
    export default {
        components: {
          radioGroup
        },
        data () {
            return {

            }
        }
    }
</script>
