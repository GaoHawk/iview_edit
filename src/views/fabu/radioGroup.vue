<template>
   <div >
    <RadioGroup v-model="button4" type="button"  @on-change="radioClick" >
        <Radio v-for="item in options" :label="item"></Radio>
    </RadioGroup>
   </div>
</template>
<script>
    import Bus from '../../eventBus'
    import { mapState, mapActions, mapGetters } from "vuex";
    export default {
        props:{
             options: {
              type: Array
            },
            group:{
              type:Number
            }
        },
        created () {
            console.log(this.group)
            let cha = this.chanel[this.group]['chanel'+(this.group+1)]
            console.log(cha);
            this.button4 = cha;
        },
        data () {
            return {
                button4: '不限',
                button5: '北京',
                button6: '北京'
            }
        },
        computed: mapState({
            // 箭头函数可使代码更简练
            chanel: state => state.searchChanel,
        }),
        methods:{
            radioClick(val){
                console.log(this.group,val);
                let index = this.group
                this.$store.commit("updateChanel",{group:index,val:val});
                console.log(this.chanel)
            }
        }
    }
</script>
